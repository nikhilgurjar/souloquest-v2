import * as React from "react";
import LandingHero from "./components/LandingHero";
import FeaturedTours from "./components/FeaturedTours";
import TopCategories from "./components/TopCategories";
import Services from "./components/Services";

const sampleData = [
  {
    tourId: 1,
    title: "Scenic Mountain Hike",
    level: "Intermediate",
    price: 99.99,
    ratings: 4.5,
    tourCompany: {
      name: "Nature Explorers",
      logoImg: "https://example.com/nature-explorers-logo.jpg",
    },
    coverImg: "https://example.com/scenic-mountain-hike.jpg",
    category: ["Adventure", "Nature", "Hiking"],
    numDays: 3,
  },
  {
    tourId: 2,
    title: "Historical City Tour",
    level: "Easy",
    price: 79.99,
    ratings: 4.2,
    tourCompany: {
      name: "Time Travel Tours",
      logoImg: "https://example.com/time-travel-tours-logo.jpg",
    },
    coverImg: "https://example.com/historical-city-tour.jpg",
    category: ["Sightseeing", "History", "Culture"],
    numDays: 2,
  },
  {
    tourId: 3,
    title: "Beach Paradise Getaway",
    level: "Relaxing",
    price: 149.99,
    ratings: 4.8,
    tourCompany: {
      name: "Sandy Escapes",
      logoImg: "https://example.com/sandy-escapes-logo.jpg",
    },
    coverImg: "https://example.com/beach-paradise-getaway.jpg",
    category: ["Leisure", "Beach", "Relaxation"],
    numDays: 4,
  },
  {
    tourId: 4,
    title: "Wildlife Safari Expedition",
    level: "Challenging",
    price: 199.99,
    ratings: 4.7,
    tourCompany: {
      name: "Wilderness Adventures",
      logoImg: "https://example.com/wilderness-adventures-logo.jpg",
    },
    coverImg: "https://example.com/wildlife-safari-expedition.jpg",
    category: ["Adventure", "Wildlife", "Nature"],
    numDays: 5,
  },
  {
    tourId: 5,
    title: "Cultural Heritage Tour",
    level: "Moderate",
    price: 129.99,
    ratings: 4.4,
    tourCompany: {
      name: "Cultural Connections",
      logoImg: "https://example.com/cultural-connections-logo.jpg",
    },
    coverImg: "https://example.com/cultural-heritage-tour.jpg",
    category: ["Cultural", "History", "Art"],
    numDays: 3,
  },
];

export default function Home() {
  return (
    <>
      <LandingHero />
      <FeaturedTours tours={sampleData} />
      <TopCategories />
      <Services />
    </>
  );
}
