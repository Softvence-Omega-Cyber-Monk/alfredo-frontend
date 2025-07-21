import { useState } from "react";
import MiniWrapper from "@/common/MiniWrapper";
import { Button } from "../ui/button";

const languages = ["English", "Greek"];

const Language = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  return (
    <MiniWrapper>
      <div className="space-y-8">
        <div>
          <Button className="w-full text-2xl font-DM-sans flex h-14 justify-center items-center gap-2 self-stretch rounded-xl bg-[var(--Primary-P-25,#F4F7FC)] text-[var(--color-primary-blue)] hover:bg-[#e1e9f5] transition-colors duration-200 cursor-pointer">
            Language Settings
          </Button>
        </div>

        <div className=" space-y-80">
          {/* Language options */}
          <div className="space-y-3">
            {languages.map((lang) => {
              const isSelected = selectedLanguage === lang;
              return (
                <Button
                  key={lang}
                  onClick={() => setSelectedLanguage(lang)}
                  className={`w-full flex h-14 justify-between items-center rounded-xl px-4 cursor-pointer transition-colors duration-200 ${
                    isSelected
                      ? "bg-[#3174CD] text-white"
                      : "bg-[#FBFBFB] text-[#3174CD]"
                  }`}
                >
                  {lang}
                  <label className="relative w-5 h-5">
                    <input
                      type="checkbox"
                      readOnly
                      checked={isSelected}
                      className={`peer appearance-none w-5 h-5 rounded-full border-2 ${
                        isSelected
                          ? "border-white bg-white"
                          : "border-gray-400 bg-transparent"
                      }`}
                    />
                    <span
                      className={`absolute top-1 left-1 w-3 h-3 bg-[#3174CD] rounded-full transition-transform ${
                        isSelected ? "scale-100" : "scale-0"
                      }`}
                    ></span>
                  </label>
                </Button>
              );
            })}
          </div>

          {/* Save button */}
          <div>
            <Button className="w-full text-lg font-DM-sans flex h-14 justify-center items-center gap-2 self-stretch rounded-xl bg-[#E9E9E9] text-[var(--color-basic-dark)] hover:bg-[#d4d3d3] transition-colors duration-200 cursor-pointer">
              Save
            </Button>
          </div>
        </div>
      </div>
    </MiniWrapper>
  );
};

export default Language;
