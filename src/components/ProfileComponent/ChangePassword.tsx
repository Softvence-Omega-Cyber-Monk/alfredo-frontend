import { useState } from "react";
import MiniWrapper from "@/common/MiniWrapper";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { LuEyeOff } from "react-icons/lu";
import { MdOutlineRemoveRedEye } from "react-icons/md";

interface PasswordFormInputs {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordFormInputs>();

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const onSubmit = (data: PasswordFormInputs) => {
    console.log("Submitted Data:", data);
  };

  const renderPasswordField = (
    label: string,
    name: keyof PasswordFormInputs,
    show: boolean,
    toggle: () => void
  ) => (
    <div className="w-full">
      <label className="text-[18px] font-semibold text-basic-dark">
        {label}
      </label>
      <div className="relative mt-2">
        <input
          type={show ? "text" : "password"}
          placeholder={`Enter ${label.toLowerCase()}`}
          {...register(name, { required: `${label} is required` })}
          className="w-full px-4 py-3 border border-[#808080] rounded-[8px] focus:ring-1 focus:ring-primary-blue pr-12"
        />
        <div
          className="absolute top-1/2 right-4 -translate-y-1/2 text-xl text-gray-500 cursor-pointer"
          onClick={toggle}
        >
          {show ? <LuEyeOff /> : <MdOutlineRemoveRedEye />}
        </div>
      </div>
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">{errors[name]?.message}</p>
      )}
    </div>
  );

  return (
    <MiniWrapper>
      <div className="min-h-screen">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div>
            <Button
              type="button"
              className="w-full text-2xl font-DM-sans flex h-14 justify-center items-center gap-2 self-stretch rounded-xl bg-[var(--Primary-P-25,#F4F7FC)] text-[var(--color-primary-blue)] hover:bg-[#e1e9f5] transition-colors duration-200 cursor-pointer"
            >
              Change Password
            </Button>
          </div>

          {/* Password Fields */}
          <div className="space-y-8">
            {renderPasswordField("Old Password", "oldPassword", showOld, () =>
              setShowOld(!showOld)
            )}
            {renderPasswordField("New Password", "newPassword", showNew, () =>
              setShowNew(!showNew)
            )}
            {renderPasswordField(
              "Confirm Password",
              "confirmPassword",
              showConfirm,
              () => setShowConfirm(!showConfirm)
            )}
          </div>

          {/* Submit Button */}
          <div>
            <Button
              type="submit"
              className="w-full text-lg font-DM-sans flex h-14 justify-center items-center gap-2 self-stretch rounded-xl bg-[#E9E9E9] text-[var(--color-basic-dark)] hover:bg-[#d4d3d3] transition-colors duration-200 cursor-pointer"
            >
              Update
            </Button>
          </div>

          {/* Remember and Forgot */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-start gap-2">
              <input type="checkbox" className="mt-2 cursor-pointer" />
              <label className="text-lg text-basic-dark">
                Remember Password
              </label>
            </div>
            <p className="text-lg text-[#009DE8] cursor-pointer">
              Forgot Password?
            </p>
          </div>
        </form>
      </div>
    </MiniWrapper>
  );
};

export default ChangePassword;

// import MiniWrapper from "@/common/MiniWrapper";
// import { Button } from "../ui/button";
// import { useForm } from "react-hook-form";

// interface PasswordFormInputs {
//   oldPassword: string;
//   newPassword: string;
//   confirmPassword: string;
// }

// const ChangePassword = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<PasswordFormInputs>();

//   const onSubmit = (data: PasswordFormInputs) => {
//     console.log("Submitted Data:", data);
//   };

//   return (
//     <MiniWrapper>
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
//         <div>
//           <Button
//             type="button"
//             className="w-full text-2xl font-DM-sans flex h-14 justify-center items-center gap-2 self-stretch rounded-xl bg-[var(--Primary-P-25,#F4F7FC)] text-[var(--color-primary-blue)] hover:bg-[#e1e9f5] transition-colors duration-200 cursor-pointer"
//           >
//             Change Password
//           </Button>
//         </div>

//         {/* Old & Confirm Password */}
//         <div className="space-y-8">
//           <div className="w-full">
//             <label className="text-[18px] font-semibold text-basic-dark">
//               Old Password
//             </label>
//             <input
//               type="password"
//               placeholder="Enter old password"
//               {...register("oldPassword", {
//                 required: "Old password is required",
//               })}
//               className="w-full px-4 py-3 mt-2 border border-[#808080] rounded-[8px] focus:ring-1 focus:ring-primary-blue"
//             />
//             {errors.oldPassword && (
//               <p className="text-red-500 text-sm mt-1">
//                 {errors.oldPassword.message}
//               </p>
//             )}
//           </div>

//           <div className="w-full">
//             <label className="text-[18px] font-semibold text-basic-dark">
//               New Password
//             </label>
//             <input
//               type="password"
//               placeholder="Enter new password"
//               {...register("newPassword", {
//                 required: "New password is required",
//               })}
//               className="w-full px-4 py-3 mt-2 border border-[#808080] rounded-[8px] focus:ring-1 focus:ring-primary-blue"
//             />
//             {errors.newPassword && (
//               <p className="text-red-500 text-sm mt-1">
//                 {errors.newPassword.message}
//               </p>
//             )}
//           </div>
//           {/* Confirm Password */}
//           <div className="w-full">
//             <label className="text-[18px] font-semibold text-basic-dark">
//               Confirm Password
//             </label>
//             <input
//               defaultValue="**************"
//               type="password"
//               placeholder="Confirm new password"
//               {...register("confirmPassword", {
//                 required: "Please confirm your password",
//               })}
//               className="w-full px-4 py-3 mt-2 border border-[#808080] rounded-[8px] focus:ring-1 focus:ring-primary-blue"
//             />
//             {errors.confirmPassword && (
//               <p className="text-red-500 text-sm mt-1">
//                 {errors.confirmPassword.message}
//               </p>
//             )}
//           </div>
//         </div>

//         {/* Submit Button */}
//         <div>
//           <Button
//             type="submit"
//             className="w-full text-lg font-DM-sans flex h-14 justify-center items-center gap-2 self-stretch rounded-xl bg-[#E9E9E9] text-[var(--color-basic-dark)] hover:bg-[#d4d3d3] transition-colors duration-200 cursor-pointer"
//           >
//             Update
//           </Button>
//         </div>

//         {/* Remember and Forgot */}
//         <div className="flex items-center justify-between gap-2">
//           <div className="flex items-start gap-2">
//             <input type="checkbox" className="mt-2 cursor-pointer" />
//             <label className="text-lg text-basic-dark ">
//               Remember Password
//             </label>
//           </div>
//           <p className="text-lg text-[#009DE8]  cursor-pointer">
//             Forgot Password?
//           </p>
//         </div>
//       </form>
//     </MiniWrapper>
//   );
// };

// export default ChangePassword;
