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
import OTP from "@/pages/OTP";
import VerifyEmail from "@/pages/VerifyEmail";
import ForgotPassword from "@/pages/ForgotPassword";
import SetNewPassword from "@/pages/SetNewPassword";
import Profile from '../pages/Profile';

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
        path: "/verify-email",
        element: <VerifyEmail />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/set-new-password",
        element: <SetNewPassword />,
      },
      {
        path: "/signup",
        element: <Signup />,
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
        element:<Profile/>

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
