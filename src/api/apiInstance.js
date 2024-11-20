import axios from "axios";

const apiInstance=  axios.create({
    baseURL:"https://fir-database-8554b-default-rtdb.firebaseio.com/"
})

export default apiInstance;