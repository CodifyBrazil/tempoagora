import axios from "axios";
import { Capitalize } from "../helpers/Capitalize";

const axiosIntance_INTERNAL = axios.create({
    baseURL: 'http://localhost:3000'
});

const axiosIntance_EXTERNAL = axios.create({
    baseURL: 'https://apiprevmet3.inmet.gov.br/previsao'
});


export const API = {
    getCodeCity: async (name: string) => {
        console.log(name);
        const newName = Capitalize(name);
        const data = await axiosIntance_INTERNAL.get(`/citys?nome=${newName}`);
        return data;
    },
    getTemperatureCity: async (codeCity: any) => {
        const {data} =  await axiosIntance_EXTERNAL.get(`${codeCity}`);
        return data;
    }
}