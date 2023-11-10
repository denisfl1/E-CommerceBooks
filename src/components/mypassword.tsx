import React from "react";


function MyPassword(props:{ setEditPassword:React.Dispatch<React.SetStateAction<boolean>>}){


return(

    <div className="AuthenticationContainer">

        <div className="AuthenticationSubContainer">

                <div  className="AuthenticationContentContainer">
                    <div className="AuthenticationTitle">
                        <span style={{fontSize:'18px'}}>Senha</span>
                        <span style={{marginTop:'10px'}}>******************</span>
                    </div>
                    <button style={{cursor:' pointer'}} onClick={()=>props.setEditPassword(true)}>REDEFINIR SENHA</button>
                </div>


        </div>


    </div>


)



}
export default MyPassword