import axios from "axios";
import { Capitalize } from "../helpers/Capitalize";

const axiosIntance_INTERNAL = axios.create({
    baseURL: 'http://localhost:3000/city'
});

const axiosIntance_EXTERNAL = axios.create({
    baseURL: 'https://apiprevmet3.inmet.gov.br/previsao'
});

export const API = {
    getCodeCity: (name: string) => {
        const newName = Capitalize(name);
        const data = axiosIntance_INTERNAL.get(`?nome=${newName}`);
        console.log(data);
    }
}