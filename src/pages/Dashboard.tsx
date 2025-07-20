import CommonWrapper from "@/common/CommonWrapper";
import DashboardAmenities from "@/components/dashboard/DashboardAmenities";
import DashboardHeading from "@/components/dashboard/DashboardHeading";
import HomeType from "@/components/dashboard/HomeType";
import PreviewHome from "@/components/dashboard/PreviewHome";
import DashboardHomeDetails from "@/components/dashboard/DashboardHomeDetails";

const Dashboard = () => {
  return (
    <div className="">
      <CommonWrapper>
        <div className="p-6">
          <DashboardHeading />
          <PreviewHome />
          <HomeType />
          <DashboardAmenities />
          <DashboardHomeDetails />
        </div>
      </CommonWrapper>
    </div>
  );
};

export default Dashboard;
