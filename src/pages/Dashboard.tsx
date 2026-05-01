import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import {
  getOnboarding,
  // postOnboarding,
} from "@/store/Slices/OnboardingSlice/OnboardSlice";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import HomeType from "@/components/dashboard/HomeType";
// import DashboardAmenities from "@/components/dashboard/DashboardAmenities";
// import PhotoUpload from "@/components/dashboard/PhotoUpload";
// import DashboardCalendarRangePicker from "@/components/dashboard/DashboardCalendarRangePicker";
// import type { Amenity } from "@/lib/data/amenities";
import { useTranslation } from "react-i18next";
import DashboardHeading from "@/components/dashboard/DashboardHeading";
import Loader from "@/components/reusable/Loader";
import api from "@/services/api";
import axios from "axios";
import { toast } from "sonner";

// import { MoveRight } from "lucide-react";
// import { Link } from "react-router-dom";
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
// import { Link } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation("dashboard");
  const currentLanguage = i18n.language;
  const { data, loading, error } = useAppSelector((state) => state.onboarding);
  const { data: user } = useAppSelector((state) => state.user);
  const [plans, setPlans] = useState<any[]>([]);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  console.log("user in dashboard", user);
  console.log("dasdadfadsfa", data);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleAddPlace = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  // const storedUser = localStorage.getItem("user");
  // const user = storedUser ? JSON.parse(storedUser) : null;

  // Controlled state
  // const [formValues, setFormValues] = useState({
  //   homeAddress: "",
  //   destination: "",
  //   propertyType: "HOME" as "HOME" | "APARTMENT",
  //   isMainResidence: true,
  //   amenities: [] as string[],
  //   transport: [] as string[],
  //   surroundings: [] as string[],
  //   homeName: "",
  //   homeDescription: "",
  //   aboutNeighborhood: "",
  //   homeImages: [] as File[], // use File[] for PhotoUpload
  //   isAvailableForExchange: true,
  //   availabilityDates: { start: null as Date | null, end: null as Date | null },
  // });

  // Full object structure for amenities
  // const [selectedAmenities, setSelectedAmenities] = useState<{
  //   main: Amenity[];
  //   transport: Amenity[];
  //   surrounding: Amenity[];
  // }>({ main: [], transport: [], surrounding: [] });

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

  // useEffect(() => {
  //   if (list && (list as any).data) {
  //     const d = (list as any).data;
  //     setFormValues({
  //       homeAddress: d.homeAddress || "",
  //       destination: d.destination || "",
  //       propertyType: d.propertyType || "HOME",
  //       isMainResidence: d.isMainResidence ?? true,
  //       amenities: d.amenities || [],
  //       transport: d.transports || [],
  //       surroundings: d.surroundings || [],
  //       homeName: d.homeName || "",
  //       homeDescription: d.homeDescription || "",
  //       aboutNeighborhood: d.aboutNeighborhood || "",
  //       homeImages: [], // server has URLs, but PhotoUpload expects File[], could extend later
  //       isAvailableForExchange: d.isAvailableForExchange ?? true,
  //       availabilityDates: {
  //         start: d.availabilityStartDate
  //           ? new Date(d.availabilityStartDate)
  //           : null,
  //         end: d.availabilityEndDate ? new Date(d.availabilityEndDate) : null,
  //       },
  //     });

  //     setSelectedAmenities({
  //       main: (d.amenities || []).map((title: string) => ({ title, icon: "" })),
  //       transport: (d.transports || []).map((title: string) => ({
  //         title,
  //         icon: "",
  //       })),
  //       surrounding: (d.surroundings || []).map((title: string) => ({
  //         title,
  //         icon: "",
  //       })),
  //     });
  //   }
  // }, [list]);

  // const handleDataChange = (updates: Partial<typeof formValues>) => {
  //   setFormValues((prev) => ({ ...prev, ...updates }));
  // };

  // const handleSubmit = () => {
  //   const payload = {
  //     ...formValues,
  //     amenities: selectedAmenities.main.map((a) => a.title),
  //     transport: selectedAmenities.transport.map((a) => a.title),
  //     surroundings: selectedAmenities.surrounding.map((a) => a.title),
  //     availabilityStartDate: formValues.availabilityDates.start
  //       ? formValues.availabilityDates.start.toISOString()
  //       : null,
  //     availabilityEndDate: formValues.availabilityDates.end
  //       ? formValues.availabilityDates.end.toISOString()
  //       : null,
  //   };

  //   const formData = new FormData();
  //   formData.append("data", JSON.stringify(payload));
  //   formValues.homeImages.forEach((file) => formData.append("images", file));
  //   dispatch(postOnboarding(formData));
  // };

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
        {/* <h3 className="text-lg text-primary-blue font-semibold ">
          Preview Your Home Listing
        </h3> */}
        {/* <p className="text-base text-dark-3 font-regular mt-3 ">
          {t("dashboard.part1.subtitle")}
        </p> */}
        {/* <HomeType
          homeType={formValues.propertyType === "HOME" ? "home" : "apartment"}
          residenceType={formValues.isMainResidence ? "main" : "occasional"}
          onHomeTypeChange={(type) =>
            handleDataChange({
              propertyType: type.toUpperCase() as "HOME" | "APARTMENT",
            })
          }
          onResidenceTypeChange={(resType) =>
            handleDataChange({ isMainResidence: resType === "main" })
          }
        /> */}

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
                      className="w-full cursor-pointer bg-primary-blue text-white px-8 py-6 hover:bg-[#114480] rounded-full"
                    >
                      {t("dashboard.part0.baseUpgrade")}
                    </Button>
                  )}
                  {isPremium && (
                    <Button
                      variant="secondary"
                      className="w-full cursor-pointer bg-primary-blue text-white px-8 py-6 hover:bg-[#114480] rounded-full"
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


        <AddPlaceModal isOpen={isModalOpen} onClose={handleModalClose} />
      </div>

      {/* Home Address & Destination */}
      {/* <div className="mt-10">
        <h3 className="text-lg text-primary-blue font-semibold ">Location</h3>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            value={formValues.homeAddress}
            onChange={(e) => handleDataChange({ homeAddress: e.target.value })}
            placeholder={t("dashboard.part2.placeholder1")}
            className="px-4 py-3"
          />
          <Input
            value={formValues.destination}
            onChange={(e) => handleDataChange({ destination: e.target.value })}
            placeholder={t("dashboard.part2.placeholder2")}
            className="px-4 py-3"
          />
        </div>
      </div> */}

      {/* Home Name & Description */}
      {/* <div className="mt-10">
        <h3 className="text-lg text-primary-blue font-semibold ">
          Give your home a Name
        </h3>

        <Input
          value={formValues.homeName}
          onChange={(e) => handleDataChange({ homeName: e.target.value })}
          placeholder={t("dashboard.part3.placeholder1")}
          className="mt-4 px-4 py-3"
        />
        <h3 className="text-lg text-primary-blue font-semibold mt-5">
          Describe your home
        </h3>

        <Textarea
          value={formValues.homeDescription}
          onChange={(e) =>
            handleDataChange({ homeDescription: e.target.value })
          }
          placeholder={"Describe your home"}
          className="mt-5 min-h-[100px]"
        />
      </div> */}

      {/* Neighborhood */}
      {/* <div className="mt-10">
        <h3 className="text-lg text-primary-blue font-semibold ">
          Tell us about the area around your home
        </h3>
        <Textarea
          value={formValues.aboutNeighborhood}
          onChange={(e) =>
            handleDataChange({ aboutNeighborhood: e.target.value })
          }
          placeholder={t("dashboard.part4.placeholder")}
          className="mt-4 min-h-[100px]"
        />
      </div> */}

      {/* Amenities */}
      {/* <div className="mt-10">
        <h3 className="text-lg text-primary-blue font-semibold ">Amenities</h3>
        <DashboardAmenities
          selectedAmenities={selectedAmenities}
          onAmenitiesChange={setSelectedAmenities}
        />
      </div> */}

      {/* Photos */}
      {/* <div className="mt-10">
        <h3 className="text-lg text-primary-blue font-semibold ">
          Upload Photos
        </h3>
        <PhotoUpload
          photos={formValues.homeImages}
          onPhotosChange={(newPhotos) =>
            handleDataChange({ homeImages: newPhotos })
          }
        />
      </div> */}

      {/* Availability */}
      {/* <div className="mt-10">
        <h3 className="text-lg text-primary-blue font-semibold ">
          {t("dashboard.part4.titleAvailability")}
        </h3>
        <DashboardCalendarRangePicker
          availabilityDates={formValues.availabilityDates}
          onAvailabilityChange={(dates) =>
            handleDataChange({ availabilityDates: dates })
          }
        />
      </div> */}

      {/* Exchange */}
      {/* <div className="mt-10">
        <h3 className="text-lg text-primary-blue font-semibold ">
          {t("dashboard.part5.title")}
        </h3>
        <select
          value={formValues.isAvailableForExchange ? "yes" : "no"}
          onChange={(e) =>
            handleDataChange({
              isAvailableForExchange: e.target.value === "yes",
            })
          }
          className="mt-4 border rounded-lg px-4 py-3"
        >
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div> */}

      {/* Submit */}
      {/* <div className="mt-12">
        <button
          onClick={handleSubmit}
          className="px-6 py-3 bg-primary-blue text-white rounded-lg shadow hover:bg-primary-blue/90 cursor-pointer transition"
        >
          Save Changes
        </button>
      </div> */}
    </div>
  );
};

export default Dashboard;
