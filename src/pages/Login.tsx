import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { LuEyeOff } from "react-icons/lu";
import CommonWrapper from "@/common/CommonWrapper";
import AuthenticateHeading from "@/components/reusable/AuthenticateHeading";
import AuthButton from "@/components/reusable/AuthButton";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, setCredentials } from "@/store/Slices/AuthSlice/authSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useTranslation } from "react-i18next";
import {
  signInWithPopup,
  // fetchSignInMethodsForEmail,
  // linkWithCredential,
  // FacebookAuthProvider,
  // getRedirectResult,
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword((prev) => !prev);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const { t } = useTranslation("auth");

  const [fbLoading, setFbLoading] = useState(false);

  const handleFacebookLogin = () => {
    if (fbLoading) return;
    setFbLoading(true);

    window.FB.login(
      (response) => {
        // Cannot be async directly
        // Call a separate async function instead
        if (response.authResponse) {
          processFacebookLogin(response.authResponse.accessToken);
        } else {
          console.log("Facebook login cancelled by user");
          setFbLoading(false);
        }
      },
      { scope: "email,public_profile" }
    );
  };

  const processFacebookLogin = async (accessToken: string) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/facebook`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ accessToken }),
        }
      );

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.accessToken);

        const formattedUser = {
          ...data.user,
          firstName:
            (data.user.fullName || "").split(" ")[0] ||
            data.user.firstName ||
            "",
          lastName:
            (data.user.fullName || "").split(" ").slice(1).join(" ") ||
            data.user.lastName ||
            "",
        };

        dispatch(
          setCredentials({ user: formattedUser, token: data.accessToken })
        );

        navigate(!data.user.hasOnboarded ? "/onboarding" : "/dashboard");
      } else {
        console.error("Backend error:", data);
      }
    } catch (err) {
      console.error("Facebook login error:", err);
    } finally {
      setFbLoading(false);
    }
  };


  {
    /* <label>{t("auth.login.emailAddress")}</label> */
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormInputs) => {
    const res = await dispatch(loginUser(data));

    // if (loginUser.fulfilled.match(res)) {
    //   navigate("/dashboard");
    // } else {
    //   console.error("Login failed:", res.payload);
    // }

    if (loginUser.fulfilled.match(res)) {
      const user = res.payload.user;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", res.payload.token);

      if (!user.hasOnboarded) {
        navigate("/onboarding");
      } else {
        navigate("/dashboard");
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);

      const user = result.user;

      // 🔑 Get Firebase ID Token
      const idToken = await user.getIdToken();

      // Send token to backend
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/google`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ idToken }),
        }
      );

      const data = await response.json();

      if (data.success) {
        // Store user and token just like regular login
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.accessToken);

        const formattedUser = {
          ...data.user,
          firstName: (data.user.fullName || "").split(" ")[0] || data.user.firstName || "",
          lastName: (data.user.fullName || "").split(" ").slice(1).join(" ") || data.user.lastName || "",
        };

        dispatch(
          setCredentials({
            user: formattedUser,
            token: data.accessToken,
          })
        );

        if (!data.user.hasOnboarded) {
          navigate("/onboarding");
        } else {
          navigate("/dashboard");
        }
      }
    } catch (error) {
      console.error("Google login error::", error);
    }
  };

  // const handleFacebookLogin = async () => {
  //   if (fbLoading) return;
  //   setFbLoading(true);
  //   try {
  //     // Step 1: Firebase popup authentication
  //     let result;
  //     try {
  //       result = await signInWithPopup(auth, facebookProvider);
  //     } catch (firebaseError: any) {
  //       // Handle Firebase-specific errors
  //       if (firebaseError.code === "auth/account-exists-with-different-credential") {
  //         const email = firebaseError.customData?.email;
  //         const pendingCred = FacebookAuthProvider.credentialFromError(firebaseError);

  //         if (!email || !pendingCred) {
  //           alert("Login failed. Please try again.");
  //           return;
  //         }

  //         const confirmLink = window.confirm(
  //           `The email ${email} is already linked to another account (e.g. Google). Click OK to sign in with Google and link your Facebook account.`
  //         );

  //         if (!confirmLink) return;

  //         try {
  //           const googleResult = await signInWithPopup(auth, googleProvider);
  //           await linkWithCredential(googleResult.user, pendingCred);

  //           const idToken = await googleResult.user.getIdToken();

  //           const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/google`, {
  //             method: "POST",
  //             headers: { "Content-Type": "application/json" },
  //             credentials: "include",
  //             body: JSON.stringify({ idToken }),
  //           });

  //           const data = await response.json();

  //           if (data.success) {
  //             localStorage.setItem("user", JSON.stringify(data.user));
  //             localStorage.setItem("token", data.accessToken);

  //             const formattedUser = {
  //               ...data.user,
  //               firstName: (data.user.fullName || "").split(" ")[0] || data.user.firstName || "",
  //               lastName: (data.user.fullName || "").split(" ").slice(1).join(" ") || data.user.lastName || "",
  //             };

  //             dispatch(setCredentials({ user: formattedUser, token: data.accessToken }));
  //             navigate(!data.user.hasOnboarded ? "/onboarding" : "/dashboard");
  //           } else {
  //             alert(data.message || "Google login failed after linking.");
  //           }
  //         } catch (linkError: any) {
  //           console.error("Account linking error:", linkError);
  //           alert("Failed to link accounts. Please contact support.");
  //         }
  //         return;
  //       } else if (firebaseError.code === "auth/popup-closed-by-user") {
  //         console.log("Popup closed by user");
  //         return;
  //       } else if (firebaseError.code === "auth/popup-blocked") {
  //         alert("Popup was blocked by your browser. Please allow popups for this site and try again.");
  //         return;
  //       } else {
  //         console.error("Firebase Facebook error:", firebaseError.code, firebaseError.message);
  //         alert(`Facebook login failed: ${firebaseError.message || "Unknown error"}`);
  //         return;
  //       }
  //     }

  //     // Step 2: Get Firebase ID token
  //     const user = result.user;
  //     const idToken = await user.getIdToken();

  //     // Step 3: Send token to backend
  //     const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/facebook`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       credentials: "include",
  //       body: JSON.stringify({ idToken }),
  //     });

  //     if (!response.ok) {
  //       const errorData = await response.json().catch(() => null);
  //       console.error("Backend error:", response.status, errorData);
  //       alert(errorData?.message || `Server error (${response.status}). Please try again.`);
  //       return;
  //     }

  //     const data = await response.json();

  //     if (data.success) {
  //       localStorage.setItem("user", JSON.stringify(data.user));
  //       localStorage.setItem("token", data.accessToken);

  //       const formattedUser = {
  //         ...data.user,
  //         firstName: (data.user.fullName || "").split(" ")[0] || data.user.firstName || "",
  //         lastName: (data.user.fullName || "").split(" ").slice(1).join(" ") || data.user.lastName || "",
  //       };

  //       dispatch(setCredentials({ user: formattedUser, token: data.accessToken }));

  //       if (!data.user.hasOnboarded) {
  //         navigate("/onboarding");
  //       } else {
  //         navigate("/dashboard");
  //       }
  //     } else {
  //       console.error("Backend returned unsuccessful:", data);
  //       alert(data.message || "Facebook login failed. Please try again.");
  //     }
  //   } catch (error: any) {
  //     // Catch-all for unexpected errors (network failures, JSON parse errors, etc.)
  //     console.error("Unexpected Facebook login error:", error);
  //     alert("Something went wrong during Facebook login. Please check your connection and try again.");
  //   } finally {
  //     setFbLoading(false);
  //   }
  // };


  return (
    <CommonWrapper>
      <div className="flex items-center justify-center mx-auto my-[64px] max-[767px]:mt-[40px]">
        <div className="max-[767px]:w-full w-[65%] bg-white">
          {/* Heading */}
          <AuthenticateHeading title={t("auth.login.loginNow")} />

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
            {/* Email Field */}
            <div>
              <label className="text-[18px] font-semibold text-basic-dark">
                {t("auth.login.emailAddress")}
              </label>
              <input
                type="email"
                placeholder={t("auth.login.emailAddress")}
                {...register("email")}
                autoComplete="email"
                className="w-full px-4 py-3 mt-2 border border-basic-dark rounded-[8px] focus:ring-1 focus:ring-primary-blue"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="w-full">
              <label className="text-[18px] font-semibold text-basic-dark">
                {t("auth.login.password")}
              </label>
              <div className="relative mt-2">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder={t("auth.login.password")}
                  {...register("password")}
                  autoComplete="current-password"
                  className="w-full px-4 py-3 border border-[#808080] rounded-[8px] focus:ring-1 focus:ring-primary-blue pr-12"
                />
                <div
                  className="absolute top-1/2 right-4 -translate-y-1/2 text-xl text-gray-500 cursor-pointer"
                  onClick={togglePassword}
                >
                  {showPassword ? (
                    <LuEyeOff size={22} />
                  ) : (
                    <MdOutlineRemoveRedEye size={22} />
                  )}
                </div>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember Password + Forgot */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1 cursor-pointer" />
                <label className="text-[16px] text-basic-dark font-semibold">
                  {t("auth.login.rememberPassword")}
                </label>
              </div>
              <Link to="/forgot-password">
                <p className="text-[16px] text-basic-dark font-semibold cursor-pointer hover:underline">
                  {t("auth.login.forgotPassword")}
                </p>
              </Link>
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-center">{error}</p>}

            {/* Submit Button */}
            <AuthButton
              title={
                loading
                  ? t("auth.login.submit") + "..."
                  : t("auth.login.submit")
              }
              type="submit"
            />
            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-[1px] bg-gray-300"></div>
              <span className="text-sm text-gray-500 font-medium">OR</span>
              <div className="flex-1 h-[1px] bg-gray-300"></div>
            </div>

            {/* Google Button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center cursor-pointer justify-center gap-3 border border-gray-300 py-3 rounded-[8px] bg-white hover:bg-gray-50 transition duration-200 font-semibold text-basic-dark shadow-sm"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />
              {t("auth.continueWithGoogle")}
            </button>

            <button
              type="button"
              onClick={handleFacebookLogin}
              className="w-full mt-4 flex items-center cursor-pointer justify-center gap-3 border border-gray-300 py-3 rounded-[8px] bg-white hover:bg-gray-50 transition duration-200 font-semibold text-basic-dark shadow-sm"
            >
              <img
                src="https://www.svgrepo.com/show/475647/facebook-color.svg"
                alt="Facebook"
                className="w-5 h-5"
              />
              {fbLoading ? "Connecting..." : t("auth.continueWithFacebook")}
            </button>

          </form>

          {/* Footer */}
          <div>
            <p className="text-[18px] text-basic-dark text-center mt-[64px]">
              {t("auth.login.noAccount")}{" "}
              <Link
                to="/signup"
                className="text-primary-blue hover:border-b border-primary-blue duration-200"
              >
                {t("auth.login.signup")}
              </Link>
            </p>

            <p className="text-[16px] text-basic-dark text-center mt-4">
              {t("auth.login.secureNotice")}
            </p>
          </div>
        </div>
      </div>
    </CommonWrapper>
  );
};

export default Login;
