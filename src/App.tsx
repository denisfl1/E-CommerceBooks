import './App.css';
import {Routes,Route, BrowserRouter} from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Home from './home'
import Footer from './components/footer';
import Header from './components/header';
import Login from './login';
import Favorites from './favorites'
import Bookinfo from './bookinfo'
import { UserFunctionsProvider} from './components/contexts/context';
import { AuthContext, AuthProvider } from './components/contexts/authController';
import Shopping from './shopping';
import MyAccount from './myAccount'
import { ReactNode, useContext} from 'react';
import FinishCart from './finishCart';
import ReqSuccess from './components/reqSuccess';



function App() {


interface IPrivate{
  children:ReactNode
}


  const Private:React.FC<IPrivate> = ({children})=>{
    const{Authenticated} = useContext(AuthContext)


    if(!Authenticated){
    return <Navigate to="/login"/>
    }
      return <>{children}</>
   
  }



  const Redirect:React.FC<IPrivate>=({children})=>{
    const{Authenticated} = useContext(AuthContext)
    if(Authenticated){
      return  <Navigate to="/myaccount"/>
    }

    return <>{children}</>
  }
  


  return (
    <div className="App">

      <BrowserRouter >
      <AuthProvider>
      <UserFunctionsProvider>
      <Header></Header>
      <Routes>
      <Route path="/home" element={<Home></Home>}></Route>
      <Route path="/login" element={<Redirect><Login></Login></Redirect>}></Route>
      <Route path="/favorites" element={<Private><Favorites></Favorites></Private>}></Route>
      <Route path="/bookinfo/:Bookdesc" element={<Bookinfo></Bookinfo>}></Route>
      <Route path="/shopping" element={<Shopping></Shopping>}></Route>
      <Route path="/finishCart" element={<FinishCart></FinishCart>}></Route>
      <Route path='/thanksRequest' element={<ReqSuccess></ReqSuccess>}></Route>
      <Route path='/myaccount' element={<Private><MyAccount></MyAccount></Private>}></Route>
      <Route path="*" element={<Home></Home>}></Route>
      </Routes>
      <Footer></Footer>
      </UserFunctionsProvider>
      </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
