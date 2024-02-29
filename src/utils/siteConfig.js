export const HEADER = {
  H_MOBILE: 64,
  H_MAIN_DESKTOP: 88,
  H_DASHBOARD_DESKTOP: 92,
  H_DASHBOARD_DESKTOP_OFFSET: 92 - 32,
};
export const NAV = {
  W_BASE: 260,
  W_DASHBOARD: 280,
  W_DASHBOARD_MINI: 88,
  //
  H_DASHBOARD_ITEM: 48,
  H_DASHBOARD_ITEM_SUB: 36,
  //
  H_DASHBOARD_ITEM_HORIZONTAL: 32,
};
export const ICON = {
  NAV_ITEM: 24,
  NAV_ITEM_HORIZONTAL: 22,
  NAV_ITEM_MINI: 22,
};

export const PATH_PAGE = {
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  FORGOT_PASSWORD: "/forgot-password",
  DASHBOARD: "/dashboard",
  ABOUT: "/about",
  TOUR_PAGE: "/dashboard/tours",
  MY_TOUR_PAGE: "/dashboard/tours/mytours",
  TOUR_PAGE_DETAIL: "/dashboard/tours/:id",
  TOUR_PAGE_EDIT: "/dashboard/tours/:id/edit",
  TOUR_PAGE_NEW: "/dashboard/tours/create",
  BOOKINGS: "/dashboard/bookings",
  BOOKINGS_REQUESTED: "/dashboard/bookings/requested",
  BOOKINGS_DETAIL: "/dashboard/bookings/:id",
  BOOKINGS_NEW: "/dashboard/bookings/create",
  CONTACT: "/contact",
  PROFILE: "/dashboard/profile",
  PROFILE_EDIT: "/profile/edit",
  ABOUT: "/about",
  HOW_IT_WORKS: "/how_it_works",
  BLOG: "/blogs",
  BLOG_DETAIL: "/blogs/:id",
  BLOG_EDIT: "/blogs/:id/edit",
  BLOG_NEW: "/blogs/new",
  DESTINATIONS: "/destinations",
  DESTINATIONS_DETAIL: "/destinations/:id",
  DESTINATIONS_EDIT: "/destinations/:id/edit",
  DESTINATIONS_NEW: "/destinations/new",
  FIND_PARTNER: "/find_partner",
};

export const social_accounts = [
  {
    value: "instagram",
    name: "Instagram",
    icon: "ant-design:instagram-filled",
    color: "#E02D69",
    path: "https://www.instagram.com/souloquest",
  },
  {
    value: "linkedin",
    name: "Linkedin",
    icon: "eva:linkedin-fill",
    color: "#007EBB",
    path: "https://www.linkedin.com/souloquest",
  },
];

export const TOUR_CATEGORIES = [
  {
    label: "Adventure",
    value: 1,
    description: "Thrilling experiences and activities",
  },
  {
    label: "Art & Culture",
    value: 2,
    description: "Explore museums, galleries, and local customs",
  },
  { label: "Beach", value: 3, description: "Relax on sun-drenched shores" },
  {
    label: "City",
    value: 4,
    description: "Discover vibrant urban destinations",
  },
  {
    label: "Cruise",
    value: 5,
    description: "Luxurious voyages on the open sea",
  },
  {
    label: "Culinary",
    value: 6,
    description: "Savor local cuisines and flavors",
  },
  {
    label: "Eco-Tourism",
    value: 7,
    description: "Sustainable travel and environmental awareness",
  },
  { label: "Family", value: 8, description: "Fun activities for all ages" },
  {
    label: "Historical",
    value: 9,
    description: "Explore ancient sites and cultural heritage",
  },
  {
    label: "Honeymoon",
    value: 10,
    description: "Romantic getaways for newlyweds",
  },
  {
    label: "Luxury",
    value: 11,
    description: "Indulge in opulent accommodations and services",
  },
  {
    label: "Music & Nightlife",
    value: 12,
    description: "Enjoy live music, nightclubs, and entertainment",
  },
  {
    label: "Nature & Outdoors",
    value: 13,
    description: "Immerse yourself in natural landscapes",
  },
  {
    label: "Religious & Spiritual",
    value: 14,
    description: "Discover sites of faith and spirituality",
  },
  {
    label: "Road Trip",
    value: 15,
    description: "Explore scenic routes by car or motorcycle",
  },
  {
    label: "Safari",
    value: 16,
    description: "Witness wildlife in their natural habitats",
  },
  {
    label: "Sightseeing",
    value: 17,
    description: "Visit iconic landmarks and attractions",
  },
  {
    label: "Ski & Snow",
    value: 18,
    description: "Experience winter sports and alpine adventures",
  },
  {
    label: "Sports & Activities",
    value: 19,
    description: "Participate in athletic pursuits and games",
  },
  {
    label: "Wellness & Spa",
    value: 20,
    description: "Rejuvenate with relaxing treatments and therapies",
  },
  {
    label: "Wine & Beer",
    value: 21,
    description: "Explore vineyards, breweries, and tasting tours",
  },
  {
    label: "Adventure Sports",
    value: 22,
    description: "Engage in thrilling outdoor activities",
  },
  {
    label: "Photography",
    value: 23,
    description: "Capture stunning landscapes and moments",
  },
  {
    label: "Educational",
    value: 24,
    description: "Learn and expand your knowledge",
  },
  {
    label: "Volunteer & Charity",
    value: 25,
    description: "Give back and make a positive impact",
  },
  {
    label: "Solo Travel",
    value: 26,
    description: "Embark on independent journeys",
  },
  {
    label: "LGBTQ+",
    value: 27,
    description: "Welcoming destinations for the LGBTQ+ community",
  },
  {
    label: "Accessible Travel",
    value: 28,
    description: "Inclusive travel for all abilities",
  },
  {
    label: "Festivals & Events",
    value: 29,
    description: "Experience celebrations and unique gatherings",
  },
  {
    label: "Experiential",
    value: 30,
    description: "Immersive activities and cultural immersion",
  },
];
