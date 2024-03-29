import axios from "axios";

const Api = axios.create({
  timeout: 5000,
  baseURL: "https://api.vhospitalplus.com/", // Replace with your API URL
  headers: {
    "Content-Type": "application/json",
    accept: "application/json", // If you receieve JSON response.
    "Cache-Control": "no-cache",
  },
});

export default Api;
