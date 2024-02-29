import React from "react";
import { ToursProvider } from "./components/TourContext";
import { Container } from "@mui/material";
import Filters from "./components/Filters";
import TourList from "./components/TourList";

const TourPage = () => {
  return (
    <>
      <Container>
        <Filters />

        {/* <TravelTourList tours={_tours} loading={loading} /> */}
        <TourList />
      </Container>
    </>
  );
};

export default TourPage;
