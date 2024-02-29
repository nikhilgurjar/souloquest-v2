import React from "react";
import { ToursProvider } from "./components/TourContext";

const TourLayout = ({ children }) => {
  return <ToursProvider>{children}</ToursProvider>;
};

export default TourLayout;
