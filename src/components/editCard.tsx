import React, { useEffect, useState } from "react";
import masterCard from '../imgs/Mastercard-logo.svg.png'
import visaCard from '../imgs/visa-removebg-preview.png'
import chip from '../imgs/chip.png'
import hipercard from './imgs/hipercard.png';
import maestro from '../imgs/Maestro.png'
import { API } from "../api/api";

function EditCard(props:{setEditCard:React.Dispatch<React.SetStateAction<boolean>>,
setMyCards:React.Dispatch<React.SetStateAction<object>>,myCards:object[],
numberCard:number,nameCard:string,validadeNum:number,secCode:number,flag:string,
cardBoolean:object


}){


    const [numberCard,setNumberCard] = useState<number>(props.numberCard)
    const [nameCard,setNameCard] = useState<string>(props.nameCard)
    const [validadeNum,setValidateNum] = useState<number>(props.validadeNum)
    const [secCode,setSecCode] = useState<number|undefined>(props.secCode)
    const [flag,setFlag] = useState<string>(props.flag)
    const [afterNumber,setAferNumber] = useState(props.numberCard)
    

    interface ICardBoolean{
            master:boolean,
            maestro:boolean,
            visa:boolean,
            american:boolean,
            hipercard:boolean
            discover:boolean,
            jcb:boolean
          
    }

    const [cardBoolean ,setCardBoolean] = useState<ICardBoolean>(
       {
        master:false,
        maestro:false,
        visa:false,
        american:false,
        hipercard:false,
        discover:false,
        jcb:false

    }
  
    )

    useEffect(()=>{
        
        setCardBoolean({...props.cardBoolean}as ICardBoolean)
        setFlag(props.flag)
 
    },[])


    
        const HandleNumber = (e:React.ChangeEvent<any>)=>{
             
            const master = /^51|^52|^53|^54|^55/
            const maestro = /^50|^56|^57|^58/
            const american = /^37/
            const visa = /^4/
            const hipercard = /^60/
            // const discover = /^60/
            const jcb = /^35/
         
            let value = e.target.value
            let cleanValue = value.replace(/\D/g, '')
            let formmated  = cleanValue.replace(/(\d{4})/g,'$1 ').trim()
       
            
            e.target.value = formmated
    
            setNumberCard(e.target.value) 
    
    
            if(master.test(formmated)){
                cardBoolean.master = true
                setFlag('MasterCard')    
            }else{
                cardBoolean.master = false     
            }
    
            if(maestro.test(formmated)){
                cardBoolean.maestro = true
                setFlag('Maestro')       
            }else{
                cardBoolean.maestro = false 
            }
    
            if(american.test(formmated)){
                cardBoolean.american = true
                setFlag('American')       
            }else{
                cardBoolean.american = false
            }
    
            if(visa.test(formmated)){
                cardBoolean.visa = true
                setFlag('Visa')
            }else{
                cardBoolean.visa = false
          
            }
            if(hipercard.test(formmated)){
                cardBoolean.hipercard = true
                setFlag('Hipercard')
            }else{
                cardBoolean.hipercard = false
            
            }
            
            if(jcb.test(formmated)){
                cardBoolean.jcb = true  
                setFlag('jcb')
            }else{
                cardBoolean.jcb = false 
            }
          
    
        }
    
        const HandleCardName = (e:React.ChangeEvent<any>)=>{
            const name = e.target.value
            const regex = /^[^\d\s]/u;
            
            const UPPERCASE = name.toUpperCase()
            if(!regex.test(name))return  setNameCard("")
    
            setNameCard(UPPERCASE)
    
        }
    
        const HandleNumValidate = (e:React.ChangeEvent<any>)=>{
             let value = e.target.value;
    
            e.target.value = value.replace(/(\d{2})(\d{2})/, '$1/$2');
         
           setValidateNum(e.target.value)
            
        }
    
        const handleSecCode = (e:React.ChangeEvent<any>)=>{
            const value = e.target.value
    
            if(value.length <3)return  setSecCode(undefined)
    
            setSecCode(value)
    
        }
    
    
        const saveMyCard:React.MouseEventHandler<HTMLButtonElement> = async(e)=>{
            e.preventDefault()

            const data = {numberCard,nameCard,validadeNum,secCode,cardBoolean,flag}

            if(!numberCard||!nameCard|| !validadeNum || !secCode)return alert("Campo inválido")
    
            if(props.myCards.filter((it:any)=>it.numberCard != props.numberCard).find((num:any)=>num.numberCard == numberCard))return alert("Cartão já existe")

    
            await API.put('/editCard',{afterNumber,data}).then(
                res=>{
                  
                    props.setMyCards((copys:any)=>copys.map((item:any)=>{return item.numberCard == afterNumber ? data : item}))
                    alert("Cartão Alterado com Sucesso!")
                    props.setEditCard(false)
                    
                },error=>{
                    console.log(error)
                }
            )
    
        }


        return(
        
        <>
    
    {<div><button style={{marginLeft:"0"}}  id="backbuttonfav" onClick={()=>props.setEditCard(false)}><img ></img>VOLTAR</button> </div>}          
        <div className={'cardContainer'}>
     
                    <form style={{boxSizing:"border-box"}}>
                    <h2 style={{fontWeight:350}}>Edite os dados do seu cartão:</h2>
                    <label id='login-label'>Número do cartão</label>

                    <input value={numberCard} maxLength={19} onChange={HandleNumber}  required id='login-input' type='text' ></input>

                    <label id='login-label'>Nome impresso no cartão</label>
                    <input value={nameCard} onChange={HandleCardName}  required id='login-input' type='text' ></input>


                    <div style={{display:"flex",minWidth:"100%"}} className="validade_code">
                    
                    <div style={{display:"flex", flexDirection:"column"}}>
                    <label id='login-label'>Validade</label>
                    <input value={validadeNum} maxLength={4} onChange={HandleNumValidate} style={{width:"230px"}} required id='login-input' type='text' ></input>
                 
                    </div>

                    <div style={{display:"flex", flexDirection:"column"}}>
                    <label style={{marginLeft:"10px"}} id='login-label'>Código de segurança </label>
                    <input value={secCode} onChange={handleSecCode} maxLength={4} style={{width:"120px",marginLeft:"13px"}}  required id='login-input' type='text' ></input>
                    </div>
                    
                    </div>

                    <div className="cardContainerEndButtons"><button onClick={saveMyCard} className="cardContainerEndButtonsSave">SALVAR ALTERAÇÕES</button><button className="cardContainerEndButtonsCancel" onClick={()=>props.setEditCard(false)}>CANCELAR</button></div>
                    </form>  
                
                <div className="cardSubcontainer">

                        <div className={cardBoolean.visa ? "cardContent Visa" : cardBoolean.master ? "cardContent MasterCard" : cardBoolean.american ? "cardContent American" : cardBoolean.hipercard ? "cardContent Hipercard" : cardBoolean.maestro ? "cardContent Maestro": `cardContent `}>

                                <div className="logoCard">
                                    {cardBoolean.master &&<img width={'60px'} src={masterCard}></img>}
                                    {cardBoolean.visa &&<img width={'90px'} height={'35px'} src={visaCard}></img>}
                                    {cardBoolean.maestro &&<img width={'58px'} height={'44px'} src={maestro}></img>}
                                    {cardBoolean.hipercard && <h2 style={{fontFamily:"Times New Roman"}}>Hipercard</h2>}
                                   
                                    </div>

                                <div className="chipCard"><img width={'35px'} src={chip}></img></div>

                                <div className="numberCard"><p >{numberCard ? numberCard : '•••• •••• •••• ••••'}</p></div>

                                <div className="name_validadeContainer">
                                    
                                <div className="nameCard"><p >{nameCard ? nameCard : "NOME"}</p></div>

                                <div className="validateCard"><p style={{fontSize:"12px"}}>Validade</p><p  style={{fontWeight:'500'}}>{validadeNum ?validadeNum : '••/••'}</p></div>    

                                </div>

                        </div>


                </div>

            </div>

       

    </>

)





}export default EditCard