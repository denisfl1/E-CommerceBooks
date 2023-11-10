import React from "react";
import masterCard from '../imgs/Mastercard-logo.svg.png'
import visaCard from '../imgs/visa-removebg-preview.png'
import maestro from '../imgs/Maestro.png'
import chip from '../imgs/chip.png'
import {useCallback} from "react";
import { API } from "../api/api";


function MyCards(props:{addCard:[],editCard:[],titleProfile:number,myCards:object[],setAddCard:React.Dispatch<React.SetStateAction<boolean>>,
setMyCards:React.Dispatch<React.SetStateAction<object[]>>,setNumberCard:React.Dispatch<React.SetStateAction<number>>,setNameCard:React.Dispatch<React.SetStateAction<string>>,setValidateNum:React.Dispatch<React.SetStateAction<number>>,setSecCode:React.Dispatch<React.SetStateAction<number>>,setFlag:React.Dispatch<React.SetStateAction<string>>,setCardBoolean:React.Dispatch<React.SetStateAction<boolean>>,
setEditCard:React.Dispatch<React.SetStateAction<boolean>>,numberCard:number,nameCard:string,validadeNum:number,secCode:number,flag:string,cardBoolean:boolean
}){


    const HandleDataCard = useCallback((data1:number,data2:string,data3:number,data4:number,data5:string,data6:boolean)=>{

        props.setNumberCard(data1)
        props.setNameCard(data2)
        props.setValidateNum(data3)
        props.setSecCode(data4)
        props.setFlag(data5)
        props.setCardBoolean(data6)
        props.setEditCard(true)

    },[props.numberCard,props.nameCard,props.validadeNum,props.secCode,props.flag,props.cardBoolean])

    return(

        <>
        
        <div style={{display:'flex', justifyContent:"flex-end", width:"60%",marginBottom:'10px'}}><button id="addCardButton" onClick={()=>props.setAddCard(true)}>ADICIONAR CARTÃO</button></div>
            {!props.addCard && !props.editCard && props.titleProfile == 3 &&props.myCards.length >0 ? props.myCards.map((items:any)=>{
            const num = items.numberCard
            const name = items.nameCard
            const valid = items.validadeNum
            const sec = items.secCode
            const FLAG = items.flag
            const cardFlag= items.cardBoolean

            return(
            
            <div key={num} className="myCardsContainer">
            <div style={{marginTop:'0px'}} className={cardFlag.visa ? "cardContent Visa" : cardFlag.master ? "cardContent MasterCard" : cardFlag.american ? "cardContent American" : cardFlag.hipercard ? "cardContent Hipercard" : cardFlag.maestro ? "cardContent Maestro": "cardContent"}>
            

            <div className="logoCard">
                {cardFlag.master &&<img width={'60px'} src={masterCard}></img>}
                {cardFlag.visa &&<img width={'90px'} height={'35px'} src={visaCard}></img>}
                {cardFlag.hipercard && <h2 style={{fontFamily:"Times New Roman"}}>Hipercard</h2>}
                {cardFlag.maestro && <img width={'58px'} height={'44px'} src={maestro}></img>}
                </div>

            <div className="chipCard"><img width={'35px'} src={chip}></img></div>

            <div className="numberCard"><p >{num}</p></div>

            <div className="name_validadeContainer">
                
            <div className="nameCard"><p >{name}</p></div>

            <div className="validateCard"><p style={{fontSize:"12px"}}>Validade</p><p  style={{fontWeight:'500'}}>{valid}</p></div>    

            </div>

        </div>
            
            
            <div className="editDeleteCard">
               
                <button onClick={()=>HandleDataCard(num,name,valid,sec,FLAG,cardFlag) }>EDITAR</button> <button id="delCardBtn" onClick={(async()=>{

        const question = window.confirm("Você deseja excluir?")
            if(question){
              
               await API.delete(`/delCard/${num}`).then(
                res=>{
                    if(res.status == 200){
                    alert("Apagado com sucesso!")
                    props.setMyCards((prev:any)=>prev.filter((mycard:any)=>mycard.numberCard != num))
                    }
                }
               )
              
            }
        

                })} >EXCLUIR</button>

            </div>


        </div>
            )
        

        })
  :!props.addCard && !props.editCard && props.titleProfile == 3 &&<h1 style={{marginTop:'40px',width: '750px',textAlign:'center',fontFamily:'Raleway',fontWeight:'400',color:"#0e0e0e"}}>Você não tem nenhum método de pagamento registrado.</h1>} 
        
             
        </>


    )



}export default MyCards