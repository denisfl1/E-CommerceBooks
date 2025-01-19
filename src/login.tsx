import React, { useContext, useState } from 'react'
import { API } from './api/api'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from './components/contexts/authController'
import { Button } from './styled_components/button'



function Login(){

 const navigate = useNavigate()
 const {Logged} = useContext(AuthContext)

 const [LorR,setLorR] = useState<boolean>(true)
 const [name,setName] = useState<string>('')
 const [surname,setSurname] = useState<string>('')
 const [email,setEmail] = useState<string>('')
 const [password,setPassword] = useState<string>('')



   const  handleTogle:React.MouseEventHandler<HTMLButtonElement>=(e)=>{
    e.preventDefault()
    if(LorR)
    return setLorR(false)
    setLorR(true)

    }

    const handleRegister:React.MouseEventHandler<HTMLButtonElement>= async(e)=>{
        e.preventDefault()

       await API.post('/register',{name,surname,email,password}).then(
            res=>{
                console.log(res.data)
                alert("Registrado com Sucesso")
                Logged && Logged(res.data)
            },error=>{
                alert(error.response.data)
            }
        )
        
    }

    const handleLogin:React.MouseEventHandler<HTMLButtonElement>= async(e)=>{
        e.preventDefault()

       await API.post('/login',{email,password}).then(
            res=>{
            console.log(res.data)
            if(res.status == 200){
            alert('Logado com sucesso!')
            Logged && Logged(res.data)
        }
            },error=>{
                alert(error.response.data)
            }
        )
        
    }
        
        

    return(
        <>
          {LorR &&<div style={{width:"70%",margin:'auto',marginTop:"40px"}}><Button back_button_account onClick={()=>navigate('/')} style={{marginLeft:"0"}}  id="backbuttonfav" ><img ></img>VOLTAR</Button> </div>} 
        {LorR ?<div className='Login-contaier'>
            
                <form>
                <label>Entrar com email e senha</label>
                <input onChange={(e)=>{setEmail(e.target.value)}} required type='email' name='email' placeholder='Ex.: exemplo@mail.com'></input>

                <input onChange={(e)=>{setPassword(e.target.value)}} required type='password' name='password' placeholder='Adicione sua senha'></input>
              
                <Button login $primary onClick={handleLogin}>Entrar</Button>
                <Button login onClick={handleTogle}>Não tem conta? Cadastre-se</Button>
                </form>
        </div>
    :
        
    <div className='Login-contaier two'>
    <form>
    <label id='login-label'>Nome</label>

    <input defaultValue={name} onChange={(e)=>setName(e.target.value)} required id='login-input' type='text' placeholder='Digite seu nome'></input>

    <label id='login-label'>Sobrenome</label>
    <input defaultValue={surname} onChange={(e)=>setSurname(e.target.value)} required id='login-input' type='text' placeholder='Digite seu sobrenome'></input>

    <label id='login-label'>Email</label>
    <input defaultValue={email} onChange={(e)=>setEmail(e.target.value)} required id='login-input' name='email' type='email' placeholder='Ex.: exemplo@mail.com'></input>

    <label id='login-label'>Senha</label>
    <input defaultValue={password} onChange={(e)=>setPassword(e.target.value)} required id='login-input' type='password' placeholder='Digite sua senha'></input>

    <label id='login-label'>Repita sua senha</label>
    <input onChange={(e)=>setPassword(e.target.value)}  required id='login-input' type='password' name='password' placeholder='Digite sua senha'></input>
    
    <div className='buttons-register'>
  <Button cancel $primary onClick={handleTogle} id="btn-register"><img width={'14px'}></img>Voltar</Button>  <Button cancel  id="btn1-register" onClick={handleRegister}>Cadastrar</Button> 
     </div>   
    </form>
</div>}

</>
    )


}export default Login


