import axios from "axios";

const baseURL = `${process.env.REACT_APP_DOMAIN_SERVER}/api`;
console.log("baseURL: ", baseURL);

export default axios.create({
    baseURL: baseURL,
    headers: {
        "Content-type": "application/json",
    },
    withCredentials: true, 
});