import emptyPlaces from "@/assets/no-property.svg";
const PlacesEmpty = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6 mt-5">
        <img src={emptyPlaces} alt="No places available" />
    </div>
  )
}

export default PlacesEmpty