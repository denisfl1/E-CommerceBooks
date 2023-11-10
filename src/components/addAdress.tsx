import React, { useCallback, useEffect } from "react";
import {API} from '../api/api'


const AddAdress=(props:{setAddAdress:React.Dispatch<React.SetStateAction<boolean>>,setDATAadress:any,country:string,CEP:string,adress:string,numberAdress:number,complement:string,district:string,city:string,state:string,
    setCountry:React.Dispatch<React.SetStateAction<string>>,setCEP:React.Dispatch<React.SetStateAction<string>>,setAdress:React.Dispatch<React.SetStateAction<string>>,setNumberAdress:React.Dispatch<React.SetStateAction<string>>,setComplement:React.Dispatch<React.SetStateAction<string>>,setDistrict:React.Dispatch<React.SetStateAction<string>>,setCity:React.Dispatch<React.SetStateAction<string>>,setState:React.Dispatch<React.SetStateAction<string>>
})=>{


    const HandleAdress:React.MouseEventHandler<HTMLButtonElement> = useCallback (async(e)=>{
        e.preventDefault()
        
        const data = {country:props.country,cep:props.CEP,adress:props.adress,numberAdress:props.numberAdress,complement:props.complement,district:props.district,city:props.city,state:props.state}

        await API.put('/addAdress',{data}).then(
            res=>{
                props.setDATAadress((copys:any)=>[...copys,data])
                alert("Adicionado com Sucesso!")
                props.setAddAdress(false)
                
            },error=>{
                console.log(error)
            }
        )


    },[props.country,props.CEP,props.adress,props.numberAdress,props.complement,props.district,props.city,props.state])


    return(
        <>

        <div style={{justifyContent:"left" ,marginLeft:"20px"}} className='Login-contaier two'>
        <form style={{margin:"0"}}>
    
        <label id='login-label'>País</label>
       
       <select onChange={(e)=>props.setCountry(e.target.value)} id='login-input' form="carform">
       <option selected value="-">-</option>
       <option value="Brasil">Brasil</option>
       <option value="Estados Unidos">Estados Unidos</option>
   
       </select>
    
        <label id='login-label'>CEP</label>
        <input onChange={(e)=>props.setCEP(e.target.value)} required id='login-input1' type='text' placeholder='Digite seu CEP'></input>
    
    
        <label id='login-label'>Endereço</label>
        <input onChange={(e)=>props.setAdress(e.target.value)} required id='login-input3' type='text' placeholder='Digite seu endereço'></input>

        <label id='login-label'>Número</label>
        <input onChange={(e)=>props.setNumberAdress(e.target.value)} required id='login-input4' type='text' placeholder='Digite o número do seu endereço'></input>
    
        <label id='login-label'>Complemento e referência</label>
        <input onChange={(e)=>props.setComplement(e.target.value)} required id='login-input3' type='text' placeholder='Digite seu complemento'></input>

        <label id='login-label'>Bairro</label>
        <input onChange={(e)=>props.setDistrict(e.target.value)} required id='login-input3' type='text' placeholder='Digite seu bairro'></input>

        <label id='login-label'>Cidade</label>
        <input onChange={(e)=>props.setCity(e.target.value)} required id='login-input4' type='text' placeholder='Digite sua cidade'></input>
    
        <label id='login-label'>Estado</label>
       
        <select onChange={(e)=>props.setState(e.target.value)} id='login-input' form="carform">
        <option value="">-</option>
        <option value="SP">SP</option>
        <option value="MG">MG</option>
    
        </select>
    
        <div className='buttons-register'>
      <button onClick={()=>props.setAddAdress(false)}  id="btn-register"><img width={'14px'}></img>Voltar</button>  <button id="btn1-register" onClick={HandleAdress} >Salvar</button> 
         </div>   
        </form>
    </div>
    
    </>
    )
    




}
export default AddAdress