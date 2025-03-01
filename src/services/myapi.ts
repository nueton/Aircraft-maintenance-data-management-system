import axios from "axios";

export const myapi = axios.create({
  baseURL: "http://localhost:5009",
});
