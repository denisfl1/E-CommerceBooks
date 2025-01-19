import React, { useCallback,useContext} from "react";
import hearthoff from '../imgs/coracaooff.png'
import hearth from '../imgs/coracao.png'
import {UserFunctionsContext} from './contexts/context'
import substituteIMG from '../pictures/substituteBook.png'
import reaload from '../imgs/rotate.png'
import { API } from "../api/api";
import {Link, useNavigate} from 'react-router-dom'
import { AuthContext } from "./contexts/authController";
import { Button } from "../styled_components/button";

function Content(){

    const {Add,APIlibraries,Favorite,GetFavorites,CartBook} = useContext(UserFunctionsContext)
    const {setAdd,setFavorite,setMyFavorites,setBookdesc,setCartBook,setOpenCart}= useContext(UserFunctionsContext)
    const {HandleCart} = useContext(UserFunctionsContext)
    const {Authenticated} = useContext(AuthContext)

    const navigate = useNavigate()

    const handleLike:React.MouseEventHandler<HTMLElement>  = useCallback(async(e)=>{
        const id = (e.target as HTMLDivElement).id
        if(!Authenticated)return navigate('/login')
        if(!setFavorite)return
    
        if( GetFavorites?.includes(id)){
          
         await API.put("/delfav",{id}).then(
                res=>{ 
                    if(res.status == 200)
                    return setFavorite(id)       
                    
                },error=>{
                    console.log(error)
                }
            )
          
        }else{
          
        await API.put("/editfav",{id}).then(
                res=>{
                    if(res.status == 200)
                    return setFavorite(id)
             
                },error=>{
                    console.log(error)
                }
            )
        }

        await API.get('/getfav').then(
            res=>{
              setMyFavorites && setMyFavorites(res.data)
          
            },error=>{
    
              console.log(error)
    
            }
          )
          
    

},[Favorite,GetFavorites])
  

    const showmore= useCallback(()=>{
    if(setAdd && Add && APIlibraries){
        if(Add > APIlibraries.length){
           return setAdd(40)
        }else{
            setAdd(Add +10)
        }
    
 
    }  
 
   
    },[Add,APIlibraries?.length])

  

return(
    
    <div  className="content">


        {APIlibraries && APIlibraries.map((values,index:number)=>{
            const imgs = values.volumeInfo.imageLinks && values.volumeInfo.imageLinks.smallThumbnail
            const name = values.volumeInfo.title && values.volumeInfo.title
            const id = values.id
            const price = values.price
        
           return (
            
            <div key={index} className="booksDiv">
             
                
                <div className="div-like">
                <input   hidden  id="inputLike" type="checkbox"></input>
                <label htmlFor="inputLike">
                    <div className="inputLike">
                  
                <img onClick={handleLike} id={id} className={"likeoff"} width={'20px'} src={GetFavorites?.includes(id) && Authenticated?hearth :hearthoff}></img>
               
                        </div>
                </label>
                </div>
                <Link to={`/bookinfo/${id}`}>
                <div className="picture-book">             
                 <img  onClick={()=>{setBookdesc && setBookdesc([values])} } src={imgs ? imgs : substituteIMG}></img>
                </div>           
                <div className="div-title"> 
                <p >{name}</p>
                </div>  

                <div className="div-price">
                <h4>{" R$" + price + ",00"}</h4>
                </div>
                </Link>
              
                <Button shopping_button id={id} onClick={()=>{
                    setOpenCart && setOpenCart(true)
                    if(CartBook?.some((item)=>item.id == id)){
                        return
                    }else{
                        
                        HandleCart && HandleCart(values,"AddCart",id)
                    }    
                  
                   
   
                }}>Comprar</Button>               
               
            </div>


            
           )
        })
        }

           {APIlibraries &&APIlibraries.length>0 &&<div className="searchmore">
           <Button show_more style={{display:Add == 40 ? "none" :"" }} onClick={showmore}><img src={reaload}></img> Carregar mais</Button></div>}

    </div>


)



}export default Content