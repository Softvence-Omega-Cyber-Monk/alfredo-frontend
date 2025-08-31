import dashboard from "@/assets/icons/dashboard.svg";
import dashboardHover from "@/assets/icons/dashboardHover.svg";
import profile from "@/assets/icons/userHome.svg";
import profileHover from "@/assets/icons/userHover.svg";
import settings from "@/assets/icons/setting.svg";
import settingsHover from "@/assets/icons/settingHover.svg";

export interface NavItem {
  title: string; // Changed from 'title' to 'titleKey'
  path: string;
  icon?: string;
  hoverIcon?: string;
  isPrivate?: boolean;
}

export const navigationConfig: NavItem[] = [
  {
    title: "navigation.home", // Use translation keys
    path: "/",
  },
  {
    title: "navigation.faq",
    path: "/faq",
  },
  {
    title: "navigation.articles",
    path: "/articles",
  },
  {
    title: "navigation.contactUs",
    path: "/contact",
  },
  {
    title: "navigation.bonusPrograms",
    path: "/bonus-program",
  },
  {
    title: "navigation.plans",
    path: "/plans",
  },
];

export const userMenuItems = [
  {
    icon: dashboard,
    hoverIcon: dashboardHover,
    title: "navigation.dashboard",
    path: "/dashboard",
  },
  {
    icon: profile,
    hoverIcon: profileHover,
    title: "navigation.profile",
    path: "/profile",
  },
  {
    icon: settings,
    hoverIcon: settingsHover,
    title: "navigation.settings",
    path: "/settings",
  },
];
