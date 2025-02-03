import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const fetchTrips = async () => {
    const response = await axios.get(`${API_URL}/trips`);
    return response.data;
};
