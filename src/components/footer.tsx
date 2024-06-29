import master from '../imgs/master2.jpg'
import visa from '../imgs/visaminilogo.png'
import maestro from '../imgs/Maestro1.png'
import hipercard from '../imgs/hipercard.png'
import LetraE from '../imgs/letra-e.png'
import { useNavigate } from "react-router-dom";


function Footer(){

    const navigate = useNavigate()

    return(

        <footer>

       

        <div id="subfooter">

        <div onClick={()=>{navigate('/')}} style={{display:"flex", cursor:'pointer',alignItems:'center'}}><img style={{width:'54px',height:'54px'}} src={LetraE}></img><h1 style={{fontSize:'30px'}} >.Books</h1></div>


        </div>
        <div id="subfooter1">

            <ul>
                <h3>Atendimento</h3>
                <li>Política de Vendas, Trocas e Privacidade</li>
                <li>Termos e Condições de Compra</li>
                <li>Fale Conosco</li>

            </ul>

            <ul>
            <h3>Institucional</h3>
                <li>Sobre o E.Books</li>
                <li>Relações com Investidores</li>
                <li>Nossas Lojas</li>
                <li>Trabalhe Conosco</li>
                <li>Seja um Parceiro</li>

            </ul>

            <ul>
            <h3>Formas de Pagamento</h3>
                <div style={{display:'flex'}}>
                    <img style={{marginLeft:'0'}}width={'50px'} src={master}></img>
                    <img style={{marginLeft:'20px'}}width={'50px'} src={visa}></img>
                    <img style={{marginLeft:'20px'}}width={'50px'} src={maestro}></img>
                    <img style={{marginLeft:'15px'}} width={'50px'} src={hipercard}></img>
                </div>

            </ul>
        </div>

            <div id="subfooter2">

                <span>E.Books - Todos os direitos reservados.</span>

            </div>

        </footer>

    )

}export default Footer