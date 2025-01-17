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
    my_account_add?:boolean;
    reset?:boolean;
    save_cancel?:boolean;
    save?:boolean;
    save_password?:boolean;
    checkout?:boolean;

}

export const Button = styled.button<Button_types>`

font-family: Raleway;
background-color: #fdd900;
border:none;
font-weight: 400;
cursor: pointer;
border-radius: 5px;

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



${props=>props.my_account_button && css`
  background-color:${props.$primary ? '#000000' : '#ffffff'};
  border:${!props.$primary && '1px solid black'};
  color:${props.$primary ? 'white' : 'black'};

  
`}

${props=>props.back_button_account && css`

 margin-right: 0px;
 background-color:#fdd900;
 color: rgb(0, 0, 0);
 height: 35px;
 border: none;
 width: 180px;


 &:hover{
  background-color:#000000;
  color:#ffffff;
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


${props=>props.save_password  && css`
  margin-top: 20px;
  padding: 10px;

&:disabled{
  background-color: #f2f4f5;
}

`}

${props=>props.checkout && css`
  height: 62px;
  width: 100%;
  position: absolute;
  bottom: 0;
  font-weight: 500;
  display: flex;

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

export const Button2 = styled.div<Button_types>`

${props=>props.checkout && css`
  height: 62px;
  width: 100%;
  position: absolute;
  bottom: 0;
  font-weight: 500;
  display: flex;
  background-color:#fdd900 ;
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