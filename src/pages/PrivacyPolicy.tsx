import React from "react";
import { useTranslation } from "react-i18next";
import { privacyContent } from "@/lib/data/termsAndCondition";

const PrivacyPolicy: React.FC = () => {
  const { i18n } = useTranslation();

  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl mt-20">
      <div 
        className="prose prose-sm md:prose-base max-w-none whitespace-pre-line"
        dangerouslySetInnerHTML={{ __html: privacyContent[i18n.language] || privacyContent.en }} 
      />
    </div>
  );
};

export default PrivacyPolicy;
