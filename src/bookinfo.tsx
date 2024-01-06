import { useCallback, useContext} from "react";
import { UserFunctionsContext} from "./components/contexts/context";
import { API } from "./api/api";
import hearthoff from './imgs/coracaooff.png'
import hearth from './imgs/coracao.png'
import substituteIMG from './pictures/substituteIMG.png'
import {useNavigate} from 'react-router-dom'
import { AuthContext } from "./components/contexts/authController";


function Bookinfo(){

const {GetFavorites,Bookdesc,Favorite,CartBook,setFavorite,setAPIFav,setMyFavorites,setOpenCart,HandleCart} = useContext(UserFunctionsContext)

const {Authenticated} = useContext(AuthContext)

const navigate = useNavigate()

const randomISBN = Math.floor(Math.random()* 10000000000)

const handleLike  = useCallback<React.MouseEventHandler<HTMLImageElement>>(async(e)=>{
  const id = (e.target as HTMLDivElement).id
  if(!Authenticated)return alert("Você não está Autenticado!")
  if(!setFavorite)return

  if( GetFavorites?.includes(id)){
    
   await API.put("/delfav",{id}).then(
          res=>{
              setAPIFav && setAPIFav((prev)=>prev.filter((item)=>item.id !== id))                
           return   setFavorite(id)       
              
          },error=>{
              console.log(error)
          }
      )
    
  }else{
    
  await API.put("/editfav",{id}).then(
          res=>{
            return  setFavorite(id)
       
          },error=>{
              console.log(error)
          }
      )
  }

  await API.get('/getfav').then(
      res=>{
        setMyFavorites && setMyFavorites(res.data)
    
      },error=>{

        console.log(error)

      }
    )
    


},[Favorite,GetFavorites])



return(
    
      
    <div className="favorites-container">
        <div className="favorites-header">
      <button onClick={()=>window.history.back()}  id="backbuttonfav"><img ></img>VOLTAR </button>
        <h2>{Bookdesc && Bookdesc.map((items)=>{return items.volumeInfo.title})}</h2>
        </div>
       
    <div className="favorites-content">
      
      {Bookdesc && Bookdesc.map((item)=>{
        const id = item.id
        const img = item.volumeInfo.imageLinks &&item.volumeInfo.imageLinks.smallThumbnail
        const title = item.volumeInfo.title
        const price = item.price
        const author = item.volumeInfo.authors
        const subtitle = item.volumeInfo.subtitle
        const publisher = item.volumeInfo.publisher
        const publisherdata = item.volumeInfo.publishedDate
        const language = item.volumeInfo.language
        const pagecount = item.volumeInfo.pageCount
        const isbn = item.volumeInfo.industryIdentifiers ? item.volumeInfo.industryIdentifiers.map((item)=>{return item.identifier})[1] : randomISBN
        const description = [item.volumeInfo.description]
        const description1 = description.map(texto => texto.replace(/<\/?p>/g, ''))
        
        return(

            <>
        <div className="sub-container-bookinfo">
             
      <div className="bookimage">
        
        <img src={img ? img:substituteIMG }></img>


        
        </div>
  
        <div className="book-contentinfoContainer">

            <div className="book-contentinfo">
                    <div className="contentbookinfo">
                
                      <div className="contentbookinfo-title"><h2>Por:R${price},00</h2><img id={id} onClick={handleLike} style={{cursor:'pointer'}} src={GetFavorites?.includes(id)?hearth:hearthoff}></img></div>   
                      <div className="contentbook-publisher">
                        <div>{publisher}</div>
                        <div> {isbn == undefined  ? " Ref: " + randomISBN  : " Ref: " + isbn }</div>
                        
                        </div>
                  
                   </div>
                   <div className="book-contentinfoButton">
                        <button id={id} onClick={(()=>{
                            setOpenCart && setOpenCart(true)
                            if(CartBook?.some((item)=>item.id === id))return
                            HandleCart && HandleCart(item,"AddCart",id)
                           
                        })}>Adicionar ao carrinho</button> <button onClick={(()=>{
                          if(Authenticated)navigate('/shopping')
                          if(CartBook?.some((data)=>data.id === id))return
                          
                          else{
                            HandleCart && HandleCart(item,"AddCart",id)
                          }

                        })}>Comprar</button>
                   </div>
             
            </div>

        </div>

        </div>
       <div className="bookcontainer-description">
        <h2>Descrição</h2>
            <p>
                {description1}
            </p>
           
        <div className="specification-book">
        <h2>Especificação</h2> 
        <div className="specification-bookul">
        <ul id='book-info-ul-title'>
            <li>Data de Publicação</li>
            <li>Autor</li>
            <li>Editora</li>
            <li>Idioma</li>
            <li>Número de Páginas</li>
            <li>Título Original</li>
            <li>ISBN</li>
            <li>{subtitle ?'Subtitulo':""}</li>
        </ul>


        <ul id='book-info-ul-data'>
        <li>{publisherdata}</li>
        <li>{author}</li>
        <li>{publisher}</li>
            <li>{language}</li>
            <li>{pagecount}</li>  
            <li>{title}</li>
            <li>{isbn}</li>
            <li>{subtitle}</li>

        </ul>

        </div>

        </div>
        
      </div>

    </>

        )



      })}
  


            </div>
         


           </div>






)





}export default Bookinfo