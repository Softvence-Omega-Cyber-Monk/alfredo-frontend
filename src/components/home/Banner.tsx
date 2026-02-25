import CommonWrapper from "@/common/CommonWrapper";
import SearchFilter from "./SearchFilter";
import { useTranslation } from "react-i18next";
import { SearchProvider } from "@/contexts/SearchContext";
import SearchResults from "../Search/SearchResults";

const Banner = () => {
  const { t } = useTranslation("banner");
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  return (
    <div
      className="w-full bg-bottom bg-repeat-x flex flex-col items-center justify-center relative"
      style={{
        backgroundImage: `url('/cityscape.svg')`,
      }}
    >
      <div className="inset-0 absolute bg-[#F4F7FC] -z-20"></div>
      <CommonWrapper>
        <div className="flex flex-col items-center justify-center gap-4 py-7 md:py-[80px] lg:py-[140px]">
          <div className="text-center font-normal text-dark-3 px-4 md:px-6">
            <h1
              className={`capitalize max-w-[700px] mx-auto leading-[1.2] ${currentLanguage === "el"
                  ? "text-2xl md:text-4xl lg:text-[50px]" // smaller for Greek
                  : "text-3xl md:text-5xl lg:text-[70px]" // default for English and others
                }`}
            >
              {t("banner.title")}{" "}
              <span
                className={`font-Grand-Hotel text-primary-blue ${currentLanguage === "el" ? "" : ""
                  }`}
              >
                {t("banner.highlight")}
              </span>
            </h1>

            <p className="text-base md:text-lg lg:text-xl font-medium mt-3 md:mt-4 lg:mt-6">
              {t("banner.subtitle")}
            </p>
          </div>
          {/* <div className="mt-6 md:mt-8 lg:mt-10 w-full">
            <SearchFilter />
          </div> */}
          <SearchProvider>
            <div className="mt-6 md:mt-8 lg:mt-10 w-full">
              <SearchFilter />
            </div>
            <div>
              <SearchResults />
            </div>
          </SearchProvider>
        </div>
      </CommonWrapper>
    </div>
  );
};

export default Banner;
