import axios from "axios";


export const API = axios.create({
    baseURL:'http://localhost:5000/'
})

const Logout=()=>{

    localStorage.removeItem('token')
    localStorage.removeItem('userdata')

    API.defaults.headers.Authorization = null
    
}

API.interceptors.response.use(
    (response)=>response,
    (error)=>{
        if(error.response.status == 401){
         return Logout()
        }
        return Promise.reject(error);
    }
   
)