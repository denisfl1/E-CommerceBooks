import React, { useCallback, useEffect, useState } from "react";
import {API} from '../api/api'
import { Button } from "../styled_components/button";


const EditAress=(props:{EditDataAdress:any,setEditDataAdress:React.Dispatch<React.SetStateAction<string>>,
    DATAadress:object[],setDATAadress:React.Dispatch<React.SetStateAction<object[]>>,
    setEditAdress:React.Dispatch<React.SetStateAction<boolean>>,
    country:string,CEP:string,adress:string,numberAdress:number,complement:string,
    district:string,city:string,state:string,
    setCountry:React.Dispatch<React.SetStateAction<string>>,
    setCEP:React.Dispatch<React.SetStateAction<string>>,
    setAdress:React.Dispatch<React.SetStateAction<string>>,
    setNumberAdress:React.Dispatch<React.SetStateAction<string>>,
    setComplement:React.Dispatch<React.SetStateAction<string>>,
    setDistrict:React.Dispatch<React.SetStateAction<string>>,
    setCity:React.Dispatch<React.SetStateAction<string>>,
    setState:React.Dispatch<React.SetStateAction<string>>
})=>{

    const [ID,setID] = useState()
    const [CEP,setCEP] = useState<string>()
    const [country,setCountry] = useState<string>()
    const [adress,setAdress] = useState<string>()
    const [numberAdress,setNumberAdress] = useState<string>()
    const [complement,setComplement] = useState<string>()
    const [district,setDistrict] = useState<string>()
    const [city,setCity] = useState<string>()
    const [state,setState] = useState<string>()

    const HandleAdress:React.MouseEventHandler<HTMLElement> = useCallback (async(e)=>{
          e.preventDefault()

        const data = {country:country,cep:CEP,adress:adress,numberAdress:numberAdress,complement:complement,district:district,city:city,state:state}
     
        await API.put('/editAdress',{ID,data}).then(
            res=>{
                console.log(res.status)
                props.setDATAadress((copys:any)=>copys.map((it:any,index:number)=>{return index == ID ? data:it}))
                alert('Alterado com sucesso')
                props.setEditAdress(false)
            },error=>{
                console.log(error)
            }
        )




    },[props.DATAadress,country,CEP,adress,numberAdress,complement,district,city,state])


    useEffect(()=>{

        props.EditDataAdress.map((items:any)=>{
            setID(items.id)
            setCEP(items.cep)
            setAdress(items.adress)
            setState(items.state)
            setCity(items.city)
            setCountry(items.country)
            setNumberAdress(items.numberAdress)
            setComplement(items.complement)
            setDistrict(items.district)
    

        })


    },[])


    return(
  
        <div style={{justifyContent:"left" ,marginLeft:"20px"}} className='Login-contaier two'>
        <form style={{margin:"0"}}>
    
        <label id='login-label'>País</label>
       
       <select onChange={(e)=>setCountry(e.target.value)} id='login-input' form="carform">
     
       <option selected={country == "Brasil"} value="Brasil">Brasil</option>
       <option selected={country == "Estados Unidos"}value="Estados Unidos">Estados Unidos</option>
   
       </select>
    
        <label id='login-label'>CEP</label>
        <input value={CEP} onChange={(e)=>setCEP(e.target.value)} required id='login-input1' type='text' placeholder='Digite seu CEP'></input>
    
    
        <label id='login-label'>Endereço</label>
        <input  value={adress} onChange={(e)=>setAdress(e.target.value)} required id='login-input3' type='text' placeholder='Digite seu endereço'></input>

        <label id='login-label'>Número</label>
        <input  value={numberAdress} onChange={(e)=>setNumberAdress(e.target.value)} required id='login-input4' type='text' placeholder='Digite o número do seu endereço'></input>
    
        <label id='login-label'>Complemento e referência</label>
        <input  value={complement} onChange={(e)=>setComplement(e.target.value)} required id='login-input3' type='text' placeholder='Digite seu complemento'></input>

        <label id='login-label'>Bairro</label>
        <input value={district} onChange={(e)=>setDistrict(e.target.value)} required id='login-input3' type='text' placeholder='Digite seu bairro'></input>

        <label id='login-label'>Cidade</label>
        <input value={city} onChange={(e)=>setCity(e.target.value)} required id='login-input4' type='text' placeholder='Digite sua cidade'></input>
    
        <label id='login-label'>Estado</label>
       
        <select  onChange={(e)=>setState(e.target.value)} id='login-input' form="carform">
        <option selected={state == "SP"} value="SP">SP</option>
        <option selected={state == "MG"} value="MG">MG</option>
    
        </select>
    
        <div className='buttons-register'>
      <Button cancel $primary   onClick={()=>props.setEditAdress(false)}  id="btn-register"><img width={'14px'}></img>Voltar</Button >  
      <Button cancel onClick={HandleAdress} >Salvar</Button> 
         </div>   
        </form>
    </div>
    
    
    )
    




}
export default EditAress