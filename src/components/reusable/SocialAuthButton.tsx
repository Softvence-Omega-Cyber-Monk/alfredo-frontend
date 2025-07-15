import google from "../../assets/google.svg";
import linkedin from "../../assets/linkedin.svg";

const SocialAuthButton = () => {
    return (
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
            <button
                type="button"
                className="w-full md:w-1/2 flex items-center justify-center gap-3 px-4 py-3 border border-primary-blue rounded-[8px] 
                   hover:bg-primary-blue/10 cursor-pointer transition-all"
            >
                <img src={google} alt="Google logo" className="w-6 h-6 object-contain" />
                <span className="text-[18px] text-primary-blue font-semibold">
                    Log In in with Google
                </span>
            </button>

            <button
                type="button"
                className="w-full md:w-1/2 flex items-center justify-center gap-3 px-4 py-3 border border-primary-blue rounded-[8px] 
                   hover:bg-primary-blue/10 cursor-pointer transition-all"
            >
                <img src={linkedin} alt="LinkedIn logo" className="w-6 h-6 object-contain" />
                <span className="text-[18px] text-primary-blue font-semibold">
                    Log In with LinkedIn
                </span>
            </button>
        </div>
    );
};

export default SocialAuthButton;
