import AmenityCard from "../reusable/AmenityCard";

interface AmenitySection {
  icon: string; // changed from LucideIcon
  title: string;
  items: string[];
}

interface AmenitiesData {
  main: AmenitySection[];
  transport: AmenitySection[];
  surrounding: AmenitySection[];
}


interface AmenitiesProps {
  amenities: AmenitiesData;
}

const Amenities: React.FC<AmenitiesProps> = ({ amenities }) => {
  return (
    <div className="py-8">
      <h2 className="font-semibold text-primary-blue text-xl md:text-2xl font-regular mb-6">
        Amenities
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {amenities.main.map((amenity, index) => (
          <AmenityCard key={index} {...amenity} />
        ))}
      </div>

      <h2 className="font-semibold text-primary-blue text-xl md:text-2xl font-regular mt-10 mb-6">
        Means of Transport
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {amenities.transport.map((amenity, index) => (
          <AmenityCard key={index} {...amenity} />
        ))}
      </div>

      <h2 className="font-semibold text-primary-blue text-xl md:text-2xl font-regular mt-10 mb-6">
        What's surrounding your home?
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {amenities.surrounding.map((amenity, index) => (
          <AmenityCard key={index} {...amenity} />
        ))}
      </div>
    </div>
  );
};

export default Amenities;
