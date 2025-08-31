import CommonWrapper from "@/common/CommonWrapper";
import PropertiesGrid from "@/components/my-properties/PropertiesGrid";
import PropertiesHeading from "@/components/my-properties/PropertiesHeading";

const MyProperties = () => {
  return (
    <div className="">
      <CommonWrapper>
        <div className="p-6">
          <PropertiesHeading />
          <PropertiesGrid />
        </div>
      </CommonWrapper>
    </div>
  );
};

export default MyProperties;
