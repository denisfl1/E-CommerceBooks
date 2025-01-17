import React from "react";
import { Button } from "../styled_components/button";


function MyPassword(props:{ setEditPassword:React.Dispatch<React.SetStateAction<boolean>>}){


return(

    <div className="AuthenticationContainer">

        <div className="AuthenticationSubContainer">

                <div  className="AuthenticationContentContainer">
                    <div className="AuthenticationTitle">
                        <span style={{fontSize:'18px'}}>Senha</span>
                        <span style={{marginTop:'10px'}}>******************</span>
                    </div>
                    <Button reset style={{cursor:' pointer'}} onClick={()=>props.setEditPassword(true)}>REDEFINIR SENHA</Button>
                </div>


        </div>


    </div>


)



}
export default MyPassword