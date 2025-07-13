import { LucideIcon } from "lucide-react";

interface FeatureItemProps {
  icon: LucideIcon;
  value: number;
  label: string;
}

const FeatureItem = ({ icon: Icon, value, label }: FeatureItemProps) => {
  return (
    <div className="flex justify-center items-center gap-4">
      <Icon className="text-primary-blue w-5 h-5 md:w-8 md:h-8" />
      <div>
        {value ? (
          <p className="text-dark-3 font-medium text-xl md:text-2xl">
            {value}
          </p>
        ) : (
          <p className="text-dark-3 font-regular text-sm">{label}</p>
        )}
      </div>
    </div>
  );
};

export default FeatureItem;
