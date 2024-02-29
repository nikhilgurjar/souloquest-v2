"use client";
import useApi from "@/actions/useCompanyApi";
import { debounce } from "@mui/material";
import { usePathname } from "next/navigation";
import { createContext, useReducer, useEffect, useContext } from "react";

const SET_TOURS = "SET_TOURS";
const SET_SELECTED_TOUR = "SET_SELECTED_TOUR";
const SET_SEARCH_STRING = "SET_SEARCH_STRING";
const SET_FILTERED_TOURS = "SET_FILTERED_TOURS";
const SET_TOUR_DETAILS = "SET_TOUR_DETAILS";

// Reducer function to update state
const reducer = (state, action) => {
  switch (action.type) {
    case SET_TOURS:
      return { ...state, tours: action.payload };
    case SET_SELECTED_TOUR:
      return { ...state, selectedTour: action.payload };
    case SET_SEARCH_STRING:
      return { ...state, searchString: action.payload };
    case SET_FILTERED_TOURS:
      return { ...state, filteredTours: action.payload };
    case SET_TOUR_DETAILS:
      return { ...state, tourDetails: action.payload };
    default:
      return state;
  }
};

// Initial State
const initialState = {
  tours: [],
  selectedTour: null,
  searchString: "",
  filteredTours: [],
  tourDetails: null,
  loading: false,
};

export const ToursContext = createContext();

// Provider component
export const ToursProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const api = useApi();
  const pathName = usePathname();

  // Simulate fetching tours asynchronously
  useEffect(() => {
    const fetchTours = async () => {
      // Replace with your actual fetching logic
      let url;
      console.log(`pathname: ${pathName}`);
      if (pathName === "/dashboard/tours/mytours") {
        url = "/tours?mytours=yes";
      } else {
        url = "/tours";
      }
      const fetchedTours = await api.get(url);
      console.log(fetchedTours);
      dispatch({ type: SET_TOURS, payload: fetchedTours });
    };

    fetchTours();
  }, [pathName]);

  const { tours, tourDetails, selectedTour, searchString } = state;

  const getFilteredTours = async () => {
    try {
      let url;
      if (pathName === "/dashboard/tours/mytours") {
        url = `/tours?mytours=yes&searchTerm=${searchString}`;
      } else {
        url = `/tours?searchTerm=${searchString}`;
      }
      console.log("api called");
      const fetchedTours = await api.get(url);
      dispatch({ type: SET_TOURS, payload: fetchedTours });
      return fetchedTours;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  console.log(searchString);

  useEffect(() => {
    console.log("called useeffect");
    debounce(getFilteredTours(), 10000);
  }, [searchString]);

  // Actions
  const setTours = (tours) => {
    dispatch({ type: SET_TOURS, payload: tours });
  };

  const setSelectedTour = (tour) => {
    dispatch({ type: SET_SELECTED_TOUR, payload: tour });
  };

  const setSearchString = (searchString) => {
    dispatch({ type: SET_SEARCH_STRING, payload: searchString });
  };

  const setTourDetails = (tourDetails) => {
    dispatch({ type: SET_TOUR_DETAILS, payload: tourDetails });
  };

  const getTourDetailsById = async (tourId) => {
    try {
      if (tourDetails?.tourId === tourId && tourDetails) {
        return tourDetails;
      }
      const response = await api.get("tours/getdetails?tourId=" + tourId);
      const fetchedTourDetails = response.tourDetails;
      setTourDetails(fetchedTourDetails);
      return fetchedTourDetails;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  // Provide state and dispatch functions

  return (
    <ToursContext.Provider
      value={{
        tours,
        selectedTour,
        searchString: searchString,
        filteredTours: state.filteredTours,
        tourDetails: state.tourDetails,
        loading: state.loading,
        setTours,
        setSelectedTour,
        setTourDetails,
        setSearchString,
        getTourDetailsById,
      }}
    >
      {children}
    </ToursContext.Provider>
  );
};

// Custom hook to use ToursContext
export const useTours = () => {
  return useContext(ToursContext);
};
