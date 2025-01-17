import {useCallback, useContext, useEffect,useState} from "react";
import {API} from './api/api'
import mastercard from './imgs/master2.jpg'
import visa from './imgs/visaminilogo.png'
import maestro from './imgs/Maestro1.png'
import { UserFunctionsContext } from "./components/contexts/context";
import down from './imgs/down.png'
import { Link, useNavigate } from "react-router-dom";
import clear from './imgs/close.png'
import substituteIMG from './pictures/substituteBook.png'
import { Button2 } from "./styled_components/button";


function FinishCart(){

    const [DATAadress,setDATAadress] = useState<any>()
    const [username,setUserName] = useState<string>()
    const [myCards,setMyCards] = useState([])
    const [num,setNum] = useState(0)
    const [numCard,setNumCard] = useState(0)
    const [showItems,setShowItems] = useState(false) 

    const{CartBook,setBookdesc,HandleCart,HandleCountCart,setReqData,setTitleProfile,setCartBook}= useContext(UserFunctionsContext)

    const navigate = useNavigate()

    useEffect(()=>{

        (async()=>{

            await API.get('/getAdress').then(
                res=>{
                  if(res){
                    setDATAadress([res.data])
                  }
                                        
                },error=>{
                    console.log(error)
                }
            )
            
 
            await API.get('/getCreditCard').then(
                    res=>{
                    setMyCards(res.data)
                   
                       },error=>{
                        console.log(error)
                       }
                    )
        
            await API.get('/mydata').then(
                res=>{
                    const name = res.data.name
                    const surname = res.data.surname
                    const fullname = [name,surname].join(" ")
                    setUserName(fullname)

                },error=>{
                    console.log(error)
                }
            )
                 

        })()


    },[])


    const handleCount=useCallback((data:number,type:string)=>{
     

        if(type == 'adress'){
            if(DATAadress[0] == false || DATAadress[0].length <2){
                setTitleProfile && setTitleProfile(1)
              return  navigate('/MyAccount')
        
            }


        setNum((prevNum)=>{

            let x = prevNum

            if(x < data){
                x+=1
            }else if(x >= data){
                x = 0
            }
            
            return x

        })

        }

        if(type == 'number'){
              
            if(myCards[0]==undefined || myCards.length <2){
                setTitleProfile && setTitleProfile(3)
              return  navigate('/MyAccount')
        
            }

            setNumCard((prevNum)=>{

                let y = prevNum
                if(y<myCards.length -1){
                 y+=1
                }else if(y >=myCards.length-1){
                    y = 0
                }
              
                return y


            })

        }
        
    },[num,numCard,myCards])
   

    const SendFinishCart = async()=>{
   
    if(CartBook?.length == 0)return navigate('/')

    const indiceDoObjeto = DATAadress.map((items:any,index:number)=>{return items[num]})
    const adressReq = indiceDoObjeto.splice(0,1)[0]
    const cardReq = [...myCards].splice(numCard,1)
    const pricetotal = CartBook?.reduce((prev,prevdata)=>prev + prevdata.price * prevdata.quantity,0)
    const data = {...CartBook,adressReq,cardReq,pricetotal,username}
        
    if(DATAadress[0] == false && myCards[0] == false){
        setTitleProfile && setTitleProfile(1)
        navigate('/MyAccount')
    }
     

    else if(DATAadress[0] == false){
        setTitleProfile && setTitleProfile(1)
      return  navigate('/MyAccount')

    }

    else if(cardReq[0] == undefined){
        setTitleProfile && setTitleProfile(3)
      return  navigate('/MyAccount')

    }
    else{
   
    await API.put('/newshopping',{data}).then(
        res=>{
          
            if(res.status == 200){
                setReqData && setReqData([res.data])
                setCartBook && setCartBook([])
                navigate("/thanksRequest")

            }
        },error=>{
            console.log(error)
        }
    )
    }        

    }
 

return(

    <div className="FinishCartContainer">

        <div style={{width:'90%',margin:'auto'}} className="favorites-header">
         <button onClick={()=>window.history.back()}  id="backbuttonshopping"><img ></img>VOLTAR </button>
      <h2 style={{marginLeft:"0px",marginTop:"10px"}}>Finalizar Compra</h2> 
        </div>


        {<div className="FinishCartSubContainer">

                <div className="FinishCartContentContainer">

                    <div className="AdressFinishCart_Container">


                            <div className="AdressFinishCart_title">
                                <h3>1 Endereço de entrega</h3>
                            </div>


                        {typeof DATAadress != "undefined" && DATAadress.map((items:any,index:number)=>{
                      
                               const cep = items[num] && items[num].cep
                               const cidade = items[num] &&items[num].city
                               const estado = items[num] &&items[num].state
                               const endereço = items[num] &&items[num].adress
                               const país =  items[num] &&items[num].country
                               const bairro =  items[num] &&items[num].district
                               const complemento = items[num] && items[num].complement
                               const numero = items[num]&& items[num].numberAdress

                            return(
                                <>
                                <div style={{fontWeight:'545'}} className="AdressFinishCart_adress">
                                   
                                <p>{username}</p>
                                <p>{endereço} - {numero}</p>
                                <p>{complemento} - {bairro}</p>
                                <p>{cidade},{estado} - {cep}</p>
                                </div>    
                            
                            <div className="editFinishCart">
                            <button onClick={()=>handleCount(items.length -1,'adress')} className="buttonFinishCart">ALTERAR</button>
                            </div>
                            </>
                            )

                            

                        })}
                           

                          

                    </div>


                    <div className="CardFinishCart_Container">

                            <div className="AdressFinishCart_title">
                                <h3>2 Método de Pagamento</h3>
                            </div>
                      
                           
                            <div className="AdressFinishCart_adress">

                                    {[...myCards].splice(numCard,1).map((it:any)=>{
                                            const number = it.numberCard
                                            let FLAG = ''
                                            const card_flag = it.cardBoolean
                                            if(card_flag.master){
                                                FLAG = 'MasterCard'
                                            }else if(card_flag.visa){
                                                 FLAG = 'Visa'
                                            }else if(card_flag.maestro){
                                                     FLAG = 'Maestro'
                                            }else if(card_flag.american){
                                                         FLAG = 'American Express'
                                            }else if(card_flag.hipercard){
                                                            FLAG = 'Hipercard'
                                            }
                                        return(
                                            <div style={{display:'flex',alignItems:'center'}}><img width={'50px'} height={'35px'} src={ card_flag.master ? mastercard : card_flag.visa ? visa : card_flag.maestro && maestro}></img> <p style={{marginLeft:"5px",fontWeight:'545'}}>{number && FLAG && FLAG + ' (Crédito) ' + ' termina em **** ' + number.slice(-4) }</p></div>
                                        )


                                    })}
                                        
                               
                                   
                              
                                
                          
                            </div> 

                                <div className="editFinishCart">
                                <button onClick={()=>handleCount(0,'number')} className="buttonFinishCart">ALTERAR</button>
                                </div>

                                                                                     
                      
                    </div>


                    <div style={{marginBottom:"50px",flexDirection:'column'}} className={showItems ?"ReviewFinishCart open" : "ReviewFinishCart"}>

                        
                            <div style={{width:'100%',justifyContent:'space-between',display:'flex'}} className="ReviewFinishCart_title">
                                            <h3>3 Revisar itens de envio</h3>


                                            <div className={showItems ? "showReviewCart open" : "showReviewCart"}>
                                            <img style={{cursor:'pointer'}} onClick={(()=>{
                                            if(showItems){
                                                setShowItems(false)
                                            }else{
                                                setShowItems(true)
                                            }
                                        
                                        })} src={down}></img>
                            </div>

                            </div>
                      
                           


                           {showItems &&
                           
                           <div className="finishTableContainer" style={{marginTop:'20px',overflowY:CartBook &&CartBook.length>1?'scroll':'auto'}}>
                           <table style={{width:'100%',marginLeft:'0',marginBottom:'0'}}  className="table-content">

                            <thead>
                                <tr>
                                    <th className="product-th">Produto</th>
                                    <th className="price-th">Preço</th>
                                    <th className="qtd-th">Qtd.</th>
                                    <th className="total-th">Total</th>
                                    <th className="clear-th"></th>
                                </tr>

                            </thead>
                            <tbody>
                            {CartBook && CartBook.map((items)=>{
                            const id = items.id
                            const img =  items.volumeInfo.imageLinks && items.volumeInfo.imageLinks.smallThumbnail
                            const title = items.volumeInfo.title
                            const price = items.price
                            const quantity = items.quantity

                            return(
                                <tr key={id}>
                                <td>

                                <div className="product">
                                <Link to={`/bookinfo/${items.id}`}><img onClick={()=>{setBookdesc && setBookdesc([items])}} width={'80px'} src={img ? img : substituteIMG}></img></Link><p>{title}</p>
                                </div>
                                
                                </td>

                            
                                <td>
                                <div style={{fontFamily:"Raleway"}} className="price">
                                    R$:{price},00
                                </div>
                                </td>
                            

                                <td>
                                
                                <div style={{width:"78px",margin:'auto'}}  className='cartControl'>

                                <button disabled={quantity==1} onClick={()=>HandleCountCart && HandleCountCart(items,'decrease',id)}>-</button> <p>{quantity}</p> <button onClick={()=>HandleCountCart && HandleCountCart(items,'increase',id)}>+</button>

                                </div>
                            

                                </td>
                                <td>
                                <div  style={{fontFamily:"Raleway"}} className="total">

                                R$:{price * quantity},00

                                </div>
                                </td>
                                <td>
                                
                                    <img className="clearshopping" onClick={()=>HandleCart && HandleCart(items,"DelCart",id)}
                                width={'12px'}  src={clear}></img>

                                </td>

                                </tr>
                            )

                            })}  

                            </tbody>

                            </table>
                            </div>
                            }

                    </div>
                    

                </div>


                <div className="shoppingResume">
                <div className="title-shoppingResume">
                <h2>Resumo da Compra</h2>

                
                </div>

                <div className="shoppingsubtotalContainer">

                    <div className="shoppingSubtotalContent">
                        <span>Sub-total:</span>  <span>{" R$ " + CartBook?.reduce((prev,e)=>prev + e.price * e.quantity,0) + ',00'}</span>
                    </div>

                    <div className="shoppingShippingContent">
                        <span>Frete:</span>  <span>Grátis</span>
                    </div>

                    <div className="shoppingTotalContent">
                        <span className="shoppingTotalTitle">Total:</span>  <span className="shoppingTotalValue">{" R$ "+ CartBook?.reduce((prev,e)=>prev + e.price * e.quantity,0) + ',00'}</span>
                    </div>

                </div>

                <Button2 checkout onClick={SendFinishCart} >

                  <p>FINALIZAR COMPRA</p> 

                </Button2 >
            </div>




        </div>}

    </div>


)


}
export default FinishCart