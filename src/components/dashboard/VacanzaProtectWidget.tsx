import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { FiArrowUpRight, FiCheckCircle, FiShield } from "react-icons/fi";
import {
  getMyProtection,
  getProtectPlans,
  ProtectionStatus,
  ProtectPlan,
} from "@/services/vacanzaProtect";
import ProtectCheckoutDialog from "@/components/vacanzaProtect/ProtectCheckoutDialog";
import {
  protectCopy,
  protectLocale,
  resolveProtectLang,
} from "@/components/vacanzaProtect/protectCopy";

/**
 * Vacanza Protect entry point inside the dashboard: shows the current cover and
 * sends the member straight to Stripe checkout for an annual or single trip cover.
 */
const VacanzaProtectWidget = () => {
  const { i18n } = useTranslation();
  const lang = resolveProtectLang(i18n.language);
  const copy = protectCopy[lang];

  const [plans, setPlans] = useState<ProtectPlan[]>([]);
  const [protection, setProtection] = useState<ProtectionStatus | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<ProtectPlan | null>(null);

  useEffect(() => {
    getProtectPlans()
      .then(setPlans)
      .catch(() => setPlans([]));

    getMyProtection()
      .then(setProtection)
      .catch(() => setProtection(null));
  }, []);

  const yearly = plans.find((p) => p.type === "YEARLY");
  const perTrip = plans.find((p) => p.type === "PER_TRIP");

  const money = (value: number, currency = "EUR") =>
    new Intl.NumberFormat(protectLocale[lang], {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(value);

  const formatDate = (value: string) =>
    new Intl.DateTimeFormat(protectLocale[lang], {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(value));

  const isProtected = protection?.isProtected;

  return (
    <div className="mt-8 overflow-hidden rounded-[28px] border border-primary-blue/10 bg-gradient-to-br from-white via-white to-[#f5f9ff] shadow-[0_16px_50px_rgba(23,64,117,0.08)]">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-primary-blue/10 px-6 py-5 sm:flex-row sm:items-center sm:justify-between md:px-8">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-blue/10">
            <FiShield className="h-5 w-5 text-primary-blue" />
          </div>

          <div>
            <h3 className="font-DM-sans text-lg font-bold text-primary-blue md:text-xl">
              {copy.widget.title}
            </h3>
            <p className="mt-1 text-sm text-gray-500">{copy.widget.subtitle}</p>
          </div>
        </div>

        <div className="hidden rounded-full bg-primary-blue/5 px-4 py-2 text-xs font-semibold text-primary-blue sm:block">
          {copy.widget.badge}
        </div>
      </div>

      <div className="px-6 py-7 md:px-8 md:py-8">
        {/* Current cover status */}
        {isProtected ? (
          <div className="flex flex-col gap-2 rounded-2xl bg-[#EAF7EE] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-2 font-DM-sans text-sm font-semibold text-[#1d7a45]">
              <FiCheckCircle className="h-5 w-5" />
              {copy.widget.covered}
            </p>
            <p className="text-xs text-[#1d7a45]/80 sm:text-sm">
              {protection?.yearlyCover?.validUntil
                ? `${copy.widget.validUntil} ${formatDate(
                    protection.yearlyCover.validUntil
                  )}`
                : `${protection?.tripsRemaining ?? 0} ${copy.widget.tripsLeft}`}
            </p>
          </div>
        ) : (
          <p className="rounded-2xl bg-[#FFF4E5] px-5 py-4 text-sm font-medium text-[#9a6400]">
            {copy.widget.notCovered}
          </p>
        )}

        {/* Plan choices */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {perTrip && (
            <button
              onClick={() => setSelectedPlan(perTrip)}
              className="group cursor-pointer rounded-2xl border border-primary-border-color bg-white p-5 text-left transition hover:border-primary-blue hover:shadow-[0_12px_30px_rgba(23,64,117,0.10)]"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                {copy.pricing.perTrip.name}
              </p>
              <p className="mt-2 font-DM-sans text-2xl font-bold text-primary-blue">
                {money(perTrip.price, perTrip.currency)}
                <span className="ml-1 text-sm font-medium text-gray-400">
                  {copy.pricing.perTrip.per}
                </span>
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary-blue">
                {copy.widget.buyPerTrip}
                <FiArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </span>
            </button>
          )}

          {yearly && (
            <button
              onClick={() => setSelectedPlan(yearly)}
              className="group cursor-pointer rounded-2xl bg-primary-blue p-5 text-left text-white transition hover:bg-[#174075]"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-white/70">
                {copy.pricing.yearly.name}
              </p>
              <p className="mt-2 font-DM-sans text-2xl font-bold">
                {money(yearly.price, yearly.currency)}
                <span className="ml-1 text-sm font-medium text-white/70">
                  {copy.pricing.yearly.per}
                </span>
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold">
                {copy.widget.buyYearly}
                <FiArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </span>
            </button>
          )}
        </div>

        <Link
          to="/vacanzaprotect"
          className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary-blue hover:underline"
        >
          {copy.widget.learnMore}
          <FiArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      <ProtectCheckoutDialog
        plan={selectedPlan}
        copy={copy}
        lang={lang}
        source="DASHBOARD"
        onClose={() => setSelectedPlan(null)}
      />
    </div>
  );
};

export default VacanzaProtectWidget;
