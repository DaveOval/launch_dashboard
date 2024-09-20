import axios from "axios";


const API_URL = "https://api.spacexdata.com/v4";

export const getLaunches = () => axios.get(`${API_URL}/launches`);
export const getRockets = () => axios.get(`${API_URL}/rockets`);


export const getFilteredLaunches = (filters : any) => {
    let url = `${API_URL}/launches?`;
    for (let key in filters) {
        if (filters[key] !== "") {
        url += `${key}=${filters[key]}&`;
        }
    }
    return axios.get(url);
};