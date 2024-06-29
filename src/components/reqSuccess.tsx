import { useContext, useEffect, useState } from "react";
import check from '../imgs/check1.png'
import { UserFunctionsContext } from "./contexts/context";
import { useNavigate } from "react-router-dom";


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
                    <button onClick={(()=>{
                      
                    setTitleProfile && setTitleProfile(2)
                    navigate('/myaccount')
                    })} style={{cursor:'pointer',backgroundColor:"black",border:'none',borderRadius:'5px' ,color:'white',padding:"10px"}}>VER PEDIDO</button>
                </div>
           
        </div>

                    

    </div>

        <div style={{height:'80px'}}>
            <button onClick={()=>{return navigate('/')}}  style={{cursor:'pointer',borderRadius:'5px',padding:'10px',backgroundColor:'#fdd900',border:'none',display:'flex',margin:'auto',marginTop:"50px"}}>Continuar Comprando</button>
        </div>

    </>             
)

}


export default ReqSuccess