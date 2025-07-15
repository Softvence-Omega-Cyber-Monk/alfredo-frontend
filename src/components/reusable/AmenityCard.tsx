interface AmenityItem {
  icon: string;
  title: string;
}

const AmenityCard = ({ icon, title }: AmenityItem) => {
  return (
    <div className="rounded-2xl">
      <div className="flex gap-2 items-center ">
        <img src={icon} className="w-5 h-5  md:w-8 md:h-8" alt={title} />
        <h3 className="text-base md:text-xl font-regular text-dark-2">{title}</h3>
      </div>
    </div>
  );
};

export default AmenityCard;
