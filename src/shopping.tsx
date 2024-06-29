import {Link,useNavigate} from 'react-router-dom'
import { useContext } from "react";
import { UserFunctionsContext} from "./components/contexts/context";
import clear from './imgs/close.png'
import substituteIMG from './pictures/substituteBook.png'


function Shopping(){

const {CartBook,setBookdesc,HandleCart,HandleCountCart} = useContext(UserFunctionsContext)

const navigate = useNavigate()


return(
    <div className="shopping-container">

        <div style={{width:'90%',margin:'auto'}} className="favorites-header">
         <button onClick={()=>window.history.back()}  id="backbuttonshopping"><img ></img>VOLTAR </button>
      <h2 style={{marginLeft:"0px",marginTop:"10px"}}>Minha Cesta</h2>
        </div>

        <div className="shopping-contentContainer">

            <div className="shopping-content">
           <table className="table-content">

           <thead>
                <tr>
                    <th className="product-th">Produto</th>
                    <th className="price-th">Preço</th>
                    <th className="qtd-th">Qtd.</th>
                    <th className="total-th">Total</th>
                    <th className="clear-th"></th>
                </tr>

            </thead>
            <tbody>
          {CartBook && CartBook.map((items)=>{
            const id = items.id
            const img =  items.volumeInfo.imageLinks && items.volumeInfo.imageLinks.smallThumbnail
            const title = items.volumeInfo.title
            const price = items.price
            const quantity = items.quantity

            return(
                <tr key={id}>
                <td>

                <div className="product">
                <Link to={`/bookinfo/${items.id}`}><img onClick={()=>{setBookdesc && setBookdesc([items])}} width={'80px'} src={img ? img : substituteIMG}></img></Link><p>{title}</p>
                </div>
               
                </td>

            
                <td>
                <div className="price">
                    R$:{price},00
                </div>
                </td>
              

                <td>
                
                <div style={{width:"78px",margin:'auto'}}  className='cartControl'>

                <button disabled={quantity==1} onClick={()=>HandleCountCart && HandleCountCart(items,'decrease',id)}>-</button> <p>{quantity}</p> <button onClick={()=>HandleCountCart && HandleCountCart(items,'increase',id)}>+</button>

                </div>
              
     
                </td>
                <td>
                <div className="total">

                  R$:{price * quantity},00

                </div>
                </td>
                <td>
                
                   <img className="clearshopping" onClick={()=>HandleCart && HandleCart(items,"DelCart",id)}
                 width={'12px'}  src={clear}></img>

                </td>
                </tr>
            )

          })}  

               
            </tbody>

           </table>

           {CartBook && CartBook?.length>0  && <div className="shoppingResume">
                <div className="title-shoppingResume">
                <h2>Resumo da Compra</h2>
                </div>

                <div className="shoppingsubtotalContainer">

                    <div className="shoppingSubtotalContent">
                        <span>Sub-total:</span>  <span>{" R$ " + CartBook?.reduce((data,elem)=>data + elem.price * elem.quantity,0) + ',00'}</span>
                    </div>

                    <div className="shoppingShippingContent">
                        <span>Frete:</span>  <span>Grátis</span>
                    </div>

                    <div className="shoppingTotalContent">
                        <span className="shoppingTotalTitle">Total:</span>  <span className="shoppingTotalValue">{" R$ " + CartBook?.reduce((data,e)=>data + e.price * e.quantity ,0)+ ',00'}</span>
                    </div>

                </div>

                <div onClick={()=>{return navigate('/finishcart')} } className="finishing-Button">

                  <p >FINALIZAR COMPRA</p> 

                </div>
            </div>}
           </div>





        </div>




    </div>
)



}export default Shopping