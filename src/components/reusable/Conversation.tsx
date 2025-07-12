import conversationImage from "@/assets/conversation.svg";
// import CommonWrapper from "@/common/CommonWrapper";

const Conversation = () => {
  return (
    <>
      <div className="w-full h-[220px] bg-primary-gray-bg flex items-center gap-2 rounded-3xl px-7">
        <div>
          <img src={conversationImage} alt="" />
        </div>
        <div className="flex-1 px-12">
          <h1 className="text-primary-blue text-[32px] font-semibold">
            Live Chat Support
          </h1>
          <p className="text-basic-dark mt-3 font-extralight">
            Need help? Start a live chat with our team and get quick, real-time
            support whenever you need it.
          </p>
        </div>
        <div>
          <button className="bg-white border border-primary-blue text-primary-blue w-[251px] h-[50px] rounded-full">
            Start a conversation
          </button>
        </div>
      </div>
    </>
  );
};

export default Conversation;
