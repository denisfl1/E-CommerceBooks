import { useCallback, useContext, useEffect, useState } from "react";
import profile from './imgs/profile.jpg'
import { API } from "./api/api";
import FormCard from "./components/formCard";
import EditCard from "./components/editCard";
import Mydata from './components/myData'
import ProfileForm from "./components/profileForm";
import MyCards from './components/myCards'
import MyAdress from "./components/myadress";
import EditAdress from "./components/editAdress";
import AddAdress from "./components/addAdress";
import { useNavigate } from "react-router-dom";
import Requests from "./components/requests";
import { UserFunctionsContext } from "./components/contexts/context";
import MyPassword from "./components/mypassword";
import EditPassword from "./components/editPassword";
import { AuthContext } from "./components/contexts/authController";
import Swal from "sweetalert2";
import { Button } from "./styled_components/button";

function MyAccount(){

    const navigate = useNavigate()
    const {titleProfile,setTitleProfile,setCartBook,setAPIFav,APIFav} = useContext(UserFunctionsContext)
    const {Logout} = useContext(AuthContext)

    const [HeaderName,setHeaderName] = useState(['Dados pessoais'])
    const title= ['Dados pessoais','Endereços','Pedidos','Cartões','Autenticação','Favoritos','Sair']
    
    const [numberCard,setNumberCard] = useState()
    const [nameCard,setNameCard] = useState()
    const [validadeNum,setValidateNum] = useState()
    const [secCode,setSecCode] = useState()
    const [flag,setFlag] = useState()
    const [personalData,setPersonalData] = useState(false)
    const [addCard,setAddCard] = useState(false)
    const [editCard,setEditCard] = useState(false)
    const [editPassword,setEditPassword] = useState(false)
    const [profileDATA,setprofileDATA] = useState([])
    const [userName,setUserName] = useState()
    const [password,setPassword] = useState()

    const [CEP,setCEP] = useState()
    const [country,setCountry] = useState()
    const [adress,setAdress] = useState()
    const [numberAdress,setNumberAdress] = useState()
    const [complement,setComplement] = useState()
    const [district,setDistrict] = useState()
    const [city,setCity] = useState()
    const [state,setState] = useState()
    const [addAdress,setAddAdress] = useState(false)
    const [editAdress,setEditAdress] = useState(false)
    const [DATAadress,setDATAadress] = useState([])
    const [EditDataAdress,setEditDataAdress] = useState([])
    const [DATARequests,setDATARequests] = useState([])

    const [myCards,setMyCards] = useState([])

    const [cardBoolean ,setCardBoolean] = useState(
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

    
    const HandleName =useCallback((e)=>{

    const number = e.target.className

    setTitleProfile(number)
    if(number == 5){   
     navigate('/favorites')
     setTitleProfile(0)
    }
    if(number == 6){

        Swal.fire({
            title: "Deseja mesmo sair?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim",
            cancelButtonText:"Cancelar",
          }).then((result) => {
            if (result.isConfirmed) {
            setAPIFav([])
            setCartBook([]) 
            Logout()
            setTitleProfile(0)
            }else{
            setTitleProfile(0)
            }
          });

       
    }

    },[HeaderName,titleProfile,APIFav])

    useEffect(()=>{

        (async()=>{

            await API.get('/mydata').then(
                res=>{
                    setprofileDATA([res.data])
                    setUserName(res.data.name)
                    setPassword(res.data.password)
                
                },error=>{
                    console.log(error)
                }
            )

            await API.get('/getCreditCard').then(
                res=>{
                     setMyCards(res.data)
                },error=>{
                 console.log(error)
                }
             )


             await API.get('/getAdress').then(
                res=>{
                  if(res)return setDATAadress(res.data)
                                        
                },error=>{
                    console.log(error)
                }
            )

        })()


    },[])

    useEffect(()=>{


       setHeaderName(title[titleProfile])


    },[titleProfile])
    
        useEffect(()=>{

            (async()=>{

            await API.get('/getRequests').then(
                res=>{

                    setDATARequests(res.data)
                
                },error=>{
                    console.log(error)
                }
            )
            })()

    },[])

    return(
        

        <div className="MyAccount-Container">
                <div className="profileMenuContainer">
                        <div className="myAccountPicture">
                        <img src={profile}></img>
                        <div  className="myAccountUser">
                        {userName&&<span style={{marginTop: 'auto',fontSize:userName &&'18px'}}>{userName ?'Olá,' : 'Olá!'}</span>}
                        {userName && <span>{userName + "!"}</span>}

                        </div>
                        </div>
                    <ul>
                        {title.map((list,index)=>{
                        return(
                           <div key={list} className="borderlis" style={index == titleProfile ?{ borderLeft: 'solid #fdd900 4px',fontWeight:"700"}:{borderLeft: 'solid #ffff 4px'}}><li  className={index} key={index} id={list} onClick={HandleName}>{list}</li></div>
                        )
                            
                        })}
                    </ul>


                </div>    



            <div className="MyAccount-SubContainer">
                
                <div style={{minWidth:'80%'}} className="favorites-header">
                 
                    {!addCard  && !editCard && !personalData && !addAdress && !editAdress && !editPassword && <Button back_button_account style={{marginLeft:"0"}}  id="backbuttonfav" onClick={()=>window.history.back()}><img ></img>VOLTAR</Button> }
            
                    <h2 style={{marginLeft:"0"}}>{HeaderName}</h2>
                                
                </div>

            
            {titleProfile == 0 && !personalData ?<Mydata profileDATA={profileDATA} setprofileDATA={setprofileDATA} setPersonalData={setPersonalData}/> :
            titleProfile == 0 && personalData && <ProfileForm profileDATA={profileDATA} setprofileDATA={setprofileDATA} setPersonalData={setPersonalData} setUserName={setUserName}/>}                

            {titleProfile == 1 && !addAdress && !editAdress ? <MyAdress DATAadress={DATAadress} setDATAadress={setDATAadress} setAddAdress={setAddAdress} setEditAdress={setEditAdress} EditDataAdress={EditDataAdress} setEditDataAdress={setEditDataAdress}/> :titleProfile == 1 && addAdress ?
            <AddAdress setAddAdress={setAddAdress} setDATAadress={setDATAadress} country={ country} CEP={CEP}adress={adress} numberAdress={numberAdress} complement={complement} district={district} city={city} state={state}
            setCountry={setCountry} setCEP={setCEP} setAdress={setAdress} setNumberAdress={setNumberAdress} setComplement={setComplement} setDistrict={setDistrict} setCity={setCity} setState={setState}/> : 
            titleProfile == 1 && editAdress && <EditAdress EditDataAdress={EditDataAdress} setEditDataAdress={setEditDataAdress} DATAadress={DATAadress} setDATAadress={setDATAadress} setEditAdress={setEditAdress}  country={ country} CEP={CEP}adress={adress} numberAdress={numberAdress} complement={complement} district={district} city={city} state={state}
            setCountry={setCountry} setCEP={setCEP} setAdress={setAdress} setNumberAdress={setNumberAdress} setComplement={setComplement} setDistrict={setDistrict} setCity={setCity} setState={setState}/>}

            {titleProfile == 2 && <Requests DATARequests={DATARequests}></Requests>}
     
            {titleProfile == 3 && !addCard && !editCard ?<MyCards addCard={addCard}editCard={editCard}titleProfile={titleProfile}myCards={myCards}setAddCard={setAddCard} setMyCards={setMyCards} setNumberCard={setNumberCard} setNameCard={setNameCard} setValidateNum={setValidateNum}
            setSecCode={setSecCode} setFlag={setFlag} setCardBoolean={setCardBoolean} setEditCard={setEditCard} numberCard={numberCard} nameCard={nameCard} validadeNum={validadeNum} secCode={secCode} flag={flag} cardBoolean={cardBoolean}/>:addCard &&  titleProfile == 3 ? 
            <FormCard setAddCard={setAddCard} setMyCards={setMyCards} myCards={myCards}/> : editCard  &&  titleProfile == 3 && <EditCard setEditCard={setEditCard} numberCard={numberCard}nameCard={nameCard}validadeNum={validadeNum}secCode={secCode} flag={flag} setMyCards={setMyCards} myCards={myCards} cardBoolean={cardBoolean} />}
            
            {titleProfile == 4 && !editPassword ? <MyPassword  setEditPassword={setEditPassword}></MyPassword> : titleProfile == 4 && editPassword && <EditPassword password={password} setPassword={setPassword} setEditPassword={setEditPassword}></EditPassword>}

            </div>

        


        </div>

    )



}export default MyAccount