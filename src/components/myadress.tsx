import React, { useCallback} from "react";
import { API } from "../api/api";
import { Button } from "../styled_components/button";


const MyAdress=(props:{setDATAadress:React.Dispatch<React.SetStateAction<object[]>>,setAddAdress:React.Dispatch<React.SetStateAction<boolean>>,
    setEditAdress:React.Dispatch<React.SetStateAction<boolean>>,EditDataAdress:boolean,setEditDataAdress:React.Dispatch<React.SetStateAction<object>>,
    country:string,CEP:string,adress:string,numberAdress:number,complement:string,district:string,city:string,state:string
    DATAadress:object[]
})=>{

   
    const HandleEdit = useCallback((data:object,id:number)=>{

        props.setEditAdress(true)
        props.setEditDataAdress([{...data,id}])


    },[props.EditDataAdress])
   



return(

    <>
    
     <div style={{width:"75%",marginBottom:'20px',display:"flex"}}><Button my_account_add  onClick={()=>props.setAddAdress(true)}>ADICIONAR ENDEREÇO</Button></div>
    {props.DATAadress.length >0 ?
    
    <div style={{display:'flex'}}  className="MyAdressContent">
    {props.DATAadress.map((items:any,index:number)=>{
        const id = index
        const cep = items.cep
        const cidade = items.city
        const estado = items.state
        const endereço = items.adress
        const país = items.country
        const bairro = items.district
        const complemento = items.complement
        const numero = items.numberAdress

        return(
        <div key={id +1} className="MyAdressContainer">
        
         
           <div className="SubContainerAdress">
    
                <div className="adresscontainer">
                    {endereço} {numero}, {complemento}
                </div>

                <div className="districtcontainer">
                    {bairro} - {cidade} - {estado}
                </div>

                <div className="cepcontainer">
                    {cep}
                </div>

                <div className="countrycontainer">
                    {país}
                </div>
                
                <div style={{display:"flex",width:"100%",marginTop:"25px"}}>
                        <Button  my_account_button  $adress $primary style={{marginLeft: "auto" }} onClick={()=>HandleEdit(items,index)}>EDITAR</Button >
                        <Button  my_account_button  $adress onClick={(async()=>{
                            const question = window.confirm("Você deseja excluir?")
                            if(question){
                                await API.delete(`/deleteAdress/${id}`).then(
                                  res=>{
                                    props.setDATAadress((copys:object[])=>copys.filter((it:any,index:number)=>{return index != id}))
                                  },error=>{
                                    console.log(error)
                                  }
                                )
                            }

                        })} style={{marginLeft:"5px" ,border:'1px solid black',backgroundColor:"white" ,color:'black'}}>EXCLUIR</Button>
                </div>
                
              
                 
            </div>

       
        </div>
        )
        
        })}   
    </div>
 : <h1 style={{marginTop:'40px',width: '750px',textAlign:'center',fontFamily:'Raleway',fontWeight:'400',color:"#0e0e0e"}}>Você não tem nenhum endereço cadastrado.</h1>}

            </>
)



}
export default MyAdress