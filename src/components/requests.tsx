import { useContext } from "react";
import mastercard from '../imgs/master2.jpg'
import visa from '../imgs/visaminilogo.png'
import maestro from '../imgs/Maestro1.png'
import { Link } from "react-router-dom";
import { UserFunctionsContext } from "./contexts/context";


function Requests(props:{DATARequests:object[]}){

    const {setBookdesc} = useContext(UserFunctionsContext)

    return(


        <>
       {props.DATARequests &&props.DATARequests.length>0 ?<div className="RequestsContainer">

        {props.DATARequests.map((item:any)=>{
            const reqNumber = item.requestNumber
            const date = item.requestDate
            const price = item.pricetotal
            const name = item.username
            const card = item.cardReq[0].numberCard.slice(-4)
            const flag1 = item.cardReq[0].flag
            const flag = item.cardReq[0].cardBoolean
            const data:any = Object.values(item).map((obj:any)=>obj).slice(0,-6)
            
            return(
                <>
            <div className="RequestsSubContainer">


                <div className="titlesContainer">

                <div className="titlesSubContainer">

                    <div className="reqdatecontainer">
                        <span className="reqdatetitle1">Pedido Realizado</span>
                        <span className="reqdatetitle2">{date}</span>
                    </div>

                    <div className="reqtotalcontainer">
                    <span className="reqtotaltitle1">TOTAL</span> 
                    <span className="reqtotaltitle2">R${price},00</span>    
                    
                    </div>


                    <div className="reqsendcontainer">
                    <span className="reqsendtitle1">ENVIAR PARA</span> 
                    <span className="reqsendtitle2">{name}</span>    

                    </div>
                   
                    <div className="reqcardcontainer">
                    <span className="reqsendtitle1">PAGAMENTO</span> 
                    <div style={{display:'flex'}}><img style={{marginRight:'5px'}} width={'40px'} height={'30px'} src={flag.master ? mastercard : flag.visa ? visa : flag.maestro && maestro}></img><span className="reqsendtitle2">{card && flag1 +  " (Crédito) ****" + card}</span> </div>   

                    </div>

                    <div className="reqnumbercontainer">
                    <span className="reqnumbertitle1">PEDIDO Nº {reqNumber}</span> 
                    <span className="reqnumbertitle2"></span>    
                    </div>
            
                </div>

                   
            
            </div>

            <div className="finishTableContainer" style={{marginTop:'20px',maxHeight:'370px',overflowY:data.lenght>2?'scroll':'auto'}}>
                           <table style={{width:'95%',marginBottom:'0',margin:'auto'}}  className="table-content">

            <thead>
                <tr>
                    <th className="product-th">Produto</th>
                    <th className="price-th">Preço</th>
                    <th className="qtd-th">Qtd.</th>
                    <th className="total-th">Total</th>
                </tr>

            </thead>
            <tbody>
            {data.map((items:any)=>{
            const id = items.id
            const img =  items.volumeInfo.imageLinks && items.volumeInfo.imageLinks.smallThumbnail
            const title = items.volumeInfo.title
            const price = items.price
            const quantity = items.quantity

            return(
                <tr key={id}>
                <td>

                <div className="product">
                <Link to={`/bookinfo/${id}`}><img onClick={()=>setBookdesc &&setBookdesc([items])} width={'80px'} src={img}></img></Link><p>{title}</p>
                </div>
                
                </td>

            
                <td>
                <div style={{fontFamily:"Raleway"}} className="price">
                    R$:{price},00
                </div>
                </td>
            

                <td>
                
                <div style={{width:"78px",margin:'auto'}}  className='cartControl'>

                <span style={{margin:'auto'}}>{quantity}</span>

                </div>
            

                </td>
                <td>
                <div  style={{fontFamily:"Raleway"}} className="total">

                R$:{price * quantity},00

                </div>
                </td>
                

                </tr>
            )

            })}  

            </tbody>

            </table>
            </div>

        </div>
      
                
                
                
                </>

    

            )




        })}






        </div>:<h1 style={{marginTop:'40px',width: '750px',textAlign:'center',fontFamily:'Raleway',fontWeight:'400',color:"#0e0e0e"}}>Você ainda não possui pedidos!</h1>}
        </>
    )




}export default Requests