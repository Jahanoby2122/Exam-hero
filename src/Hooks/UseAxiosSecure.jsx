import React from "react";
import axios from "axios";

// শুধুমাত্র localhost:5000 এর জন্য axios instance
const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
});

const UseAxiosSecure = () => {
  return axiosSecure;
};

export default UseAxiosSecure;
