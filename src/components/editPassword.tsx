import { useEffect, useState } from "react"
import eye from '../imgs/olho.png'
import hide from '../imgs/invisivel.png'
import {API} from '../api/api'
import excluir from '../imgs/excluir.png'
import verifica from '../imgs/verifica.png'
import { Button } from "../styled_components/button"


function EditPassword(props:{ setEditPassword:React.Dispatch<React.SetStateAction<boolean>>,
password:string,setPassword:React.Dispatch<React.SetStateAction<string>>
}){

const [password,setPassword] = useState<string>('')
const [actualpassword,setActualPassword] = useState<string>('')
const [showpassword,setShowPassword] = useState<Boolean>(false)
const [showpassword1,setShowPassword1] = useState<Boolean>(false)


useEffect(()=>{
    setActualPassword(props.password)

},[])

    const HandleUpdatePassword = async()=>{
        console.log(password.length)

        if(password && password.length >= 8){
            await API.put('/editpassword',{password}).then(
                res=>{
                    if(res.status == 200){
                        setActualPassword(password)
                       alert("Senha alterada com sucesso!")
                    } 
                    
                },error=>{
                    console.log(error)
                }
            )
        }


    }

return(
    <>
     {<div><button style={{marginLeft:"0"}}  id="backbuttonfav" onClick={()=>props.setEditPassword(false)}><img ></img>VOLTAR</button> </div>}   
    <div className="EditPasswordContainer">

        <div className="EditPasswordSubContainer">

                <div className="ActualPasswordContainer">
                    <label>Senha Atual</label>
                    <div className="ContainerInputPassword"><input value={actualpassword}  name={'password'}type={!showpassword ?"password" :"text"}></input><img  onClick={(()=>{showpassword ? setShowPassword(false):setShowPassword(true)})} style={{paddingLeft:'8px',paddingRight:'8px',cursor:'pointer'}} width={'24px'} src={!showpassword ?eye : hide}></img></div>
                </div>

                <div className="NewPasswordContainer">
                    <label>Nova Senha</label>
                  <div className="containerInputNewPassword"><input onChange={(e)=>setPassword(e.target.value)} name={'password'} type={!showpassword1 ?"password" :"text"}></input><img  onClick={(()=>{showpassword1 ? setShowPassword1(false):setShowPassword1(true)})} style={{paddingLeft:'8px',paddingRight:'8px',cursor:'pointer'}} width={'24px'} src={!showpassword1 ?eye : hide}></img></div>
                </div>

                <div className="passwordRulesContainer">
                    <span>Sua senha deve ter pelo menos:</span>
                    <div style={{display:'flex' ,alignItems:'center',marginTop:'8px'}}><img  style={{marginRight:'5px'}} width={'20px'} src={password.length <8 ?excluir :verifica} /><span>8 Caracteres</span></div>
                </div>

                <div className="saveButtonContainer">
                    <Button save_password disabled={password.length <8} onClick={HandleUpdatePassword}>SALVAR SENHA</Button>
                </div>

        </div>


    </div>
    </>
)






}

export default EditPassword