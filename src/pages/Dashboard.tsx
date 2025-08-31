import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import {
  getOnboarding,
  postOnboarding,
} from "@/store/Slices/OnboardingSlice/OnboardSlice";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import HomeType from "@/components/dashboard/HomeType";
import DashboardAmenities from "@/components/dashboard/DashboardAmenities";
import PhotoUpload from "@/components/dashboard/PhotoUpload";
import DashboardCalendarRangePicker from "@/components/dashboard/DashboardCalendarRangePicker";
import type { Amenity } from "@/lib/data/amenities";
import { useTranslation } from "react-i18next";
import DashboardHeading from "@/components/dashboard/DashboardHeading";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation("dashboard");
  const { data, list, loading, error } = useAppSelector(
    (state) => state.onboarding
  );
  console.log("dasdadfadsfa", data);

  // Controlled state
  const [formValues, setFormValues] = useState({
    homeAddress: "",
    destination: "",
    propertyType: "HOME" as "HOME" | "APARTMENT",
    isMainResidence: true,
    amenities: [] as string[],
    transport: [] as string[],
    surroundings: [] as string[],
    homeName: "",
    homeDescription: "",
    aboutNeighborhood: "",
    homeImages: [] as File[], // use File[] for PhotoUpload
    isAvailableForExchange: true,
    availabilityDates: { start: null as Date | null, end: null as Date | null },
  });

  // Full object structure for amenities
  const [selectedAmenities, setSelectedAmenities] = useState<{
    main: Amenity[];
    transport: Amenity[];
    surrounding: Amenity[];
  }>({ main: [], transport: [], surrounding: [] });

  useEffect(() => {
    dispatch(getOnboarding());
  }, [dispatch]);

  useEffect(() => {
    if (list && (list as any).data) {
      const d = (list as any).data;
      setFormValues({
        homeAddress: d.homeAddress || "",
        destination: d.destination || "",
        propertyType: d.propertyType || "HOME",
        isMainResidence: d.isMainResidence ?? true,
        amenities: d.amenities || [],
        transport: d.transports || [],
        surroundings: d.surroundings || [],
        homeName: d.homeName || "",
        homeDescription: d.homeDescription || "",
        aboutNeighborhood: d.aboutNeighborhood || "",
        homeImages: [], // server has URLs, but PhotoUpload expects File[], could extend later
        isAvailableForExchange: d.isAvailableForExchange ?? true,
        availabilityDates: {
          start: d.availabilityStartDate
            ? new Date(d.availabilityStartDate)
            : null,
          end: d.availabilityEndDate ? new Date(d.availabilityEndDate) : null,
        },
      });

      setSelectedAmenities({
        main: (d.amenities || []).map((title: string) => ({ title, icon: "" })),
        transport: (d.transports || []).map((title: string) => ({
          title,
          icon: "",
        })),
        surrounding: (d.surroundings || []).map((title: string) => ({
          title,
          icon: "",
        })),
      });
    }
  }, [list]);

  const handleDataChange = (updates: Partial<typeof formValues>) => {
    setFormValues((prev) => ({ ...prev, ...updates }));
  };

  const handleSubmit = () => {
    const payload = {
      ...formValues,
      amenities: selectedAmenities.main.map((a) => a.title),
      transport: selectedAmenities.transport.map((a) => a.title),
      surroundings: selectedAmenities.surrounding.map((a) => a.title),
      availabilityStartDate: formValues.availabilityDates.start
        ? formValues.availabilityDates.start.toISOString()
        : null,
      availabilityEndDate: formValues.availabilityDates.end
        ? formValues.availabilityDates.end.toISOString()
        : null,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(payload));
    formValues.homeImages.forEach((file) => formData.append("images", file));
    dispatch(postOnboarding(formData));
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* <h1 className="text-3xl font-bold text-primary-blue mb-6">
        {t("dashboard.title")}
      </h1> */}
      <DashboardHeading />

      {loading && <p>Loading...</p>}
      {error && (
        <p className="text-red-500">
          {typeof error === "string" ? error : JSON.stringify(error)}
        </p>
      )}

      {/* HomeType Section */}
      <div className="mt-10">
        <h3 className="text-lg text-primary-blue font-semibold ">
          Preview Your Home Listing
        </h3>
        {/* <p className="text-base text-dark-3 font-regular mt-3 ">
          {t("dashboard.part1.subtitle")}
        </p> */}
        <HomeType
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
        />
      </div>

      {/* Home Address & Destination */}
      <div className="mt-10">
        <h3 className="text-lg text-primary-blue font-semibold ">Location</h3>
        {/* <p className="text-base text-dark-3 font-regular mt-3 ">
          {t("dashboard.part2.subtitle")}
        </p> */}

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
      </div>

      {/* Home Name & Description */}
      <div className="mt-10">
        <h3 className="text-lg text-primary-blue font-semibold ">
          Give your home a Name
        </h3>

        <Input
          value={formValues.homeName}
          onChange={(e) => handleDataChange({ homeName: e.target.value })}
          placeholder={t("dashboard.part3.placeholder1")}
          className="mt-4 px-4 py-3"
        />
        <h3 className="text-lg text-primary-blue font-semibold ">
          Describe your home
        </h3>

        <Textarea
          value={formValues.homeDescription}
          onChange={(e) =>
            handleDataChange({ homeDescription: e.target.value })
          }
          placeholder={"Describe your home"}
          className="mt-6 min-h-[100px]"
        />
      </div>

      {/* Neighborhood */}
      <div className="mt-10">
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
      </div>

      {/* Amenities */}
      <div className="mt-10">
        <h3 className="text-lg text-primary-blue font-semibold ">Amenities</h3>
        <DashboardAmenities
          selectedAmenities={selectedAmenities}
          onAmenitiesChange={setSelectedAmenities}
        />
      </div>

      {/* Photos */}
      <div className="mt-10">
        <h3 className="text-lg text-primary-blue font-semibold ">
          Upload Photos
        </h3>
        <PhotoUpload
          photos={formValues.homeImages}
          onPhotosChange={(newPhotos) =>
            handleDataChange({ homeImages: newPhotos })
          }
        />
      </div>

      {/* Availability */}
      <div className="mt-10">
        <h3 className="text-lg text-primary-blue font-semibold ">
          {t("dashboard.part7.title")}
        </h3>
        <DashboardCalendarRangePicker
          availabilityDates={formValues.availabilityDates}
          onAvailabilityChange={(dates) =>
            handleDataChange({ availabilityDates: dates })
          }
        />
      </div>

      {/* Exchange */}
      <div className="mt-10">
        <h3 className="text-lg text-primary-blue font-semibold ">
          Available for Home Exchange?
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
      </div>

      {/* Submit */}
      <div className="mt-12">
        <button
          onClick={handleSubmit}
          className="px-6 py-3 bg-primary-blue text-white rounded-lg shadow hover:bg-primary-blue/90 cursor-pointer transition"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
