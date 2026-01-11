import { useContext, useEffect, useState } from "react";
import check from '../imgs/check1.png'
import { UserFunctionsContext } from "./contexts/context";
import { useNavigate } from "react-router-dom";
import { Button } from "../styled_components/button";


function ReqSuccess(){

const navigate = useNavigate()

const {ReqData,setTitleProfile} = useContext(UserFunctionsContext)
const [NumberReq,setNumberReq] = useState<number>()
const [AdresReq,setAdressReq] = useState<any>()
const [name,setName] = useState<string>()

  interface IAdress{
    requestNumber:number;
    adressReq:string;
    username:string
  }

useEffect(()=>{

  if(!ReqData[0])return navigate('/')

  const data =  ReqData.map((items:IAdress)=>{
    const num = items.requestNumber
    const end = items.adressReq
    const name = items.username
  return {num,end,name}
  })

  if(ReqData[0]){
    setNumberReq(data[0].num)
    setAdressReq(data[0].end)
    setName(data[0].name)

  }



},[])



return(

    <>

    <div className="ReqSuccContainer">

        <div className="SubReqSuccContainer">

            <div className="titlesReqSuccContainer">
                    <div className="titlesReq1" style={{alignItems:'center',display:"flex"}}><img width={'20px'} src={check}></img><h3 style={{marginLeft:'5px',color:'#3F815A'}}>Pedido feito, obrigado!</h3></div>
                    <div className="titlesReq2"><p>A confirmação será enviada para o seu e-mail.</p></div>
                    <div className="titlesReq3" style={{marginTop:'0',borderBottom:"1px solid #a5a5a6",width:'100%',alignItems:'center',display:"flex"}}><p style={{marginRight:'5px',fontWeight:'550',display:'flex',flexWrap:'nowrap'}}>{'Envio para, ' + name}</p>{AdresReq &&<p>{AdresReq.adress} {AdresReq.numberAdress}, {AdresReq.complement} {AdresReq.district},{AdresReq.city}, {AdresReq.state}, {AdresReq.cep}, {AdresReq.country}</p>}</div>
            
                    <div style={{marginTop:'15px',display:"flex"}}><span style={{fontWeight:'600',marginRight:"5px"}}>Número do pedido:</span>{NumberReq}</div>
            </div>

                

                <div style={{marginLeft:'28px'}}>
                    <Button view_request  onClick={(()=>{
                      
                    setTitleProfile && setTitleProfile(2)
                    navigate('/myaccount')
                    })} >VER PEDIDO</Button>
                </div>
           
        </div>

                    

    </div>

        <div style={{height:'80px'}}>
            <Button continue_shopping onClick={()=>{return navigate('/')}} >Continuar Comprando</Button>
        </div>

    </>             
)

}


export default ReqSuccess