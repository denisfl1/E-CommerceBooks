import React, { useEffect, useState } from 'react'
import {useContext} from 'react'
import shopping from '../imgs/shopping.png'
import cest from '../imgs/cesta.png'
import clear from '../imgs/close.png'
import { IAPIlibraries, UserFunctionsContext } from './contexts/context'
import substituteIMG from '../pictures/substituteIMG.png'
import {Link, useNavigate} from 'react-router-dom'


function ShoppingCart(){

    const navigate = useNavigate()

    const {openCart,setOpenCart,HandleOpenCart,CartBook,setCartBook,setBookdesc,HandleCart,HandleCountCart} = useContext(UserFunctionsContext)

    CartBook?.reduce((prev,item)=>prev + item.price,0)
   
    const HideCart:React.MouseEventHandler<HTMLDivElement>=(e)=>{
        const targetClassName = (e.target as HTMLDivElement).className;

            if(targetClassName == "shopping-cart-container open")
            return setOpenCart && setOpenCart(false)

    }

  



    return(

        <div onClick={HideCart} className={!openCart ? "shopping-cart-container" :"shopping-cart-container open"}>

            <div className='shopping-cart'>

                    <div className='cart-header'>
                        <div className='cart-header-title'>
                            <img src={shopping}></img><p>Minha cesta</p>
                        </div>

                        <img onClick={HandleOpenCart}  width={'15px'} src={clear}></img>
                                                              
                    </div>
                    
                    <div className='SubcartitemsContent'> 
                  
                   
                      {CartBook &&CartBook.length>0 ?CartBook.map((item,index)=>{
                        const id = item.id
                        const img = item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail
                        const title = item.volumeInfo.title
                        const qtd = item.quantity
                        const price = item.price
                      
                                                  
                        return(
                          
                            <div key={id}  className='cart-items'>
                            <div className='cartitemsContent'>
                                <div className='bookfrontContainer'>
                                <Link to={`/bookinfo/${item.id}`}><img className='bookfront' src={img ? img : substituteIMG} onClick={()=>setBookdesc && setBookdesc([item])}></img></Link>
                                </div>
                              
                                <div className='booktextContainer'>
                                    <div className='booktitleContainer'>
                                    <p style={{fontSize:'14px'}}>{title}</p>
                                    </div>

                                    <div className='bookpriceContainer'>
                                        <p>R$:{price*qtd},00</p>
                                    </div>

                                  
                                </div>
                               
                                <div className='cartControlContainer'>

                                     <div className='cartControlimg'>
                                    <img id={id} onClick={()=>HandleCart && HandleCart(item,"DelCart",id)} className='cartdelete' width={'12px'} src={clear}></img>
                                    </div>
                               
                            
                                <div className='cartControl'>

                                    <button disabled={qtd ==1} onClick={()=>HandleCountCart &&HandleCountCart(item,'decrease',id)}>-</button> <p>{qtd}</p> <button onClick={()=>HandleCountCart && HandleCountCart(item,'increase',id)}>+</button>
                                   
                                </div>
                                </div>
                                </div>
                        
                            
                        </div>
                     
                        )

                      }):<div style={{minWidth:'380px',display:'flex',justifyContent:"center",flexDirection:'column',position:'absolute',top:'40%'}} ><img style={{margin:'auto'}}  width={'70px'} src={cest}></img><span style={{textAlign:'center',marginTop:'15px',fontFamily:'Raleway',color:'grey'}}>Sua cesta está vazia</span></div>}
                  
                           <div className='cart-totalContainer'>
                    <div className='total-content'>
                       <div className='text-total'><div className='title-price'>Subtotal:</div><div className='price-value'>{ "R$" + CartBook?.reduce(( prev,e)=>prev + e.price *e.quantity,0) + ",00"}</div></div>
                       <div className='text-total'><div className='title-price'>Total:</div><div className='price-value'>{"R$" + CartBook?.reduce(( prev,e)=>prev + e.price *e.quantity,0) + ",00"}</div></div> 
                       <button onClick={(()=>{setOpenCart && setOpenCart(false);CartBook &&CartBook?.length >0 && navigate('/shopping')})}> Comprar </button>  
                    </div>
                </div>
                      
                        </div>

                   


             

            </div>



        </div>

    )




}export default ShoppingCart