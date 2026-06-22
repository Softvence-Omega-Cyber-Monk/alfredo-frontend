import React from "react";
import { useTranslation } from "react-i18next";
import { termsContent } from "@/lib/data/termsAndCondition";

const TermsOfService: React.FC = () => {
  const { i18n } = useTranslation();

  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl mt-20">
      <div 
        className="prose prose-sm md:prose-base max-w-none whitespace-pre-line"
        dangerouslySetInnerHTML={{ __html: termsContent[i18n.language] || termsContent.en }} 
      />
    </div>
  );
};

export default TermsOfService;
