import { useContext } from "react";
import Content from "./components/content";
import Categories from "./components/filter";
import { UserFunctionsContext } from "./components/contexts/context";



function Home(){

    const {APIlibraries,HeaderTitle} = useContext(UserFunctionsContext)
 

return(

    <div className="Home-Page">
             
        <div className="sub-div">
            <h2>{HeaderTitle}</h2>
            <h2 className="products-count">{APIlibraries && APIlibraries.length > 0 && APIlibraries.length + " Produtos "}</h2>
        </div>

        <div className="subhome">

        <Categories></Categories>
        <Content></Content>
        </div>
      
    </div>


)


}export default Home
