import dashboard from "@/assets/icons/dashboard.svg";
import dashboardHover from "@/assets/icons/dashboardHover.svg";
import profile from "@/assets/icons/userHome.svg";
import profileHover from "@/assets/icons/userHover.svg";
import settings from "@/assets/icons/setting.svg";
import settingsHover from "@/assets/icons/settingHover.svg";

export interface NavItem {
  title: string;
  path: string;
  icon?: string;
  hoverIcon?: string;
  isPrivate?: boolean;
}

export const navigationConfig: NavItem[] = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "FAQ",
    path: "/faq",
  },
  {
    title: "Articles",
    path: "/articles",
  },
  {
    title: "Contact Us",
    path: "/contact",
  },
  {
    title: "Bonus Program",
    path: "/bonus-program",
  },
  {
    title: "Plans",
    path: "/plans",
    // isPrivate: true,
  },
];

export const userMenuItems = [
  {
    icon: dashboard,
    hoverIcon: dashboardHover,
    title: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: profile,
    hoverIcon: profileHover,
    title: "Profile",
    path: "/profile",
  },
  {
    icon: settings,
    hoverIcon: settingsHover,
    title: "Settings",
    path: "/setting-password",
  },
];
