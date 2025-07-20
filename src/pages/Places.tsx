import CommonWrapper from "@/common/CommonWrapper"
import PlacesGrid from "@/components/places/PlacesGrid"
import PlacesHeading from "@/components/places/PlacesHeading"

const Places = () => {
  return (
    <div className="">
      <CommonWrapper>
        <div className="p-6">
          <PlacesHeading/>
          <PlacesGrid/>
        </div>
      </CommonWrapper>
    </div>
  )
}

export default Places