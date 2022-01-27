import axios from 'axios';

let api = process.env.VUE_APP_API_URL;

const http = axios.create({
    baseURL: api,
    headers: {
        "Access-Control-Allow-Origin":"*",
        "Access-Control-Allow-Headers":"*"
    }
})


export default http;
