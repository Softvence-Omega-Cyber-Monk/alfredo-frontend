"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cookieContent } from "@/lib/data/termsAndCondition";

interface CookiePolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CookiePolicyModal = ({ isOpen, onClose }: CookiePolicyModalProps) => {
  const { i18n } = useTranslation();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-6">
        {/* Header */}
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-2xl font-bold">
            Cookie Policy
          </DialogTitle>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X size={24} />
          </button>
        </DialogHeader>

        {/* Scrollable Content */}
        <ScrollArea className="mt-4 h-[400px] pr-2">
          <DialogDescription className="sr-only">
            Please read our cookie policy carefully.
          </DialogDescription>
          <div className="prose prose-sm max-w-none whitespace-pre-line">
            {cookieContent[i18n.language] || cookieContent.en}
          </div>
        </ScrollArea>

        {/* Footer */}
        <DialogFooter>
          <Button onClick={onClose}>I Understand</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CookiePolicyModal;
