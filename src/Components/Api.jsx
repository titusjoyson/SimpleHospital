import axios from "axios";

const Api = axios.create({
  timeout: 5000,
  baseURL: "http://localhost:8080", // Replace with your API URL
  headers: {
    "Content-Type": "application/json",
    accept: "application/json", // If you receieve JSON response.
    "Cache-Control": "no-cache",
  },
});

export default Api;