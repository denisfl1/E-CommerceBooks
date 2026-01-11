import React, { MouseEventHandler, useCallback, useEffect } from "react"
import { useState } from "react"
import { API } from "../api/api"
import { Button } from "../styled_components/button"



function ProfileForm(props:{setPersonalData:React.Dispatch<React.SetStateAction<boolean>>,
profileDATA:any,setprofileDATA:React.Dispatch<React.SetStateAction<object[]>>,
setUserName:React.Dispatch<React.SetStateAction<string|undefined>>
}){
    const [name,setName] = useState<string>()
    const [surname,setSurname] = useState<string>()
    const [email,setEmail] = useState<string>()
    const [cpf,setCpf] = useState<string>()
    const [gender,setGender] = useState<string>()
    const [telephone,setTelephone] = useState<string>()
    const [date_of_birth,setDate_of_birth] = useState<string>()


    const HandleSend:MouseEventHandler<HTMLElement> = useCallback(async(e)=>{ 
        e.preventDefault()

        await API.put('/editMydata',{email,name,surname,cpf,telephone,gender,date_of_birth}).then(
            res=>{

               props.setprofileDATA([{email:email,name:name,surname:surname,cpf:cpf,telephone:telephone,gender:gender,date_of_birth:date_of_birth}])
                alert("Alterado com Sucesso!")
                props.setPersonalData(false)
                props.setUserName(name)

            },error=>{
                console.log(error)
            }
        )


    },[props.profileDATA,email,name,surname,cpf,telephone,gender,date_of_birth])


    useEffect(()=>{

    props.profileDATA.map((items:any)=>{
        setName(items.name)
        setSurname(items.surname)
        setEmail(items.email)
        setCpf(items.cpf)
        setGender(items.gender)
        setTelephone(items.telephone)
        setDate_of_birth(items.date_of_birth)
    })


    },[])


return(
  
    <div style={{justifyContent:"left" ,marginLeft:"20px"}} className='Login-contaier two'>
    <form style={{margin:"0"}}>
    <label id='login-label'>Nome</label>

    <input value={name} onChange={(e)=>setName(e.target.value)} required id='login-input' type='text' name={'name'} placeholder='Digite seu nome'></input>

    <label id='login-label'>Sobrenome</label>
    <input value={surname} onChange={(e)=>setSurname(e.target.value)} required id='login-input1' type='text' name={'surname'} placeholder='Digite seu sobrenome'></input>

    <label id='login-label'>Email</label>
    <input value={email} onChange={(e)=>setEmail(e.target.value)} required id='login-input2' type='email' name={'email'} placeholder='Ex.: exemplo@mail.com'></input>

    <label id='login-label'>CPF</label>
    <input  maxLength={14} value={cpf} onChange={((e)=>{ 
       const input = e.target.value
      
       setCpf(e.target.value = input.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/,'$1.$2.$3-$4'))
   
    })
    
    } required id='login-input3' type={'text'} name={'cpf'} placeholder='Digite seu CPF'></input>

    <label id='login-label'>Telefone</label>
    <input maxLength={15} value={telephone} onChange={((e)=>{
        const input = e.target.value;
 
       setTelephone(e.target.value = input.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1)$2-$3'))

    })
    
    } required id='login-input4' type={'text'} name={'number'} placeholder='Digite seu telefone'></input>

    <label id='login-label'>Gênero</label>
   
    <select onChange={(e)=>setGender(e.target.value)} id='login-input' form="carform">
    <option selected={gender == 'Masculino'} value="Masculino">Masculino</option>
    <option selected={gender == 'Feminio'}value="Feminio">Feminio</option>

    </select>
    
    <label id='login-label'>Data de nascimento</label>
    <input value={date_of_birth} onChange={(e)=>setDate_of_birth(e.target.value)}  required id='login-input5' type='text' placeholder='Digite sua data de nascimento'></input>
    

    <div className='buttons-register'>
  <Button cancel $primary  onClick={()=>props.setPersonalData(false)}  id="btn-register"><img width={'14px'}></img>Voltar</Button>  <Button  id="btn-register" cancel  onClick={HandleSend} >Salvar</Button> 
     </div>   
    </form>
</div>


)



}export default ProfileForm