import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import {
  getOnboarding,
} from "@/store/Slices/OnboardingSlice/OnboardSlice";
import { useTranslation } from "react-i18next";
import DashboardHeading from "@/components/dashboard/DashboardHeading";
import Loader from "@/components/reusable/Loader";
import api from "@/services/api";
import axios from "axios";
import { toast } from "sonner";
import AddPlaceModal from "@/components/modals/AddPlaceModal";
import CardButtons from "@/components/reusable/CardButtons";
import { FaHandshake } from "react-icons/fa";
import { PiHeartbeatLight } from "react-icons/pi";
import { GiHouse } from "react-icons/gi";
import { FaHouseChimneyMedical } from "react-icons/fa6";
import { SearchProvider } from "@/contexts/SearchContext";
import SearchFilter from "@/components/home/SearchFilter";
import SearchResults from "@/components/Search/SearchResults";
import { fetchUser } from "@/store/Slices/Profile/ProfileSlice";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "@/components/reusable/PrimaryButton";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation("dashboard");
  const currentLanguage = i18n.language;
  const { loading, error } = useAppSelector((state) => state.onboarding);
  const { data: user } = useAppSelector((state) => state.user);
  const [plans, setPlans] = useState<any[]>([]);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleAddPlace = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const storedUser = localStorage.getItem("user");
  const currentUser = storedUser ? JSON.parse(storedUser) : null;
  const isUserSubscribed = currentUser?.isSubscribed || false;

  useEffect(() => {
    dispatch(getOnboarding());
  }, [dispatch]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await api.get("/plans");
        setPlans(res.data.data);
      } catch (error) {
        console.error("Error fetching plans:", error);
      }
    };
    fetchPlans();
  }, []);

  const handleCheckout = async (planType: "BASE" | "PREMIUM") => {
    try {
      setCheckoutLoading(true);
      // Find the plan that matches the type
      // We look for plans where the translation name or planType matches our target
      const targetPlan = plans.find((p) => {
        const translation = p.translations.find((tr: any) => tr.language === currentLanguage) || p.translations.find((tr: any) => tr.language === "en");
        return translation?.name?.toLowerCase().includes(planType.toLowerCase());
      });

      if (!targetPlan) {
        toast.error(`Could not find ${planType} plan details`);
        return;
      }

      const planTranslation = targetPlan.translations.find((tr: any) => tr.language === currentLanguage) || targetPlan.translations.find((tr: any) => tr.language === "en");
      const planDuration = planTranslation?.planType === "TWO_YEARLY" ? 2 : 1;

      const payload = {
        priceId: targetPlan.priceId,
        planId: targetPlan.id,
        planDuration,
      };

      const res = await api.post("/stripe-payment/checkout", payload);
      if (res.data.url) {
        window.location.href = res.data.url;
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Checkout failed");
      } else {
        toast.error("Unexpected error occurred");
      }
    } finally {
      setCheckoutLoading(false);
    }
  };

  const language = i18n.language?.startsWith("el") ? "el" : "en";

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* <h1 className="text-3xl font-bold text-primary-blue mb-6">
        {t("dashboard.title")}
      </h1> */}
      <DashboardHeading />

      {loading && (
        <div>
          <Loader />
        </div>
      )}
      {error && (
        <p className="text-red-500">
          {typeof error === "string" ? error : JSON.stringify(error.message)}
        </p>
      )}

      {/* HomeType Section */}
      <div className="mt-10">

        {/* New HomeType component is under development.  */}
        <CardButtons
          buttons={[
            {
              label: t("dashboard.button1"),
              icon: FaHouseChimneyMedical,
              type: "button",
              onClick: handleAddPlace,
            },
            {
              label: t("dashboard.button2"),
              icon: PiHeartbeatLight,
              type: "link",
              to: "/my-favorite",
            },
            {
              label: t("dashboard.button4"),
              icon: GiHouse,
              // rightIcon: MoveRight,
              type: "link",
              to: "/my-properties",
            },
            {
              label: t("dashboard.button3"),
              icon: FaHandshake,
              type: "link",
              to: "/exchange-request",
            },
          ]}
        />

        {
          !user?.subscriptions?.some(sub => sub.status === "ACTIVE") ? (
            <div className="mt-22">
              <p className="text-sm text-dark-3 font-regular text-center">{t("dashboard.part0.currentPlan")} : <span className="text-red-500 font-semibold capitalize">{t("dashboard.part0.no")}</span></p>
              <div className="mt-12 w-[90%] sm:w-[80%] md:w-[50%] lg:w-[40%] mx-auto flex flex-col md:flex-row items-center gap-4 justify-center">
                <Button
                  onClick={() => handleCheckout("BASE")}
                  disabled={checkoutLoading}
                  variant="secondary"
                  className="w-full cursor-pointer bg-primary-blue text-white px-6 py-7 hover:bg-[#114480]"
                >
                  {checkoutLoading ? "Processing..." : t("dashboard.part0.plan1")}
                </Button>
                <Button
                  onClick={() => handleCheckout("PREMIUM")}
                  disabled={checkoutLoading}
                  variant="secondary"
                  className="w-full cursor-pointer bg-[#174075] text-white px-6 py-7 hover:bg-[#114480]"
                >
                  {checkoutLoading ? "Processing..." : t("dashboard.part0.plan2")}
                </Button>
              </div>
            </div>
          ) : (() => {
            const activeSub = user?.subscriptions?.find(sub => sub.status === "ACTIVE");
            const activePlanName = activeSub?.plan?.translations?.find(tr => tr.language === "en")?.name || "";
            const isBase = activePlanName.toLowerCase().includes("base");
            const isPremium = activePlanName.toLowerCase().includes("premium");

            return (
              <div className="mt-10 flex flex-col items-center">
                <p className="text-sm text-dark-3 font-regular text-center">
                  {t("dashboard.part0.currentPlan")} :
                  <span className={`${isBase ? "text-green-500" : isPremium ? "text-[#FFB800]" : "text-red-500"} capitalize ml-1 font-semibold`}>
                    {isBase ? t("dashboard.part0.base") : isPremium ? t("dashboard.part0.premium") : activePlanName}
                  </span>
                </p>

                <div className="mt-6 flex flex-col md:flex-row items-center gap-4">
                  {isBase && (
                    <Button
                      onClick={() => window.open("https://buy.stripe.com/28E7sL0L43GK5aT9LWdIA01?prefilled_promo_code=UPREMIUM", "_blank")}
                      variant="secondary"
                      className="w-full cursor-pointer bg-[#174075] text-white px-8 py-6 hover:bg-[#114480] rounded-full"
                    >
                      {t("dashboard.part0.baseUpgrade")}
                    </Button>
                  )}
                  {isPremium && (
                    <Button
                      variant="secondary"
                      className="w-full cursor-pointer bg-primary-blue text-white px-8 py-6 hover:bg-[#114480] rounded-full"
                      onClick={() => window.open("https://www.ferryhopper.com/en/blog/special-offers?aff_uid=vcnzag&utm_source=affiliate-link&utm_medium=in-house&utm_campaign=vcnzag&utm_content=vacanzagreece", "_blank")}
                    >
                      {t("dashboard.part0.premiumUnlock")}
                    </Button>
                  )}
                </div>
              </div>
            );
          })()
        }

        <SearchProvider>
          <div className="mt-6 md:mt-8 lg:mt-10 w-full">
            <SearchFilter />
          </div>
          <div>
            <SearchResults />
          </div>
        </SearchProvider>

        <div className="mt-2 flex justify-center">
          <PrimaryButton
            title={t("dashboard.exploreMore")}
            onClick={() => {
              if (isUserSubscribed) {
                navigate("/places");
              } else {
                navigate("/plans");
              }
            }}
          />
        </div>


        <div className="mt-16 flex justify-center ">
          {
            language === "en" ?
              <div className="">
                <iframe width="390" height="420" scrolling="no" src="https://www.ferryhopper.com/en/embed/simple?aff_uid=vcnzag&options=nologo"></iframe>
              </div>
              :
              <div className="">
                <iframe width="390" height="420" scrolling="no" src="https://www.ferryhopper.com/el/embed/simple?aff_uid=vcnzag&options=nologo"></iframe>
              </div>
          }
        </div>


        <AddPlaceModal isOpen={isModalOpen} onClose={handleModalClose} />
      </div>
    </div>
  );
};

export default Dashboard;
