import React, { useContext } from 'react';
import {Container, Nome, NewLink, NewText, LogoutText, Logout} from './style.js';
import { useNavigation } from '@react-navigation/native'
import { AuthContext } from '../../contexts/auth';
import Header from '../../Components/Header';


export default function Profile() {
    const navigation = useNavigation();
    
    const {user, signOut  } = useContext(AuthContext);


 return (
      <Container>
          <Header /> 
          <Nome>
            {user && user.nome }   
          </Nome>
          <NewLink onPress={ () => navigation.navigate('Registrar')}>
              <NewText>Registrar Gastos</NewText>    
          </NewLink>


          <Logout onPress={ () => signOut() } >
              <LogoutText>Sair</LogoutText>
          </Logout>
      </Container>
 );
}