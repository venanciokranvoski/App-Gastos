import styled from "styled-components/native";

export const Background = styled.View`
flex:1;
background-color: #131313;


`;

export const Container = styled.View`
    margin-left: 15px;
    margin-bottom: 25px;
`;

export const Nome = styled.Text`
    font-size: 20px;
    color: #FFF;
    font-style: italic;
`;

export const Saldo = styled.Text`
  margin-top: 5px;
  font-size: 30px;
  color: #FFF;
  font-weight: bold;
`;

export const Title = styled.Text `
    margin-left: 18px;
    color: #00b94a;
`;

export const List = styled.FlatList.attrs({
    marginHorizontal:15
})`
padding-top: 20px;
background-color: #FFF;
border-top-left-radius: 20px;
border-top-left-radius: 15
border-top-right-radius: 15px;
margin-left: 10px;
margin-right: 10px;



`;