// ==========================
// Forma de indentar o codigo
// ==========================
import styled from "styled-components/native";

export const Container = styled.View`      
flex:1;
background-color: #131313;
align-items: center;
`;

export const Nome = styled.Text`
text-align: center;
font-size: 28px;
margin-top: 28px;
margin-bottom: 25px;
color: #FFF;
`;

export const NewLink = styled.TouchableOpacity`
text-align: center;
align-items: center;
background-color: #00b94a;
width:50%;
height: 40px;
border-radius: 15px;
margin-bottom: 10px;
justify-content: center;
`;

export const  NewText = styled.Text`
font-weight: bold;
font-size: 18px;
color: #FFF;
`;

export const   Logout = styled.TouchableOpacity`
text-align: center;
align-items: center;
background-color: #DC143C;
width:50%;
height: 40px;
border-radius: 15px;
margin-bottom: 10px;
justify-content: center;
`;

export const  LogoutText = styled.Text`
font-weight: bold;
font-size: 18px;
color: #FFF;
`;
