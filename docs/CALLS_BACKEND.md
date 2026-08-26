# Audio/Video Calls — Implementation Notes

Raw WebRTC with Cloudflare Realtime TURN. Both sides are implemented.

- **Frontend:** `alfredo-frontend` — call UI, peer connection, state machine
- **Backend:** `alfredo_server` — TURN credential proxy + Socket.IO signalling relay

---

## Running it locally

### 1. Database migration (required once)

The `Call` model is new. With Postgres running:

```bash
cd /e/alfredo_server
npx prisma migrate deploy    # applies prisma/migrations/20260826000000_add_call_history
npx prisma generate
```

The migration is purely additive — one table (`Call`), two enums (`CallType`,
`CallStatus`), two FKs to `User`. Nothing existing is altered.

> Call-history writes are **fail-soft**: if the migration hasn't run yet, calls
> still connect and only the history row fails (logged as a warning). So you can
> test the UI before migrating.

### 2. Backend env

Already set in `alfredo_server/.env` (gitignored):

```
TURN_KEY_ID=…
TURN_KEY_API_TOKEN=…
```

⚠️ **This token is temporary.** It was pasted into a chat transcript — delete the
`vacanza` TURN key in the Cloudflare dashboard and issue a fresh one once UI
testing is done. Only these two `.env` values need updating; no code changes.

### 3. Point the frontend at the local backend

`alfredo-frontend/.env` currently targets production. For local testing:

```
VITE_API_URL=http://localhost:3000/api
VITE_BASE_URL=http://localhost:3000
```

`VITE_BASE_URL` is what the Socket.IO client connects to — if it stays on
`https://vacanzagreece.gr`, signalling goes to the production server while your
API calls go to localhost, and calls will never connect.

### 4. Start both

```bash
cd /e/alfredo_server   && npm run start:dev
cd /e/alfredo-frontend && npm run dev
```

---

## What the backend exposes

### `GET /api/webrtc/ice-servers` (JWT)

Proxies Cloudflare Realtime and returns ephemeral TURN credentials
(`ttl: 3600`). The long-lived key/token never leave the server.

Verified working — Cloudflare responds `201` with the full URL set including the
firewall-friendly `:53`, `:80`, and `:443` variants.

### `GET /api/webrtc/call-history?limit=50` (JWT)

Recent calls for the current user, newest first, with both participants included.
Not yet consumed by the frontend.

### Socket.IO signalling — `CallGateway`

Relay only; the gateway never inspects SDP or ICE payloads.

| Client emits | Relayed to other party as |
|---|---|
| `call:initiate` `{ callId, toUserId, callType }` | `call:incoming` (+ caller name/avatar) |
| `call:accept` `{ callId }` | `call:accepted` |
| `call:reject` `{ callId, reason }` | `call:rejected` |
| `call:offer` `{ callId, sdp }` | `call:offer` |
| `call:answer` `{ callId, sdp }` | `call:answer` |
| `call:ice-candidate` `{ callId, candidate }` | `call:ice-candidate` |
| `call:end` `{ callId, reason }` | `call:ended` |

`callId` is generated client-side (`crypto.randomUUID()`), so signalling starts
without a server round-trip.

Rooms are per-`userId` and are joined by `ChatGateway.handleConnection` — the
call gateway shares that socket rather than opening a second connection.

### Enforced server-side

1. **Participant check** — every `call:*` event verifies the sender is the caller
   or callee on that `callId`. Without it, any connected client could inject SDP
   into someone else's call.
2. **Blocks** — a block in *either* direction refuses the call (reported to the
   caller as a generic `declined`, so a block isn't disclosed).
3. **Offline callee** → `call:unavailable`, recorded as `MISSED`.
4. **Busy** (either party already on a call) → `call:rejected` with `busy`.
5. **45s ring timeout** → `call:ended` with `no-answer` to both. Mirrors the
   frontend timer.
6. **Disconnect cleanup** — a dropped socket ends the call for the other party,
   but only once the user has no remaining sockets (multi-tab safe).

---

## Testing

Two tabs on one machine connect over host candidates and **never touch TURN**, so
that test proves nothing about the setup.

**Force relay-only** in `src/contexts/CallContext.tsx` (`createPeerConnection`):

```ts
new RTCPeerConnection({ iceServers, iceTransportPolicy: "relay" })
```

If a call connects with that set, TURN works. Remove it before shipping.

Then check `chrome://webrtc-internals` on a real cross-network call — the selected
candidate pair should read `relay` when direct P2P isn't possible.

Worth covering: two different networks (Wi-Fi ↔ mobile data), both on mobile data,
one behind corporate/hotel Wi-Fi, Safari on iOS, tab backgrounded mid-call, and
killing Wi-Fi mid-call (should surface a failed connection, not hang).

---

## Not built

- **Ringing when the app is closed.** Calls only ring with a tab open. That needs
  FCM push + a service worker; Firebase is currently auth-only. Mobile browsers
  can't ring like a native app regardless — iOS Safari especially.
- **Missed-call entries in the chat thread.** The data exists via
  `/api/webrtc/call-history`; nothing renders it yet.
- **Group calls.** P2P mesh stops working past ~4 participants; that needs an SFU.

---

## Cost

Cloudflare Realtime bills **$0.05/GB egress after 1,000 GB/month free**, shared
between TURN and SFU. Only relayed calls consume it (~15% of calls), ingress is
free. At current volume this stays inside the free tier.
