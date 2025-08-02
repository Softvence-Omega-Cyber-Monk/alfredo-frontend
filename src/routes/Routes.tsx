import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Contact from "../pages/Contact";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import AdminRoute from "./AdminRoutes";
import AdminDashboard from "@/pages/Admin/AdminDashboard";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import FAQ from "../pages/FAQ";
import Articles from "@/pages/Articles";
import BonusProgram from "@/pages/BonusProgram";
import Plans from "@/pages/Plans";
import ArticleDetails from "@/pages/ArticleDetails";
import Test from "@/pages/Test";
import Chat from "@/pages/Chat";
import HomeDetails from "@/pages/HomeDetails";
import Profile from "../pages/Profile";
import OTP from "@/pages/OTP";
import VerifyEmail from "@/pages/VerifyEmail";
import ForgotPassword from "@/pages/ForgotPassword";
import SetNewPassword from "@/pages/SetNewPassword";
import SettingPassword from "@/pages/SettingPassword";
import Messages from "../pages/Messages";
import Dashboard from "@/pages/Dashboard";
import MyProperties from "@/pages/MyProperties";
import OnboardingPage from "@/pages/OnboardingPage";
import Places from "@/pages/Places";
import PlaceDetails from "@/pages/PlaceDetails";
import AddPlace from "@/pages/AddPlace";



const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/home-details/:id",
        element: <HomeDetails />,
      },
      {
        path: "/faq",
        element: <FAQ />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/articles",
        element: <Articles />,
      },
      {
        path: "/articles/:id",
        element: <ArticleDetails />,
      },
      {
        path: "/bonus-program",
        element: <BonusProgram />,
      },
      {
        path: "/plans",
        element: <Plans />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/otp",
        element: <OTP />,
      },
      {
        path: "/verify-otp/:userId",
        element: <VerifyEmail />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/reset-password",
        element: <SetNewPassword />,
      },
      {
        path: "/chat",
        element: <Chat />,
      },
      {
        path: "test",
        element: <Test />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/setting-password",
        element: <SettingPassword />,
      },
      {
        path: "/messages",
        element: <Messages />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/my-properties",
        element: <MyProperties />,
      },
      {
        path: "/places",
        element: <Places />,
      },
      {
        path: "/places/:id",
        element: <PlaceDetails />,
      },
      {
        path: "/add-place",
        element: <AddPlace />,
      },
      {
        path: "/onboarding",
        element: <OnboardingPage />,
      },
      {
        path: "/admin",
        element: <AdminRoute />,
        children: [{ path: "", element: <AdminDashboard /> }],
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
