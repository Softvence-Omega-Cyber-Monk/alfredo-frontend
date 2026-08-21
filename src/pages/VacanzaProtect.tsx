import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import {
  FiCheck,
  FiChevronDown,
  FiClock,
  FiLock,
  FiShield,
} from "react-icons/fi";
import {
  MdOutlineFlightTakeoff,
  MdOutlineHomeRepairService,
} from "react-icons/md";
import { FaCcStripe } from "react-icons/fa";
import CommonWrapper from "@/common/CommonWrapper";
import { getProtectPlans, ProtectPlan } from "@/services/vacanzaProtect";
import ProtectCheckoutDialog from "@/components/vacanzaProtect/ProtectCheckoutDialog";
import {
  protectCopy,
  protectLocale,
  resolveProtectLang,
} from "@/components/vacanzaProtect/protectCopy";

/** Shown while the API answers, and if it ever fails, so the page always sells. */
const FALLBACK_PLANS: ProtectPlan[] = [
  {
    id: "fallback-yearly",
    type: "YEARLY",
    price: 30,
    currency: "EUR",
    coverAmount: 5000,
    isActive: true,
  },
  {
    id: "fallback-per-trip",
    type: "PER_TRIP",
    price: 7,
    currency: "EUR",
    coverAmount: 5000,
    isActive: true,
  },
];

const COVER_ICONS = [
  MdOutlineHomeRepairService,
  FiLock,
  MdOutlineFlightTakeoff,
  FiClock,
];

const VacanzaProtect = () => {
  const { i18n } = useTranslation();
  const lang = resolveProtectLang(i18n.language);
  const copy = protectCopy[lang];

  const [plans, setPlans] = useState<ProtectPlan[]>(FALLBACK_PLANS);
  const [selectedPlan, setSelectedPlan] = useState<ProtectPlan | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    document.title = "Vacanza Protect — Home & travel insurance";

    // Ad traffic lands straight here, so give crawlers and link previews a summary.
    const description = document.querySelector('meta[name="description"]');
    const previous = description?.getAttribute("content") ?? null;
    description?.setAttribute("content", copy.hero.subtitle);

    return () => {
      if (previous !== null) description?.setAttribute("content", previous);
    };
  }, [copy.hero.subtitle]);

  useEffect(() => {
    getProtectPlans()
      .then((data) => {
        if (data?.length) setPlans(data);
      })
      .catch(() => {
        // Keep the fallback pricing on screen rather than an empty section.
      });
  }, []);

  // The backend sends the visitor back here when they abandon Stripe checkout.
  useEffect(() => {
    if (searchParams.get("checkout") === "cancelled") {
      toast.info(copy.checkout.cancelled);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const yearly = plans.find((p) => p.type === "YEARLY");
  const perTrip = plans.find((p) => p.type === "PER_TRIP");

  /** No account needed — the cover is sold standalone, email is enough. */
  const startCheckout = (plan: ProtectPlan | null) => {
    if (plan) setSelectedPlan(plan);
  };

  // An ad or email can deep link straight into a plan: /vacanzaprotect?plan=YEARLY
  useEffect(() => {
    const requestedPlan = searchParams.get("plan");
    if (!requestedPlan || selectedPlan) return;

    const plan = plans.find((p) => p.type === requestedPlan);
    if (!plan) return;

    setSelectedPlan(plan);
    searchParams.delete("plan");
    setSearchParams(searchParams, { replace: true });
  }, [searchParams, setSearchParams, plans, selectedPlan]);

  const money = (value: number, currency = "EUR") =>
    new Intl.NumberFormat(protectLocale[lang], {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(value);

  const breakEven = useMemo(() => {
    if (!yearly || !perTrip || perTrip.price <= 0) return 5;
    return Math.ceil(yearly.price / perTrip.price);
  }, [yearly, perTrip]);

  const scrollToPricing = () => {
    document
      .getElementById("protect-pricing")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const planCard = (plan: ProtectPlan | undefined, highlighted: boolean) => {
    if (!plan) return null;
    const isYearly = plan.type === "YEARLY";
    const text = isYearly ? copy.pricing.yearly : copy.pricing.perTrip;

    return (
      <div
        className={`relative flex w-full max-w-[420px] flex-col rounded-[28px] border p-8 transition-all duration-300 md:p-10 ${
          highlighted
            ? "border-transparent bg-primary-blue text-white shadow-[0_24px_60px_rgba(23,64,117,0.28)]"
            : "border-primary-border-color bg-white hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(23,64,117,0.12)]"
        }`}
      >
        {highlighted && (
          <span className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#FEE985] px-5 py-2 text-xs font-bold uppercase tracking-wide text-[#174075] shadow-md">
            {copy.pricing.popular}
          </span>
        )}

        <h3
          className={`font-DM-sans text-xl font-bold ${
            highlighted ? "text-white" : "text-[#174075]"
          }`}
        >
          {text.name}
        </h3>
        <p
          className={`mt-1 text-sm ${
            highlighted ? "text-white/75" : "text-gray-500"
          }`}
        >
          {text.tagline}
        </p>

        <div className="mt-7 flex items-end gap-2">
          <span
            className={`font-DM-sans text-[56px] font-bold leading-none ${
              highlighted ? "text-white" : "text-primary-blue"
            }`}
          >
            {money(plan.price, plan.currency)}
          </span>
          <span
            className={`pb-2 text-sm ${
              highlighted ? "text-white/75" : "text-gray-500"
            }`}
          >
            {text.per}
          </span>
        </div>

        {plan.coverAmount > 0 && (
          <p
            className={`mt-3 inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold ${
              highlighted
                ? "bg-white/15 text-white"
                : "bg-[#EAF1FA] text-primary-blue"
            }`}
          >
            <FiShield className="h-3.5 w-3.5" />
            {money(plan.coverAmount, plan.currency)}
          </p>
        )}

        <ul className="mt-7 flex-grow space-y-3.5">
          {text.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3 text-sm">
              <span
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                  highlighted ? "bg-white/20" : "bg-[#EAF1FA]"
                }`}
              >
                <FiCheck
                  className={`h-3 w-3 ${
                    highlighted ? "text-white" : "text-primary-blue"
                  }`}
                />
              </span>
              <span className={highlighted ? "text-white/90" : "text-dark-2"}>
                {feature}
              </span>
            </li>
          ))}
        </ul>

        <button
          onClick={() => startCheckout(plan)}
          className={`mt-9 w-full cursor-pointer rounded-full py-4 font-DM-sans text-base font-semibold transition ${
            highlighted
              ? "bg-white text-primary-blue hover:bg-[#EAF1FA]"
              : "bg-primary-blue text-white hover:bg-[#174075]"
          }`}
        >
          {copy.pricing.cta}
        </button>
      </div>
    );
  };

  return (
    <div className="font-DM-sans">
      {/* ---------------- Hero ---------------- */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#EAF1FA] via-[#F4F7FC] to-white">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary-blue/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-[#62c2f9]/10 blur-3xl" />

        <CommonWrapper>
          <div className="relative flex flex-col items-center py-20 text-center md:py-28">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary-border-color bg-white px-5 py-2 shadow-sm">
              <FiShield className="h-4 w-4 text-primary-blue" />
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-blue">
                {copy.hero.eyebrow}
              </span>
            </span>

            <h1 className="mt-7 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-[#174075] md:text-6xl">
              <span className="font-Grand-Hotel font-normal text-primary-blue tracking-wide mr-4">
                {copy.hero.accent}
              </span>
              {copy.hero.titleStart} {copy.hero.titleEnd}
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-gray-500 md:text-lg">
              {copy.hero.subtitle}
            </p>

            <div className="mt-9 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
              <button
                onClick={scrollToPricing}
                className="w-full cursor-pointer rounded-full bg-primary-blue px-9 py-4 text-base font-semibold text-white shadow-[0_12px_30px_rgba(49,116,205,0.35)] transition hover:bg-[#174075] sm:w-auto"
              >
                {copy.hero.ctaPrimary}
              </button>
              <button
                onClick={scrollToPricing}
                className="w-full cursor-pointer rounded-full border border-primary-border-color bg-white px-9 py-4 text-base font-semibold text-primary-blue transition hover:bg-[#EAF1FA] sm:w-auto"
              >
                {copy.hero.ctaSecondary}
              </button>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
              {copy.hero.trust.map((item) => (
                <span
                  key={item}
                  className="flex items-center gap-2 text-sm text-dark-2"
                >
                  <FiCheck className="h-4 w-4 text-primary-blue" />
                  {item}
                </span>
              ))}
            </div>

            {/* Stat strip */}
            <div className="mt-16 grid w-full max-w-3xl grid-cols-3 divide-x divide-primary-border-color overflow-hidden rounded-[24px] border border-primary-border-color bg-white shadow-[0_16px_44px_rgba(23,64,117,0.08)]">
              {copy.stats.map((stat) => (
                <div key={stat.label} className="px-3 py-6 md:px-6 md:py-8">
                  <p className="font-DM-sans text-2xl font-bold text-primary-blue md:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs text-gray-500 md:text-sm">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </CommonWrapper>
      </section>

      {/* ---------------- What is covered ---------------- */}
      <section className="py-20 md:py-24">
        <CommonWrapper>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-[#174075] md:text-4xl">
              {copy.covered.title}
            </h2>
            <p className="mt-4 text-base leading-7 text-gray-500">
              {copy.covered.subtitle}
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {copy.covered.items.map((item, index) => {
              const Icon = COVER_ICONS[index] ?? FiShield;
              return (
                <div
                  key={item.title}
                  className="group rounded-[24px] border border-primary-border-color bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:bg-[#F8FBFF] hover:shadow-[0_18px_44px_rgba(23,64,117,0.10)]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF1FA] text-primary-blue transition group-hover:bg-primary-blue group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 font-DM-sans text-lg font-bold text-[#174075]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </CommonWrapper>
      </section>

      {/* ---------------- How it works ---------------- */}
      <section className="bg-[#F4F7FC] py-20 md:py-24">
        <CommonWrapper>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-[#174075] md:text-4xl">
              {copy.how.title}
            </h2>
            <p className="mt-4 text-base leading-7 text-gray-500">
              {copy.how.subtitle}
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {copy.how.steps.map((step, index) => (
              <div
                key={step.title}
                className="relative rounded-[24px] bg-white p-8 shadow-[0_12px_36px_rgba(23,64,117,0.07)]"
              >
                <span className="absolute right-7 top-6 font-DM-sans text-5xl font-bold text-[#EAF1FA]">
                  {index + 1}
                </span>
                <h3 className="relative font-DM-sans text-lg font-bold text-[#174075]">
                  {step.title}
                </h3>
                <p className="relative mt-3 text-sm leading-6 text-gray-500">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </CommonWrapper>
      </section>

      {/* ---------------- Pricing ---------------- */}
      <section id="protect-pricing" className="scroll-mt-24 py-20 md:py-24">
        <CommonWrapper>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-[#174075] md:text-4xl">
              {copy.pricing.title}
            </h2>
            <p className="mt-4 text-base leading-7 text-gray-500">
              {copy.pricing.subtitle}
            </p>
          </div>

          <div className="mt-16 flex flex-col items-center justify-center gap-8 lg:flex-row lg:items-stretch">
            {planCard(perTrip, false)}
            {planCard(yearly, true)}
          </div>

          {/* Which plan fits me */}
          {yearly && perTrip && (
            <div className="mx-auto mt-14 max-w-3xl rounded-[24px] border border-primary-border-color bg-[#F8FBFF] p-7 md:p-9">
              <h3 className="text-center font-DM-sans text-lg font-bold text-[#174075]">
                {copy.pricing.compareTitle}
              </h3>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-white p-5 text-center shadow-sm">
                  <p className="text-sm text-gray-500">
                    {copy.pricing.compareFew}
                  </p>
                  <p className="mt-2 font-DM-sans text-2xl font-bold text-primary-blue">
                    {money(perTrip.price * 2, perTrip.currency)}
                  </p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-gray-400">
                    {copy.pricing.perTrip.name}
                  </p>
                </div>

                <div className="rounded-2xl bg-white p-5 text-center shadow-sm">
                  <p className="text-sm text-gray-500">
                    {copy.pricing.compareMany}
                  </p>
                  <p className="mt-2 font-DM-sans text-2xl font-bold text-primary-blue">
                    {money(yearly.price, yearly.currency)}
                  </p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-gray-400">
                    {copy.pricing.yearly.name}
                  </p>
                </div>
              </div>

              <p className="mt-6 text-center text-sm text-dark-2">
                {copy.pricing.breakEven.replace("{{count}}", String(breakEven))}
              </p>
            </div>
          )}
        </CommonWrapper>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section className="bg-[#F4F7FC] py-20 md:py-24">
        <CommonWrapper>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center text-3xl font-bold tracking-tight text-[#174075] md:text-4xl">
              {copy.faq.title}
            </h2>

            <div className="mt-12 space-y-3">
              {copy.faq.items.map((item, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={item.title}
                    className="overflow-hidden rounded-2xl border border-primary-border-color bg-white"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left"
                      aria-expanded={isOpen}
                    >
                      <span className="font-DM-sans text-base font-semibold text-[#174075]">
                        {item.title}
                      </span>
                      <FiChevronDown
                        className={`h-5 w-5 shrink-0 text-primary-blue transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <p className="animate-fadeIn px-6 pb-6 text-sm leading-6 text-gray-500">
                        {item.text}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </CommonWrapper>
      </section>

      {/* ---------------- Closing CTA ---------------- */}
      <section className="py-20 md:py-24">
        <CommonWrapper>
          <div className="relative overflow-hidden rounded-[32px] bg-primary-blue px-7 py-16 text-center md:px-14 md:py-20">
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-white/5 blur-2xl" />

            <h2 className="relative mx-auto max-w-2xl text-3xl font-bold leading-tight text-white md:text-4xl">
              {copy.cta.title}
            </h2>
            <p className="relative mx-auto mt-5 max-w-xl text-base leading-7 text-white/80">
              {copy.cta.subtitle}
            </p>

            <button
              onClick={() => startCheckout(yearly ?? perTrip ?? null)}
              className="relative mt-9 cursor-pointer rounded-full bg-white px-10 py-4 font-DM-sans text-base font-semibold text-primary-blue transition hover:bg-[#EAF1FA]"
            >
              {copy.cta.button}
            </button>

            <p className="relative mt-6 flex items-center justify-center gap-2 text-xs text-white/70">
              <FaCcStripe className="text-lg" />
              {copy.cta.note}
            </p>
          </div>
        </CommonWrapper>
      </section>

      <ProtectCheckoutDialog
        plan={selectedPlan}
        copy={copy}
        lang={lang}
        source="LANDING"
        onClose={() => setSelectedPlan(null)}
      />
    </div>
  );
};

export default VacanzaProtect;
