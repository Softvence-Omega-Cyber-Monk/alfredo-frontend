import CommonWrapper from "@/common/CommonWrapper";
import testimonailPerson from "@/assets/testimonailPerson.jpg";
import penIcon from "@/assets/icons/pen-icon.svg";

const Profile = () => {
  return (
    <div className="mt-6 md:mt-10">
      <CommonWrapper>
        <div className="max-w-3xl mx-auto px-4">
          {/* heading section */}
          <div className="text-center">
            <h1 className=" text-primary-blue font-semibold text-xl md:text-2xl md:pb-3 border-b border-[#EAF1FA]">
              Profile
            </h1>
            <p className="text-base text-dark-3 py-3 md:py-6">
              <span className="text-dark-2 font-semibold">User ID: </span>
              09352621254433079541
            </p>
          </div>
          {/* image section */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative">
              <img
                src={testimonailPerson}
                className="h-44 w-44 object-cover object-center rounded-full border-4 border-[#A0BFE8]"
                alt=""
              />
              <div className="absolute bottom-2.5 right-2.5">
                <img
                  src={penIcon}
                  alt="Edit"
                  className="w-8 h-8 md:w-10 md:h-10"
                />
              </div>
            </div>
          </div>
          {/* User Information */}
          {/* User Information */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-dark-3 mb-1">
                First Name
              </label>
              <input
                type="text"
                className="shadcn-input w-full"
                placeholder="Enter first name"
              />
            </div>
            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-dark-3 mb-1">
                Last Name
              </label>
              <input
                type="text"
                className="shadcn-input w-full"
                placeholder="Enter last name"
              />
            </div>
            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-dark-3 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                className="shadcn-input w-full"
                placeholder="Enter phone number"
              />
            </div>
            {/* WhatsApp */}
            <div>
              <label className="block text-sm font-medium text-dark-3 mb-1">
                WhatsApp
              </label>
              <input
                type="tel"
                className="shadcn-input w-full"
                placeholder="Enter WhatsApp number"
              />
            </div>
            {/* Email Address */}
            <div>
              <label className="block text-sm font-medium text-dark-3 mb-1">
                Email Address
              </label>
              <input
                type="email"
                className="shadcn-input w-full"
                placeholder="Enter email address"
              />
            </div>
            {/* NID Number */}
            <div>
              <label className="block text-sm font-medium text-dark-3 mb-1">
                NID Number
              </label>
              <input
                type="text"
                className="shadcn-input w-full"
                placeholder="Enter NID number"
              />
            </div>
            {/* ID Type Checkbox */}
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-dark-3">
                ID Type:
              </label>
              <input type="checkbox" id="nid" className="shadcn-checkbox" />
              <label htmlFor="nid" className="text-sm text-dark-3">
                NID
              </label>
              <input
                type="checkbox"
                id="passport"
                className="shadcn-checkbox"
              />
              <label htmlFor="passport" className="text-sm text-dark-3">
                Passport
              </label>
            </div>
            {/* Age Checkbox */}
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-dark-3">Age:</label>
              <input type="checkbox" id="adult" className="shadcn-checkbox" />
              <label htmlFor="adult" className="text-sm text-dark-3">
                Adult
              </label>
              <input type="checkbox" id="child" className="shadcn-checkbox" />
              <label htmlFor="child" className="text-sm text-dark-3">
                Child
              </label>
            </div>
            {/* Gender Checkbox */}
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-dark-3">Gender:</label>
              <input type="checkbox" id="male" className="shadcn-checkbox" />
              <label htmlFor="male" className="text-sm text-dark-3">
                Male
              </label>
              <input type="checkbox" id="female" className="shadcn-checkbox" />
              <label htmlFor="female" className="text-sm text-dark-3">
                Female
              </label>
              <input type="checkbox" id="other" className="shadcn-checkbox" />
              <label htmlFor="other" className="text-sm text-dark-3">
                Other
              </label>
            </div>

            {/* Gender Checkbox */}
            <div className="flex items-center gap-4 col-span-2">
              <label className="text-sm font-medium text-dark-3">I am a:</label>
              <input type="checkbox" id="male" className="shadcn-checkbox" />
              <label htmlFor="Worker" className="text-sm text-dark-3">
                Worker
              </label>
              <input type="checkbox" id="female" className="shadcn-checkbox" />
              <label htmlFor="Retired" className="text-sm text-dark-3">
                Retired
              </label>
              <input type="checkbox" id="other" className="shadcn-checkbox" />
              <label htmlFor="Student" className="text-sm text-dark-3">
                Student
              </label>
              <input type="checkbox" id="other" className="shadcn-checkbox" />
              <label htmlFor="Unemployed" className="text-sm text-dark-3">
                Unemployed
              </label>
            </div>
          </div>
        </div>
      </CommonWrapper>
    </div>
  );
};

export default Profile;
