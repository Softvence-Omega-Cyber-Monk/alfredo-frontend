import api from "./api";

export type ProtectPlanType = "YEARLY" | "PER_TRIP";

export interface ProtectPlan {
  id: string;
  type: ProtectPlanType;
  price: number;
  currency: string;
  coverAmount: number;
  isActive: boolean;
}

export interface ProtectPurchase {
  id: string;
  planType: ProtectPlanType;
  amount: number;
  currency: string;
  status: "PENDING" | "ACTIVE" | "EXPIRED" | "CANCELLED" | "FAILED";
  tripsCovered: number;
  startDate: string | null;
  endDate: string | null;
  createdAt: string;
}

export interface ProtectionStatus {
  isProtected: boolean;
  yearlyCover: { validUntil: string | null; amount: number } | null;
  tripsRemaining: number;
  purchases: ProtectPurchase[];
}

export interface ProtectCheckoutPayload {
  planType: ProtectPlanType;
  /** Required for guests; ignored when a logged in member buys. */
  email?: string;
  fullName?: string;
  propertyAddress?: string;
  trips?: number;
  /** Reporting only: where the purchase was started from. */
  source?: "LANDING" | "DASHBOARD";
}

/** Prices are managed in the backend so the admin can change them without a deploy. */
export const getProtectPlans = async (): Promise<ProtectPlan[]> => {
  const res = await api.get<{ data: ProtectPlan[] }>("/vacanza-protect/plans");
  return res.data.data;
};

/**
 * Returns the Stripe Checkout url the buyer has to be redirected to.
 * No account required — Vacanza Protect is sold standalone, so guests buy with
 * their email alone. A logged in member is linked to the purchase automatically.
 */
export const createProtectCheckout = async (
  payload: ProtectCheckoutPayload
): Promise<string> => {
  const res = await api.post<{ url: string }>(
    "/vacanza-protect/checkout",
    payload
  );
  return res.data.url;
};

export const getMyProtection = async (): Promise<ProtectionStatus> => {
  const res = await api.get<{ data: ProtectionStatus }>("/vacanza-protect/me");
  return res.data.data;
};
