import axios from 'axios';

export const getPlaceDetails = async (placeId) =>{
    try {
        const response = await axios.get(`https://api.geoapify.com/v2/place-details?id=${placeId}&features=details,details.description,detailts.opening_hours,drive_15.tourism&apiKey=42ae62a239d348d69856ccd884e4d0fc`);
        return response.data;
    } catch (error) {
        throw error;
    }
  
}

export const getDestinationsPaginated = async ({pageNumber}) =>{
    try {
        const response = await axios.get(`/api/destinations/pagination?pageNumber=${pageNumber}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}