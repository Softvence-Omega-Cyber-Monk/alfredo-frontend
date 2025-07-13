import { FC } from "react";
import check from "../../assets/check.svg";
import { Plan } from "@/types";
import ReusableButton from "./ReusableButton";

const plans: Plan[] = [
    {
        title: "Traveler",
        duration: "1 Year Subscription",
        price: 59,
        features: [
            "TRAVELER badge",
            "Enter the community",
            "Search for houses",
            "Send requests to your favourite ones",
            "Unlimited free exchanges during the subscription",
            "Badge EARLY ADOPTER (Until 30/09)",
        ],
    },
    {
        title: "Premium Traveler",
        duration: "2 Years Subscription",
        price: 89,
        originalPrice: 220,
        badge: "EARLY ADOPTER (Until 30/09)",
        features: [
            "PREMIUM TRAVELER badge",
            "Enter the community",
            "Search for houses",
            "Search for houses and send request to your favourite ones",
            "Unlimited free exchanges during the subscription",
            "Priority Assistance",
            "Discounts on Planes, ferries and cars",
            "Badge EARLY ADOPTER (Until 30/09)",
        ],
    },
];

const ServicePlan: FC = () => {
    return (
        <section className="flex items-center justify-center">
            <div className="flex flex-col lg:flex-row gap-14 md:gap-6 lg:gap-6">
                {plans.map((plan, idx) => (
                    <div
                        key={idx}
                        className="relative bg-white p-[40px] flex flex-col w-full max-w-[384px] border border-primary-border-color rounded-[24px] text-center min-h-[680px]"
                    >
                        {/* Tag */}
                        <div className="absolute -top-6 left-23 bg-primary-blue text-white text-[16px] px-6 py-[10px] rounded-full shadow-md">
                            {plan.duration}
                        </div>

                        {/* Content Wrapper */}
                        <div className="flex flex-col gap-6 flex-grow">
                            {/* Title */}
                            <div>
                                <h2 className="text-[24px] font-semibold text-[#505050]">
                                    {plan.title}
                                </h2>

                                {/* Pricing */}
                                <div className="mx-auto mt-1">
                                    <p className="text-[64px] font-semibold text-primary-blue">
                                        {plan.originalPrice && (
                                            <span className="text-[24px] font-semibold text-[#B9B9B9] line-through mr-2">
                                                {plan.originalPrice}
                                            </span>
                                        )}
                                        {plan.price}{" "}
                                        <span className="text-[24px] font-semibold">eur</span>
                                    </p>
                                </div>
                                <p className="text-[16px] text-[#505050] mt-2">
                                    Billed annually
                                </p>
                            </div>

                            <div className="border-b border-b-[#EAF1FA]"></div>

                            {/* Features */}
                            <ul className="space-y-3 text-left">
                                {plan.features.map((feature, i) => (
                                    <li
                                        key={i}
                                        className="flex items-center gap-3 text-basic-dark text-4"
                                    >
                                        <img src={check} alt="check icon" className="w-5 h-5" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* CTA Button */}
                        <ReusableButton className="mt-6 w-full">
                            Choose Plan
                        </ReusableButton>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ServicePlan;
