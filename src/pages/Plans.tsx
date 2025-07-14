import CommonWrapper from "@/common/CommonWrapper";
import AccordionComponent from "@/components/reusable/AccordionComponent";
import ClientHeading from "@/components/reusable/ClientHeading";
import Conversation from "@/components/reusable/Conversation";
import ServicePlan from "@/components/reusable/ServicePlan";
import Subscribe from "@/components/reusable/Subscribe";
import { bonus } from "@/lib/AccordionData/accordionData";
import { MembershipStage } from "@/types";
import { FC } from "react";

const Plans: FC = () => {
  const membershipStages: MembershipStage[] = [
    { title: "New Member", subtitle: "1st Year", completed: true },
    { title: "Bronze Member", subtitle: "2nd Year", completed: true },
    { title: "Silver Member", subtitle: "3rd Year", completed: false },
    { title: "Gold Member", subtitle: "4th Year", completed: false },
    { title: "Platinum Member", subtitle: "5th Year", completed: false },
    { title: "Diamond Member", subtitle: "6th Year", completed: false },
    { title: "Master Member", subtitle: "7th Year", completed: false },
  ];

  const CompletedStar = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="105" height="105" viewBox="0 0 105 105" fill="none">
      <g filter="url(#filter0_d_4607_5988)">
        <path d="M50.2989 33.4965C51.0905 31.7467 53.5755 31.7467 54.3671 33.4965L55.5367 36.0819C56.0996 37.3264 57.6381 37.7781 58.7845 37.0356L61.1662 35.4929C62.7782 34.4488 64.8687 35.7923 64.5886 37.6923L64.1747 40.4996C63.9755 41.8509 65.0255 43.0627 66.3914 43.0578L69.229 43.0477C71.1496 43.0408 72.1819 45.3013 70.919 46.7482L69.0531 48.8861C68.155 49.9152 68.3832 51.5023 69.5348 52.2366L71.9275 53.7622C73.5468 54.7948 73.1932 57.2545 71.3485 57.789L68.623 58.5788C67.3111 58.9589 66.645 60.4174 67.2168 61.6578L68.4048 64.2348C69.2089 65.9789 67.5815 67.857 65.7407 67.3093L63.0209 66.5002C61.7117 66.1107 60.3628 66.9776 60.1733 68.3302L59.7795 71.1404C59.513 73.0424 57.1286 73.7425 55.8761 72.2865L54.0255 70.1354C53.1347 69.0999 51.5313 69.0999 50.6405 70.1354L48.79 72.2865C47.5374 73.7425 45.1531 73.0424 44.8865 71.1404L44.4927 68.3302C44.3032 66.9776 42.9543 66.1107 41.6451 66.5002L38.9253 67.3093C37.0845 67.857 35.4571 65.9789 36.2612 64.2348L37.4492 61.6578C38.021 60.4174 37.355 58.9589 36.0431 58.5788L33.3175 57.789C31.4728 57.2545 31.1192 54.7948 32.7385 53.7622L35.1312 52.2366C36.2829 51.5023 36.5111 49.9152 35.6129 48.8861L33.747 46.7482C32.4841 45.3013 33.5165 43.0408 35.437 43.0477L38.2746 43.0578C39.6405 43.0627 40.6905 41.8509 40.4913 40.4996L40.0774 37.6923C39.7973 35.7923 41.8879 34.4488 43.4998 35.4929L45.8815 37.0356C47.0279 37.7781 48.5664 37.3264 49.1293 36.0819L50.2989 33.4965Z" fill="#FFCE23" stroke="white" strokeWidth="1.5"/>
      </g>
      <defs>
        <filter id="filter0_d_4607_5988" x="0.205078" y="0.684082" width="104.256" height="103.883" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset/>
          <feGaussianBlur stdDeviation="15"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.668421 0 0 0 0 0 0 0 0 1 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4607_5988"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4607_5988" result="shape"/>
        </filter>
      </defs>
    </svg>
  );

  const IncompleteStar = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 45 45" fill="none">
      <path d="M19.7822 3.1875C20.8397 0.849826 24.1603 0.84982 25.2178 3.1875L26.3867 5.77246C26.7606 6.59886 27.7827 6.89934 28.5439 6.40625L30.9258 4.86328C33.0792 3.46879 35.8722 5.26358 35.498 7.80176L35.084 10.6094C34.9519 11.5066 35.6488 12.3108 36.5557 12.3076L39.3936 12.2979C41.959 12.2889 43.3381 15.3082 41.6514 17.2412L39.7852 19.3789C39.1887 20.0623 39.3407 21.1168 40.1055 21.6045L42.498 23.1299C44.661 24.5094 44.1887 27.7956 41.7246 28.5098L38.999 29.2988C38.1279 29.5512 37.6849 30.5201 38.0645 31.3438L39.2529 33.9209C40.327 36.2509 38.1525 38.76 35.6934 38.0283L32.9736 37.2188C32.1044 36.9604 31.2089 37.5365 31.083 38.4346L30.6895 41.2441C30.3334 43.7851 27.1479 44.7204 25.4746 42.7754L23.624 40.624C23.0325 39.9367 21.9675 39.9367 21.376 40.624L19.5254 42.7754C17.8521 44.7204 14.6666 43.7851 14.3105 41.2441L13.917 38.4346C13.7911 37.5365 12.8956 36.9604 12.0264 37.2188L9.30664 38.0283C6.84745 38.76 4.67298 36.2509 5.74707 33.9209L6.93555 31.3438C7.3151 30.5201 6.87208 29.5512 6.00098 29.2988L3.27539 28.5098C0.811344 27.7956 0.338955 24.5094 2.50195 23.1299L4.89453 21.6045C5.65931 21.1168 5.81126 20.0623 5.21484 19.3789L3.34863 17.2412C1.66192 15.3082 3.04098 12.2889 5.60645 12.2979L8.44434 12.3076C9.35123 12.3108 10.0481 11.5066 9.91602 10.6094L9.50195 7.80176C9.12779 5.26358 11.9208 3.46878 14.0742 4.86328L16.4561 6.40625C17.2173 6.89934 18.2394 6.59885 18.6133 5.77246L19.7822 3.1875Z" fill="#FFCE23" stroke="white" strokeWidth="1.5"/>
    </svg>
  );

  return (
    <div>
      <CommonWrapper>
        <div className="mt-16 max-[767px]:mt-8">
          <ClientHeading headingText="our" spanText="plans" />
          <p className="text-[24px] sm:text-[24px] text-center text-basic-dark max-sm:text-[16px] max-sm:leading-[24px]">
            Flexible membership options designed to fit every traveler’s needs—
            <br className="hidden sm:block" />
            whether you exchange once a year or every month.
          </p>
        </div>

        <div className="mt-20">
          <ServicePlan />
        </div>

        <div className="mt-36 max-sm:mt-16">
          <h2 className="text-[20px] sm:text-[24px] font-semibold text-primary-blue mb-6">
            Rewards for Your Continued Trust
          </h2>
          <h4 className="text-[18px] sm:text-[24px] font-semibold text-[#505050]">
            Enjoy Loyalty Discounts, Extra GuestPoints, and an Exclusive Badge
          </h4>
          <p className="text-[16px] sm:text-[24px] text-[#808080] mt-4 mb-6">
            Our experts are available to answer any questions you might have. We’ve got the answers.
          </p>

          <div className="flex items-center gap-0 overflow-x-auto bg-[#FFFAE8] py-8 rounded-3xl mt-6 scrollbar-hide">
            {membershipStages.map((stage, index) => (
              <div key={index} className="relative flex items-center flex-shrink-0">
                <div className="flex flex-col items-center min-w-[100px]">
                  <div className="relative">
                    {stage.completed ? <CompletedStar /> : <IncompleteStar />}
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[16px] sm:text-[20px] font-bold text-[#DC091E]">
                      {index + 1}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-center mt-2 whitespace-nowrap">{stage.title}</p>
                  <p className="text-xs text-gray-500 text-center">{stage.subtitle}</p>
                </div>
                {index < membershipStages.length - 1 && (
                  <div
                    className="w-[40px] sm:w-[80px] h-[4px] mx-1 rounded-full"
                    style={{
                      marginTop: "-24px",
                      background: stage.completed
                        ? "linear-gradient(90deg, #FF2323, #FFA600)"
                        : "rgba(128, 128, 128, 0.2)",
                    }}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="text-center text-sm text-gray-400 mt-2 sm:hidden">← Swipe to explore →</div>
        </div>

        <div className="lg:w-3/4 md:w-3/4 w-full mx-auto mt-[117px] max-sm:mt-[60px]">
          <AccordionComponent items={bonus} />
        </div>

        <div className="my-[150px] max-sm:my-[80px]">
          <Conversation />
        </div>
      </CommonWrapper>

      <Subscribe />
    </div>
  );
};

export default Plans;
