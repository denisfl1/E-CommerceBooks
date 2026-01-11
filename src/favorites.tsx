import React, { useCallback, useState,useContext, useEffect} from "react";
import hearthoff from './imgs/coracaooff.png'
import hearth from './imgs/coracao.png'
import substituteIMG from './pictures/substituteBook.png'
import {UserFunctionsContext} from './components/contexts/context'
import {IAPIlibraries} from './components/contexts/context'
import { API } from "./api/api";
import { Link } from "react-router-dom";
import { Button } from "./styled_components/button";


function Favorites(){
    const {APIFav,Favorite,GetFavorites,CartBook} = useContext(UserFunctionsContext)
    const {setFavorite,setAPIFav,setBookdesc,setOpenCart,HandleCart}= useContext(UserFunctionsContext)


    const handleLike  = useCallback<React.MouseEventHandler<HTMLImageElement>>(async(e)=>{
        const id = (e.target as HTMLDivElement).id
       
        if(!setFavorite)return
    
        if( GetFavorites?.includes(id)){
          
         await API.put("/delfav",{id}).then(
                res=>{
                    setAPIFav && setAPIFav((prev)=>prev.filter((item)=>item.id !== id))                
                 return   setFavorite(id)       
                    
                },error=>{
                    console.log(error)
                }
            )
          
        }else{
          
        await API.put("/editfav",{id}).then(
                res=>{
                  return  setFavorite(id)
             
                },error=>{
                    console.log(error)
                }
            )
        }
       
    

},[Favorite,GetFavorites])

    


return(
    
    
    <div style={{marginBottom:'100px',minHeight:'100vh'}} className="favorites-container">
        <div className="favorites-header">

      <Button  back_button_fav  onClick={()=>window.history.back()} id="backbuttonfav"><img ></img>VOLTAR</Button>
        <h2>Favoritos</h2>
        </div>
       
    <div className="favorites-content">
      
        
   

        {APIFav && APIFav.length>0 ? APIFav.map((values:IAPIlibraries,index:number)=>{
            const imgs = values.volumeInfo.imageLinks && values.volumeInfo.imageLinks.smallThumbnail
            const name = values.volumeInfo.title && values.volumeInfo.title
            const price = values.price
            const id = values.id
            
  
           return (
   
            <div  key={index} className="booksDiv" id={id}>


                <div className="div-like">
                <input  hidden  id="inputLike" type="checkbox"></input>
                <label htmlFor="inputLike">
                    <div className="inputLike">
                <img onClick={handleLike} id={id} className={"likeoff"} width={'20px'} src={GetFavorites?.includes(id)?hearth :hearthoff}></img>
                        </div>
                </label>
                </div>
          
                <Link style={{width:"0px"}} to={`/bookinfo/${id}`}><img className="picture-book" onClick={()=>setBookdesc &&setBookdesc([values])} src={imgs ? imgs :substituteIMG}></img></Link>
     
                <div className="div-title"> 
                <p>{name}</p>
                </div>  

                <div className="div-price">
                <h4>{" R$" + price + ",00"}</h4>
                </div>

              
                <Button shopping_button  id={id} onClick={()=>{
                    setOpenCart &&setOpenCart(true)
                    if(CartBook?.some((items)=>items.id === id))return
                  HandleCart &&  HandleCart(values,"AddCart",id)
                }}>Comprar</Button>
                
               

            </div>

            
            
           )
        })
        :<h1 style={{marginTop:'40px',width: '750px',textAlign:'center',fontFamily:'Raleway',fontWeight:'400',color:"#0e0e0e"}}>Você não tem nenhum favorito.</h1>}
            </div>
         


           </div>
  
       

)



}export default Favorites
