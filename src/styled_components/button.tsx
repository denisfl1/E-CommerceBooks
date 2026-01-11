import {styled,css} from "styled-components"

interface Button_types{
    shopping_button?:boolean;
    book_info_button?:boolean;
    finish_cart_button?:boolean;
    my_account_button?:boolean;
    $adress?:boolean;
    $primary?:boolean;
    $card?:boolean;
    authentication?:boolean;
    back_button_account?:boolean;
    back_button_fav?:boolean;
    my_account_add?:boolean;
    reset?:boolean;
    save_cancel?:boolean;
    save?:boolean;
    save_password?:boolean;
    checkout?:boolean;
    change_card?:boolean;
    cancel?:boolean;
    show_more?:boolean;
    login?:boolean;
    increase_decrease?:boolean;
    view_request?:boolean;
    continue_shopping?:boolean;
}

export const Button = styled.button<Button_types>`

font-family: Raleway;
background-color: #fdd900;
border:none;
font-weight: 400;
cursor: pointer;
border-radius: 5px;


${props=>props.login && css `

    width: 100%;
    margin-top: 15px;
    background-color:${!props.$primary && '#dee2e7'};
    color: #000000;
    height: 40px;
    font-size: 14px;

&:hover{
    background-color:${!props.$primary ? '#f2f4f8' : 'black'} ;
    color:${!props.$primary ? '#949494':'white'} ;
  }

`}

${props=>props.shopping_button && css`

width: 100%;
left: 0;
padding: 12px;
margin-top: auto;
bottom: 0;
font-size: 16px;
position: absolute;
border-radius:0;
/* text-align: center; */
/* align-items: center; */


&:hover{
background-color: #6e6e6e;
color: white;

}


`}

${props=>props.book_info_button && css`

margin-top: 10px;
padding: 0px 15px 0px 15px;
height: 40px;


&:hover{
background-color: #000000;
color:#ffffff;

}

`}



${props=>props.finish_cart_button && css`
  width: 150px;
  height: 40px;
  margin-top: 10px;
  font-size: 18px;

  
&:hover{
background-color: #6e6e6e;
color: white;

}

`}

${props=>props.increase_decrease && css `

  background-color:transparent;
  width: 30px;
  height: 100%;

&:hover{
  background-color: #e4bd10;

}

&:disabled:hover{
  background-color: #fdd900;
  cursor: auto;

}


`}



${props=>props.my_account_button && css`
  background-color:${props.$primary ? '#000000' : '#ffffff'};
  border:${!props.$primary && '1px solid black'};
  color:${props.$primary ? 'white' : 'black'};
  margin-left:auto;

  
`}

${props=>props.back_button_account && css`

  width: 120px;
  height: 30px;
  margin-left: 200px;
  margin-bottom: 4px;
  border: none;
  align-items: center;
  display: flex;
  background-color:#ffffff;
  font-size: 17px;
  font-weight: 600;


 &:hover{
  background-color:#000000;
  color:#ffffff;
 }



`}


${props=>props.back_button_fav && css`

  width: 120px;
  height: 30px;
  margin-left: 200px;
  margin-bottom: 4px;
  border: none;
  align-items: center;
  display: flex;
  background-color: #ffffff;
  font-family: Raleway;
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
  color:black;

  &:hover{
  color:white;
   background-color: black;

  }

  `}


${props=>props.$adress && css`
    padding: 10px;

`}


${props=>props.$card && css`
    width:150px;
    height:35px;
    padding: 10px;
    margin-left:${props.$primary && '5px'};

`}

${props=>props.my_account_add && css`
    background-color:#fdd900;
    color:#000000;
    margin-right: 0px;
    padding: 8px 15px;
    margin-left:auto;


&:hover{
  background-color:#000000;
  color:#ffffff;
}

`}


${props=>props.reset && css`
background-color:#000000;
color:#ffffff;
width:150px;
height:35px;

`}


${props=>props.authentication && css`
padding: 8px 15px;

`}


${props=>props.save_cancel && css`
  background-color:${props.save ? '#fdd900' : '#ffffff'};
  font-size:18px; 
  width: ${props.save ? '300px' : '130px'};
  height:40px;
  margin-top: 20px;

&:hover{
  background-color:${props.save ? '#000000 ': 'rgb(255, 210, 210)'};
  color:${props.save && '#ffffff'};
}
`}

${props=>props.cancel && css `

  background-color:${props.$primary ? '#ffffff' : '#fdd900'};
  width:${props.$primary ? '110px': '200px'};
  height:40px;
  align-items: center;
  display: flex;
  justify-content:${!props.$primary &&'center' };
  margin-top:15px;
  font-size:14px;


  &:hover{
  background-color: #000000;
  color:white;
  }


`}


${props=>props.save_password && css`
  margin-top: 20px;
  padding: 10px;

&:disabled{
  background-color: #f2f4f5;
}

`}

${props=>props.change_card && css `

background-color: transparent;
border: 1px solid rgb(191, 191, 191);
height: 30px;
width: 80px;


`}

${props=>props.checkout && css`
  height: 62px;
  width: 100%;
  position: absolute;
  bottom: 0;
  font-weight: 500;
  display: flex;
  background-color:${!props.$primary && ' #000000;'} ;
  color: ${props.$primary ?' #000000;':' white'};
  cursor: pointer;
  font-size:18px;
  border-radius:0px;

&:hover{
  background-color: #000000;
  color: white;
}


p{
  align-items: center;
  margin: auto;
  
}


`}

${props=>props.show_more && css`


  margin:auto;
  height: 38px;
  width: 150px;
  display: flex;
  align-items: center;

`}


${props=>props.view_request && css`
  
  background-color:black;
  color:white;
  padding:10px;

  
  `}


${props=>props.continue_shopping && css`
  
  padding:10px;
  display:flex;
  margin:auto;
  margin-top:50px;
  font-weight:500
  
  
  `}

`

export const Button2 = styled.div<Button_types>`

${props=>props.checkout && css`
  height: 62px;
  width: 100%;
  position: absolute;
  bottom: 0;
  font-weight: 500;
  display: flex;
  background-color:${props.$primary ? '#fdd900' :' #000000;'} ;
  color: ${props.$primary ?' #000000;':' white'};
  font-family: Raleway;
  cursor: pointer;

&:hover{
  background-color: #000000;
  color: white;
}


p{
  align-items: center;
  margin: auto;
  
}


`}

`