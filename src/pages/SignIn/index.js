import React, {useState, useContext} from 'react';
import { View, Text, Platform, ActivityIndicator } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { AuthContext } from '../../contexts/auth.js';

import { Background, Container, Logo, AreaInput, Input, SubmitButton, 
SubmitText, Link, LinkText} from './style.js';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, loadingAuth } = useContext(AuthContext);

  //instancia da navegacao 
  const navigation = useNavigation();
  
  //funcao de logar 
  function login(){
    signIn(email, password);
  }

 return (
   <Background>
      <Container   
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
        enabled
        >
        <Logo source={require('../../assets/TamanhoA.png')}/>
        
        <AreaInput>
          <Input
          placeholder="Email"
          autoCorrect={false}
          autoCapitalize="none"
          value={email}
          onChangeText={ (text) => setEmail(text) }
          />
        </AreaInput>

        <AreaInput>
          <Input
          placeholder="Senha"
          autoCorrect={false}
          autoCapitalize="none"
          value={password}
          onChangeText={ (text) => setPassword(text) }
          secureTextEntry={true} 
          />
        </AreaInput>

      <SubmitButton  onPress={login}>
        {
          loadingAuth ? (
            <ActivityIndicator  size={20} color="#FFF"/>
          ) : (
            <SubmitText>Acessar</SubmitText>
          )
        }
      </SubmitButton>

      <Link onPress={ () => navigation.navigate('SignUp')}>
        <LinkText>Criar uma conta!</LinkText>
      </Link>

      </Container>
   </Background>
  );
}