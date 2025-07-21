import { FC, useRef, useState } from "react";
import CommonWrapper from "@/common/CommonWrapper";
import { cardData, inviteData } from "@/lib/bonusData";
import { FiCopy, FiCheckCircle } from "react-icons/fi"; // updated
import fb from "../assets/footer/fb.svg";
import insta from "../assets/footer/instagram.svg";
import linkedin from "../assets/footer/linkedin.svg";
import { Link } from "react-router-dom";
import Conversation from "@/components/reusable/Conversation";
import Subscribe from "@/components/reusable/Subscribe";
import AccordionComponent from "@/components/reusable/AccordionComponent";
import { bonus } from "@/lib/AccordionData/accordionData";
import ReusableButton from "@/components/reusable/ReusableButton";
import AchievementGrid from "@/components/plans/AchievementGrid";

const BonusProgram: FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [copied, setCopied] = useState(false); // new state

  const handleCopy = () => {
    if (inputRef.current) {
      navigator.clipboard.writeText(inputRef.current.value);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000); // reset after 10 seconds
    }
  };

  return (
    <div>
      <CommonWrapper>
        {/* Heading */}
        <div className="mt-[64px] mb-[40px] text-center">
          <h1 className="text-[64px] text-[#505050] max-[767px]:text-[36px] leading-22 max-[767px]:leading-tight">
            Invite Friends. <br />
            <span>Earn Travel</span>
            <span className="font-Grand-Hotel text-[96px] ml-4 text-primary-blue max-[767px]:text-[60px] max-[767px]:ml-2">
              Bonuses
            </span>
          </h1>
          <p className="text-[24px] font-normal text-basic-dark max-[767px]:text-sm py-4">
            Share your referral link and earn rewards when your friends join{" "}
            <br className="max-[767px]:hidden" />
            and complete their first vacanza.
          </p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mx-auto mb-6">
          {cardData.map((card, index) => (
            <div
              key={index}
              className="relative rounded-[24px] overflow-hidden p-10 max-[767px]:p-6 flex flex-col justify-center min-h-[250px]"
              style={{
                backgroundColor: card.bgColor,
                border: `1px solid ${card.borderColor}`,
              }}
            >
              <img
                src={card.img}
                alt=""
                className="absolute top-0 right-10 w-[120px] opacity-25 rotate-[20deg] blur-[2px] translate-x-4 -translate-y-4 pointer-events-none select-none"
              />
              <div className="relative z-10 text-left max-[767px]:text-center">
                <p
                  className="text-[60px] md:text-[64px] font-semibold leading-none"
                  style={{ color: card.color }}
                >
                  {card.amount}
                  {card.currency && (
                    <span className="text-[24px] font-semibold ml-2">
                      {card.currency}
                    </span>
                  )}
                </p>
                <h3 className="text-[24px] font-semibold text-dark-2 mt-2 leading-[130%]">
                  {card.title}
                  <br />
                  <span>{card.titleSub}</span>
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Invite Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mx-auto mb-10">
          {inviteData.map((invite, index) => (
            <div
              key={index}
              className="rounded-[24px] border border-primary-border-color bg-primary-gray-bg min-h-[250px] h-full flex"
            >
              <div className="flex flex-col justify-start w-full h-full p-6 max-[767px]:p-4">
                <h2 className="text-primary-blue font-semibold text-[24px] leading-[130%] mb-4">
                  {invite.headTitle}
                </h2>
                <ul className="list-disc pl-6 space-y-2">
                  {invite.points.map((point, idx) => (
                    <li
                      key={idx}
                      className="text-[18px] text-basic-dark max-[767px]:text-sm"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Static Referral Link Section */}
        <div className="w-full mx-auto">
          <div className="rounded-[24px] border border-primary-border-color bg-primary-gray-bg p-8 max-[767px]:p-4 flex flex-col justify-center min-h-[250px] text-center">
            <h2 className="text-primary-blue font-semibold text-[24px] max-[767px]:text-[20px] leading-[130%] mb-2">
              Your Unique Referral Link
            </h2>
            <p className="text-[18px] text-basic-dark max-[767px]:text-sm mb-4">
              Share this link with your friends to start earning.
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center items-center gap-4 justify-center mt-[20px]">
              <input
                ref={inputRef}
                className="w-full sm:w-3/4 border border-primary-border-color py-3 px-4 rounded-[25px] text-[16px] text-basic-dark bg-white"
                type="text"
                value="vacanza.com/r/yourname"
                readOnly
              />
              <ReusableButton
                type="button"
                onClick={handleCopy}
                className="w-full sm:w-auto py-3 px-6 flex items-center justify-center gap-2"
              >
                {copied ? (
                  <>
                    <FiCheckCircle size={20} className="text-green-600" />
                    <span className="inline-block w-[60px] text-left">Copied</span>
                  </>
                ) : (
                  <>
                    <FiCopy size={20} />
                    <span className="inline-block w-[60px] text-left">Copy</span>
                  </>
                )}
              </ReusableButton>

            </div>
          </div>
        </div>

        {/* Social Section */}
        <div className="flex flex-row items-center justify-center gap-[24px] mt-[50px]  mb-[120px] max-[767px]:mt-[20px] max-[767px]:mb-[80px] text-center">
          <h3 className="text-lg md:text-[24px] text-basic-dark">Share via:</h3>
          <ul className="flex flex-row items-center gap-[15px] justify-center sm:mt-0">
            <li>
              <Link to="/" className="font-regular lg:text-xl flex gap-2 items-center">
                <img src={fb} alt="facebook" className="w-8 h-8 max-[767px]:w-6 max-[767px]:h-6" />
              </Link>
            </li>
            <li>
              <Link to="/" className="font-regular lg:text-xl flex gap-2 items-center">
                <img src={insta} alt="instagram" className="w-8 h-8 max-[767px]:w-6 max-[767px]:h-6" />
              </Link>
            </li>
            <li>
              <Link to="/" className="font-regular lg:text-xl flex gap-2 items-center">
                <img src={linkedin} alt="linkedin" className="w-8 h-8 max-[767px]:w-6 max-[767px]:h-6" />
              </Link>
            </li>
          </ul>
        </div>
        <div className="">
          <AchievementGrid />
        </div>
        {/* Terms & Conditions Section */}
        <div className="my-[100px] max-[767px]:my-[70px] ">
          <div className="border-b border-[#BFD4F0] pb-3 mb-6">
            <h2 className="font-semibold text-[20px] text-primary-blue leading-[130%]">
              Terms and Conditions
            </h2>
          </div>
          <ul className="list-disc list-outside pl-6 space-y-3">
            {[
              "The referral bonus is granted only when the referred friend signs up through your unique referral link.",
              "Your friend must be a new member of HomeExchange.",
              "The bonus is credited to your account after your referred friend completes their first home exchange as a guest or a host.",
              "There is no limit to the number of friends you can refer.",
              "HomeExchange reserves the right to modify or cancel the referral program at any time.",
              "Any fraudulent activity will result in the suspension of accounts and removal of bonuses.",
            ].map((point, index) => (
              <li
                key={index}
                className="text-[18px] text-basic-dark leading-[130%] max-[767px]:text-sm"
              >
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/* Accordion Section */}
        <div className="lg:w-3/4 md:w-3/4 w-full mx-auto px-4">
          <AccordionComponent items={bonus} />
        </div>

        {/* Conversation Section */}
        <div className="my-[80px] lg:my-[140px]">
          <Conversation />
        </div>
      </CommonWrapper>
      <Subscribe />
    </div>
  );
};

export default BonusProgram;
