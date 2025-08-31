// src/components/TranslateText.tsx
import React from "react";
import { useTranslation } from "react-i18next";

interface TranslateTextProps {
  translationKey: string;
  children?: React.ReactNode;
}

const TranslateText: React.FC<TranslateTextProps> = ({
  translationKey,
  children,
}) => {
  const { t } = useTranslation();
  return <>{children || t(translationKey)}</>;
};

export default TranslateText;
