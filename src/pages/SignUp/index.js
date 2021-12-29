import React, {useContext, useState} from 'react';
import { Platform, ActivityIndicator } from 'react-native';
import { AuthContext } from '../../contexts/auth';

import { Background, Container, AreaInput, Input, SubmitButton, 
SubmitText} from '../SignIn/style';



export default function SignIn() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  // import function signUP
  const { signUp, loadingAuth } = useContext(AuthContext);


  function CadastrarPrimeiroAcesso(){
    signUp(email, password, nome);
  }


 return (
   <Background>
      <Container
      behavior={Platform.OS === 'ios' ? 'padding' : ''}
      enabled
      >

        <AreaInput>
          <Input
          placeholder="Nome"
          autoCorrect={false}
          autoCapitalize="none"
          value={nome}
          onChangeText={ (text) => setNome(text) }
          />
        </AreaInput>

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
          />
        </AreaInput>

      <SubmitButton onPress={CadastrarPrimeiroAcesso}>
      {
          loadingAuth ? (
            <ActivityIndicator  size={20} color="#FFF"/>
          ) : (
            <SubmitText>Cadastrar</SubmitText>
          )
        }
        
      </SubmitButton>

      </Container>
   </Background>
  );
}