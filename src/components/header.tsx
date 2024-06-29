import { useState ,useContext, useCallback} from 'react'
import Lupa from '../imgs/lupa.png'
import clear from '../imgs/close.png'
import hearthoff from '../imgs/coracaooff.png'
import user from '../imgs/user.png'
import shopping from '../imgs/shopping.png'
import menu from '../imgs/menu.png'
import LetraE from '../imgs/letra-e.png'
import { UserFunctionsContext} from './contexts/context'
import {Link} from 'react-router-dom'
import ShoppingCart from './shoppingCart'
import { useNavigate } from 'react-router-dom'

function Header(){

    const navigate = useNavigate()
    
    const {Publisher,APIlibraries2,HeaderTitle} = useContext(UserFunctionsContext)
    const {setSearch,setSearch2,setAdd,setPublisher,setHeaderTitle} = useContext(UserFunctionsContext)
    const {HandleOpenCart} = useContext(UserFunctionsContext)

    const [inputChange,setInputChange] = useState<string>('')


    const handleInput:React.KeyboardEventHandler<HTMLInputElement> = useCallback ((e)=>{

        
        if(setSearch && setSearch2 && setAdd && setPublisher && setHeaderTitle){
        setPublisher("")
        setAdd(10)
        setSearch( e.currentTarget.value )
        setInputChange("")
        setHeaderTitle("")
        navigate('/')    
    }
    },[inputChange,Publisher,HeaderTitle])



    const handleInput1= useCallback (()=>{

        if(!inputChange){
        
        if(setSearch && setAdd && setPublisher && setHeaderTitle){
        setPublisher("")
        setSearch( inputChange)
        setAdd(10)
        setHeaderTitle("")
        navigate('/')
       
    }

        }else{
            setInputChange('')
        }

    },[inputChange,Publisher,HeaderTitle])


    const handleInput2= useCallback ((e:any)=>{

        if(setSearch && setAdd && setPublisher && setHeaderTitle){
        setPublisher("")
        if(inputChange){
            setSearch(e.currentTarget.textContent)
            setAdd(10)
            setInputChange("")
            setHeaderTitle(" ")
            navigate('/')
        }
          
       
    }
  
    },[inputChange,Publisher,HeaderTitle])


    
    


return(

    <div className="header">

        <div onClick={()=>{navigate('/')}} style={{display:"flex", cursor:'pointer',alignItems:'center'}}><img style={{width:'54px',height:'54px'}} src={LetraE}></img><h1 style={{fontSize:'30px'}} >.Books</h1></div>
        <img onClick={()=>{navigate('/')}} id='menuIconHeader' src={menu}></img>

        <div className={!inputChange.length ? "inputcontainer": "inputcontainer active"}>
        <input value={inputChange} onKeyDown={e=>e.key === "Enter" && handleInput(e)} onChange={((e)=>{
            setInputChange(e.target.value) 
            setSearch2&&setSearch2(e.target.value)})
            }  
        placeholder="O que você está buscando?" className="search" type="text"></input>
        {!inputChange ?<img onClick={handleInput1}  width='22px' src={Lupa}></img>:<img onClick={handleInput1} width={'15px'} src={clear}></img>}
        <div className='SearchContent'>
            
                {APIlibraries2 &&APIlibraries2.map((items)=>{
                    return(
                        <li onClick={handleInput2} defaultValue={items.volumeInfo.title}>{items.volumeInfo.title}</li>
                    )
                })}
              
            </div>
        </div>
        
        <ul>
            <Link to={'/favorites'}>
            <div className='menu-option'>
            <img width={'21px'} src={hearthoff}></img>
            Favoritos
            </div></Link> 
            <Link to={'/login'}><div className='menu-option'>
            <img  width={'21px'} src={user}></img>
            <li>Minha Conta</li>
            </div></Link>
            <div onClick={HandleOpenCart} className={"menu-option"}>
            <img  width={'21px'} src={shopping}></img>  
            <li>Minha Cesta</li>
          
            </div>
        </ul>
        <ShoppingCart/>        

    </div>

)



}export default Header