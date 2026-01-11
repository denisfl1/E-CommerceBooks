import React, { useEffect } from "react";
import {Button} from '../styled_components/button'

function Mydata(props:{setPersonalData:React.Dispatch<React.SetStateAction<boolean>>,
profileDATA:[],setprofileDATA:React.Dispatch<React.SetStateAction<[]>>
}){

    

    let name = ''
    let email = ''
    let surname = ''
    let cpf = ''
    let telephone = ''
    let birthday = ''
    let gender = ''

    props.profileDATA.map((it:any,index:number)=>{
        email = it.email;
        name = it.name;
        surname = it.surname;
        cpf = it.cpf;
        telephone = it.telephone;
        birthday = it.date_of_birth
        gender = it.gender
           
  
    })
    
   
    return(

        <div className="MydataContainer">

      
            
            <div className="MydataSubContainer">

                <div className="NameandSurnameContainer">
                    
                    <div className="nameContainer">
                                <div>Nome</div>
                                <p>{name}</p>
                    </div>


                    <div className="surnameContainer">
                                <div>Sobrenome</div>
                                <p>{surname}</p>

                    </div>


                </div>



                    <div className="emailContainer">
                            <div>Email</div>
                            <p>{email}</p>

                    </div>


                    <div className="cpf_genderContainer">
    
                            <div className="cpfContainer">
                                    <div>CPF</div>
                                    <p>{cpf}</p>

                            </div>

                    
                            <div className="genderContainer">
                                    <div>Gênero</div>
                                    <p>{gender}</p>

                            </div>

                    </div>


                    <div className="birthday_TelContainer">
                            
                            <div className="genderContainer">
                                    <div>Data de nascimento</div>
                                    <p>{birthday}</p>

                            </div>


                            <div className="genderContainer">
                                    <div>Telefone</div>
                                    <p>{telephone}</p>

                            </div>

                    </div>

                    <div style={{display:"flex",width:"100%",marginTop:"25px"}}>
                        <Button my_account_button  onClick={()=>{props.setPersonalData(true)}}>EDITAR</Button>
                    </div>


            </div>


        </div>


    )



}export default Mydata