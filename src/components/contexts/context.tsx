import {createContext,useState,useEffect, useCallback, useContext} from "react";
import axios from 'axios'
import { API } from "../../api/api";
import Swal from "sweetalert2";
import { AuthContext } from "./authController";
import { useNavigate } from "react-router-dom";


export interface IAPIlibraries{
    lenght?:number|undefined;
    kind: string;
    id: string;
    quantity:number;
    price:number;
    selfLink: string;
    saleInfo:{
      listPrice:{
        amount:string
      }
    }
    volumeInfo: {
      title: string;
      subtitle:string;
      authors: string[];
      publisher:string;
      pageCount:number;
      publishedDate:string
      description: string;
      language:string;
      imageLinks:{
        smallThumbnail:string;
        thumbnail:string;
        small:string;
        medium:string;
        large:string;
        extraLarge:string
      }
      categories:string[];
      industryIdentifiers: [
        {
          type: string,
          identifier: string;
        },
        {
          type: string,
          identifier: string;
        }
      ]
      
    }
  }

  interface IcontextAPI{
    HeaderTitle?:string|null|undefined;
    setHeaderTitle?:React.Dispatch<React.SetStateAction<string|null|undefined>>;
    Add?:number
    setAdd?:React.Dispatch<React.SetStateAction<number>>;
    APIlibraries?:IAPIlibraries[];
    setAPIlibraries?:React.Dispatch<React.SetStateAction<IAPIlibraries[]>>;
    APIlibraries2?:IAPIlibraries[];
    setAPIlibraries2?:React.Dispatch<React.SetStateAction<IAPIlibraries[]>>;
    APIFav?:IAPIlibraries[];
    setAPIFav?:React.Dispatch<React.SetStateAction<IAPIlibraries[]>>
    Search2?:string;
    setSearch2?:React.Dispatch<React.SetStateAction<string>>;
    Search?:string;
    setSearch?:React.Dispatch<React.SetStateAction<string>>;
   children?:React.ReactNode,
   Publisher?:string,
   setPublisher?:React.Dispatch<React.SetStateAction<string>>;
   Favorite?:string;
   setFavorite?:React.Dispatch<React.SetStateAction<string>>;
   GetFavorites?:string;
   setMyFavorites?:React.Dispatch<React.SetStateAction<string>>
   openCart?:Boolean;
   setOpenCart?:React.Dispatch<React.SetStateAction<boolean>>;
   HandleOpenCart?:()=>void;
   Bookdesc?:IAPIlibraries[];
   setBookdesc?:React.Dispatch<React.SetStateAction<IAPIlibraries[]>>
   CartBook?:IAPIlibraries[];
   setCartBook?:React.Dispatch<React.SetStateAction<IAPIlibraries[]>>;
   HandleCart?:(values:IAPIlibraries,type:string,id:string)=>void;
   HandleCountCart?:(item:IAPIlibraries,type:string,id:string)=>void,
   ReqData?:any
   setReqData?:React.Dispatch<React.SetStateAction<any>>
   titleProfile?:number,
   setTitleProfile?:React.Dispatch<React.SetStateAction<number>>

  }


export const UserFunctionsContext = createContext <IcontextAPI>(

  {}as IcontextAPI);

export const UserFunctionsProvider:React.FC<IcontextAPI> = ({children})=>{

 
  const [APIlibraries,setAPIlibraries] = useState<IAPIlibraries[]>([])
  const [APIlibraries2,setAPIlibraries2] = useState<IAPIlibraries[]>([])
  const [APIFav,setAPIFav] = useState<IAPIlibraries[]>([])
  const [Add,setAdd] = useState<number>(10)
  const [Search,setSearch] = useState<string>('javascript+TypeScript')
  const [Search2,setSearch2] = useState<string>('')
  const [Publisher,setPublisher] = useState<string>("")
  const [HeaderTitle,setHeaderTitle] = useState<string|null|undefined>('TypeScript')
  const [GetFavorites,setMyFavorites] = useState<string>('')
  const [Favorite,setFavorite] = useState<string>('')
  const [Bookdesc,setBookdesc] = useState<IAPIlibraries[]>([])
  const [CartBook,setCartBook] = useState<IAPIlibraries[]>([])
  const [ReqData,setReqData] = useState([])
  const [titleProfile,setTitleProfile] = useState(0)

  const [openCart,setOpenCart] = useState<boolean>(false)

  const {Authenticated} = useContext(AuthContext)

  const navigate = useNavigate()
 
  const RandomPrice =(min:number,max:number)=> 
  Math.floor(Math.random()*(max-min +1))+min

  useEffect(()=>{

    if(!Search.trim()){
      return 
    }else{
      (async ()=>{
        await axios.get('https://www.googleapis.com/books/v1/volumes?q='+Search+'&orderBy=newest&maxResults='+Add).then(
           res=>{
                const response:IAPIlibraries[] = res.data.items
               setAPIlibraries(response.map((items)=>{return {...items,quantity:1,price:RandomPrice(27,360)}}))
          
              
           },error=>{
               console.log(error)
           }
     
        )
       })()
    }



},[Search,Add])


  useEffect(()=>{
    if(!Publisher.trim()){
      return 
    }else{
      (async ()=>{
        await axios.get('https://www.googleapis.com/books/v1/volumes?q=""+inpublisher:'+Publisher+'&orderBy=newest&maxResults='+Add).then(
            res=>{
                const response:IAPIlibraries[] = res.data.items
                setAPIlibraries(response.map((items)=>{return {...items,quantity:1,price:RandomPrice(27,360)}}))
            
            },error=>{
                console.log(error)
            }
    
        )
        })()

    }
  


  },[Publisher,Add])


  useEffect(()=>{

    if(!Search2.trim()){
      return 
    }else{
      (async ()=>{
        await axios.get('https://www.googleapis.com/books/v1/volumes?q='+Search2+'&orderBy=newest&maxResults=40').then(
           res=>{
               setAPIlibraries2(res.data.items)
                
              
           },error=>{
               console.log(error)
           }
     
        )
       })()
    }



},[Search2])

useEffect(()=>{

  if(Authenticated){
    (async()=>{

      await API.get('/getfav').then(
        res=>{
          setMyFavorites && setMyFavorites(res.data)


   
        },error=>{

          console.log(error)

        }
      )
      


    })()
  }

  },[Authenticated])


  useEffect(()=>{

    if(Authenticated){
    (async()=>{
     
      try {
        const ArraySplit:IAPIlibraries[] = await Promise.all(
          GetFavorites.split(",").map(async(ids)=>{
            const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${ids}`)
            return response.data
          }))
          setAPIFav(ArraySplit.map((items)=>{return {...items,quantity:1,price:RandomPrice(27,360)}}))

      } catch (error) {
          console.log(error)
      }

      

    })()
  }

  },[GetFavorites])

  
  
  

      
    const HandleOpenCart=()=>setOpenCart(!openCart)

    const HandleCart = async (values:IAPIlibraries,type:string,id:string)=>{
      if(!Authenticated)return navigate('/login')
    if(type == "AddCart"){
     await API.put('/addBookCart',{values}).then(
        res=>{
          setCartBook && setCartBook((copys)=>[...copys,values])
          const Toast = Swal.mixin({
              toast: true,
              position: 'bottom-start',
              // customClass:'swal-wide',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })
            
            Toast.fire({
              icon: 'success',
              title: 'Adicionado com sucesso!'
            })
         
        },error=>{
            console.log(error)
        }
      )
    } 
    
    if(type == "DelCart"){
    
      await API.put('/delBookCart',{id}).then(
        res=>{
          if(res.status == 200)return setCartBook && setCartBook((copys)=>copys.filter((newdata)=>newdata.id !== id))
        },error=>{
          console.log(error)
        }
      )



    }

    }

    const HandleCountCart = async(item:IAPIlibraries,action:string,id:string)=>{
    
      let newQtd = item.quantity
  
      if(action === 'decrease'){
          if(newQtd === 1)return
        
           newQtd -= 1 
      }
      if(action === 'increase'){
           newQtd += 1
      }
  
      await API.put('/updateShoppingCart',{id,newQtd}).then(
          res=>{
              setCartBook && setCartBook((copys)=>{
  
                  return copys.map((data)=>data.id === item.id ?{...data,quantity:newQtd}:data)
          
              })             
          },error=>{
              console.log(error)
          }
      )
      
     
  
     
      }


    useEffect(()=>{

      (async()=>{

      await API.get('/getShoppingCart').then(
        res=>{
          setCartBook(res.data)
        },error=>{
          console.log(error)
        }
      )
        
      })()

    },[])
    
  
    
return(

    <UserFunctionsContext.Provider value={{children,Add,setAdd,HeaderTitle,setHeaderTitle,Search,setSearch,Search2,setSearch2,APIlibraries,setAPIlibraries,APIlibraries2,setAPIlibraries2,APIFav,setAPIFav,Publisher,setPublisher,Favorite,setFavorite,GetFavorites,setMyFavorites,openCart,setOpenCart,HandleOpenCart,Bookdesc,setBookdesc,CartBook,setCartBook,HandleCart, HandleCountCart, ReqData,setReqData,titleProfile,setTitleProfile}}>

     {children}
    

    </UserFunctionsContext.Provider>


)

}








