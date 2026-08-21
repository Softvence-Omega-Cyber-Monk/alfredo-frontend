import { FormEvent, useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import axios from "axios";
import { toast } from "sonner";
import { FaCcStripe } from "react-icons/fa";
import { FiLock, FiX } from "react-icons/fi";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { createProtectCheckout, ProtectPlan } from "@/services/vacanzaProtect";
import { ProtectCopy, protectLocale, ProtectLang } from "./protectCopy";

interface ProtectCheckoutDialogProps {
  plan: ProtectPlan | null;
  copy: ProtectCopy;
  lang: ProtectLang;
  /** Where the purchase was started from — reporting only. */
  source: "LANDING" | "DASHBOARD";
  onClose: () => void;
}

/**
 * Vacanza Protect is sold standalone, so no account is required: a guest only
 * needs an email. Logged in members get their details prefilled instead.
 */
const ProtectCheckoutDialog = ({
  plan,
  copy,
  lang,
  source,
  onClose,
}: ProtectCheckoutDialogProps) => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth,
  );

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [propertyAddress, setPropertyAddress] = useState("");
  const [trips, setTrips] = useState(1);
  const [loading, setLoading] = useState(false);

  const isYearly = plan?.type === "YEARLY";
  const t = copy.checkout;

  useEffect(() => {
    if (!plan) return;
    setEmail(user?.email ?? "");
    setFullName(user?.fullName ?? "");
    setTrips(1);
  }, [plan, user?.email, user?.fullName]);

  const money = (value: number) =>
    new Intl.NumberFormat(protectLocale[lang], {
      style: "currency",
      currency: plan?.currency || "EUR",
      maximumFractionDigits: 0,
    }).format(value);

  const total = plan ? plan.price * (isYearly ? 1 : trips) : 0;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!plan) return;

    if (!isAuthenticated && !/^\S+@\S+\.\S+$/.test(email)) {
      toast.error(t.emailRequired);
      return;
    }

    try {
      setLoading(true);
      const url = await createProtectCheckout({
        planType: plan.type,
        email: email || undefined,
        fullName: fullName || undefined,
        propertyAddress: propertyAddress || undefined,
        trips: isYearly ? undefined : trips,
        source,
      });
      window.location.href = url;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || t.error);
      } else {
        toast.error(t.error);
      }
      setLoading(false);
    }
  };

  return (
    <Dialog.Root
      open={Boolean(plan)}
      onOpenChange={(open) => !open && onClose()}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-[#0b264a]/50 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-[380px] md:top-[430px] z-100 max-h-[92vh] w-[calc(100%-2rem)] max-w-[520px] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-[28px] bg-white p-6 shadow-2xl md:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <Dialog.Title className="font-DM-sans text-2xl font-bold text-primary-blue md:text-[28px]">
                {t.title}
              </Dialog.Title>
              <Dialog.Description className="mt-1 text-sm text-gray-500">
                {isYearly ? t.subtitleYearly : t.subtitlePerTrip}
              </Dialog.Description>
            </div>
            <Dialog.Close
              className="cursor-pointer rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
              aria-label="Close"
            >
              <FiX className="h-5 w-5" />
            </Dialog.Close>
          </div>

          {plan && (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {/* Selected plan recap */}
              <div className="flex items-center justify-between rounded-2xl bg-[#EAF1FA] px-5 py-4">
                <div>
                  <p className="font-DM-sans font-semibold text-[#174075]">
                    {isYearly
                      ? copy.pricing.yearly.name
                      : copy.pricing.perTrip.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {money(plan.price)}{" "}
                    {isYearly
                      ? copy.pricing.yearly.per
                      : copy.pricing.perTrip.per}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    {t.total}
                  </p>
                  <p className="font-DM-sans text-xl font-bold text-primary-blue">
                    {money(total)}
                  </p>
                </div>
              </div>

              {isAuthenticated && user?.email ? (
                <p className="text-sm text-gray-500">
                  {t.loggedInAs}{" "}
                  <span className="font-semibold text-[#174075]">
                    {user.email}
                  </span>
                </p>
              ) : (
                <>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-dark-2">
                      {t.name}
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full rounded-full border border-primary-border-color px-5 py-3 text-sm outline-none transition focus:border-primary-blue"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-dark-2">
                      {t.email} *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-full border border-primary-border-color px-5 py-3 text-sm outline-none transition focus:border-primary-blue"
                    />
                  </div>
                </>
              )}

              {!isYearly && (
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-dark-2">
                    {t.trips}
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setTrips((n) => Math.max(1, n - 1))}
                      className="h-11 w-11 cursor-pointer rounded-full border border-primary-border-color text-lg font-bold text-primary-blue transition hover:bg-[#EAF1FA]"
                    >
                      −
                    </button>
                    <span className="min-w-[3rem] text-center font-DM-sans text-lg font-bold text-[#174075]">
                      {trips}
                    </span>
                    <button
                      type="button"
                      onClick={() => setTrips((n) => Math.min(20, n + 1))}
                      className="h-11 w-11 cursor-pointer rounded-full border border-primary-border-color text-lg font-bold text-primary-blue transition hover:bg-[#EAF1FA]"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              {isYearly && (
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-dark-2">
                    {t.address}
                  </label>
                  <input
                    type="text"
                    value={propertyAddress}
                    onChange={(e) => setPropertyAddress(e.target.value)}
                    className="w-full rounded-full border border-primary-border-color px-5 py-3 text-sm outline-none transition focus:border-primary-blue"
                  />
                  <p className="pl-2 text-xs text-gray-400">{t.addressHint}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-primary-blue py-4 font-DM-sans text-base font-semibold text-white transition hover:bg-[#174075] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  t.processing
                ) : (
                  <>
                    <FiLock className="h-4 w-4" />
                    {t.pay} · {money(total)}
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                <FaCcStripe className="text-xl text-[#635bff]" />
                <span>{t.secure}</span>
              </div>
            </form>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ProtectCheckoutDialog;
