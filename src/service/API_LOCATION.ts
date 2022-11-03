import axios from 'axios';

const axiosInstance = axios.create({
    baseURL:`https://us1.locationiq.com/v1/search?key=${import.meta.env.VITE_KEY_LOCATIONIQ}&`
});

export const API_LOCATION = {
    getInfoLocationUser: async (city: string) => {
        const data = await axiosInstance.get(`&q=${city}&format=json`);
        return data;
    }
}