import axios from "axios";


const API_URL = "https://api.spacexdata.com/v4";

export const getLaunches = () => axios.get(`${API_URL}/launches`);
export const getRockets = () => axios.get(`${API_URL}/rockets`);