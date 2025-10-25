import axios from "axios";

export const guestAxios=axios.create({
    baseURL:process.env.REACT_APP_API_URL,
})