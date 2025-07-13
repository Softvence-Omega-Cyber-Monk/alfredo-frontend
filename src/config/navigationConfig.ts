export interface NavItem {
  title: string;
  path: string;
  icon?: React.ElementType;
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
    title: "Profile",
    path: "/profile",
  },
  {
    title: "Settings",
    path: "/settings",
  },
  {
    title: "My Properties",
    path: "/my-properties",
  },
];
