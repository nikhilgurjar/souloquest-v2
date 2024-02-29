import Label from "@/components/label";
import SvgColor from "@/components/svg-color";
import { PATH_PAGE } from "@/utils/siteConfig";
// ----------------------------------------------------------------------
const icon = (name) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);
const ICONS = {
  blog: icon("ic_blog"),
  chat: icon("ic_chat"),
  booking: icon("ic_booking"),
  dashboard: icon("ic_dashboard"),
};
const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    items: [
      {
        title: "Dashboard",
        path: PATH_PAGE.DASHBOARD,
        icon: ICONS.dashboard,
      },
    ],
  },
  // Tours dashboard
  // ----------------------------------------------------------------------
  {
    subheader: "Tour Manager",
    items: [
      {
        title: "Tours",
        path: PATH_PAGE.TOUR_PAGE,
        icon: ICONS.blog,
      },
      {
        title: "My Tours",
        path: PATH_PAGE.MY_TOUR_PAGE,
        icon: ICONS.blog,
      },
      {
        title: "Tours Create",
        path: PATH_PAGE.TOUR_PAGE_NEW,
        icon: ICONS.blog,
      },
    ],
  },
  // Booking manager
  {
    subheader: "Bookings Manager",
    items: [
      {
        title: "Incoming Bookings",
        path: PATH_PAGE.BOOKINGS,
        icon: ICONS.booking,
      },
      {
        title: "Requested Bookings",
        path: PATH_PAGE.BOOKINGS_REQUESTED,
        icon: ICONS.booking,
      },
      {
        title: "Create Bookings",
        path: PATH_PAGE.BOOKINGS_NEW,
        icon: ICONS.booking,
      },
    ],
  },
];
export default navConfig;
