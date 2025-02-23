import axios from "axios";

const token = "fa57361e-c156-410e-bfa5-ffd3358a7501";
const apiKey = "3170bb83-2f84-4a4e-a058-ac0bba401251";

export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1",
  headers: {
    Authorization: `Bearer ${token}`,
    "API-KEY": apiKey,
  },
});
