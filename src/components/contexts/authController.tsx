import {ReactNode,createContext,useState,useEffect, useCallback} from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { API } from "../../api/api";



interface IAuthContext{
children:React.ReactNode;
Authenticated?:boolean,
user?:any,
subUser?:boolean,
Loading?:boolean,
Logged?:(data:any)=>void,
Logout?:()=>void,
UserCB?:boolean

}



export const AuthContext = createContext <IAuthContext>(

{} as IAuthContext);

export const AuthProvider:React.FC<IAuthContext>= ({children})=>{

const navigate = useNavigate()
const [user,setUser] = useState(null)
const [Loading,setLoading] = useState(true)

const recoverdUser = localStorage.getItem('userdata')
const token = localStorage.getItem('token')


API.defaults.headers.Authorization = token

useEffect(()=>{

    if(recoverdUser && token){
        setUser(JSON.parse(recoverdUser))
        setLoading(false)
    }else{
        setLoading(false)
       return Logout()
       
    }

},[])




const Logged = (data:any)=>{

    const loggedDATA = data
    const token = loggedDATA.token

    localStorage.setItem('userdata',JSON.stringify(loggedDATA))
    localStorage.setItem('token',token)

    API.defaults.headers.Authorization = token

    setUser(loggedDATA)
    navigate('/myaccount')

}



const Logout= useCallback(()=>{

    const names = ['token','userdata']
    
    names.forEach((items:string)=>{
        localStorage.removeItem(items)
    })
  
    setUser(null)
    API.defaults.headers.Authorization = null
    

},[user])


return(
<AuthContext.Provider value={{Authenticated:!!user,user,Loading,children,Logged,Logout}}>

{children}

</AuthContext.Provider>

)


}




