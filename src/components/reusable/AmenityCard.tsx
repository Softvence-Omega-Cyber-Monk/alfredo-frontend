interface AmenityItem {
  icon: React.ElementType;
  title: string;
}


const AmenityCard = ({ icon: Icon, title }: AmenityItem) => {
  return (
    <div className="rounded-2xl">
    <div className="flex gap-2 items-center ">
      <Icon className="w-6 h-6 md:w-8 md:h-8 text-primary-blue" />
      <h3 className="text-lg md:text-xl font-regular text-dark-2">{title}</h3>
    </div>
  </div>
  )
}

export default AmenityCard