import React, {useState,  useContext} from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';

import { TouchableWithoutFeedback, Keyboard, Alert} from 'react-native';

import { AuthContext } from '../../contexts/auth';

import { useNavigation} from '@react-navigation/native'
import Header from '../../Components/Header';
import {Background, Input, SubmitButton, SubmitText} from './styles';



import { format } from 'date-fns';
import Picker from '../../Components/Picker/index.android';
import firebase from '../../services/firebaseConnection';

export default function New() {
    const [valor, setValor] = useState('');
    const [tipo, setTipo] = useState('receita');

    const {user: usuario } = useContext(AuthContext);

    const navigation = useNavigation();

   function  Registrar(){
      Keyboard.dismiss();
      if(isNaN(parseFloat(valor)) ||  tipo === null){
            alert('Preencha todos os valores!');
      return;
      } 

      Alert.alert(
         'Confirmando dados',
         `tipo  ${tipo} - Valor: ${parseFloat(valor)} `,
         [
             {
                text: 'Cancelar',
                style: 'cancel'
             },

             {
               text: 'Continuar',
               onPress: () => AddRegistro()
             }

         ]
      )

   }
async function AddRegistro(){
    let uid = usuario.uid;

    let key = await firebase.database().ref('historico').child(uid).push().key;
    await firebase.database().ref('historico').child(uid).child(key).set({
        tipo: tipo,
        valor: parseFloat(valor),
        date:  format(new Date(), 'dd/MM/yyyy')
    })

    // Atualizando o saldo 
    let user = firebase.database().ref('users').child(uid);
    await user.once('value').then((snapshot)=>{
       let saldo = parseFloat(snapshot.val().saldo
       );

        tipo === 'despesa' ? saldo -= parseFloat(valor): saldo += parseFloat(valor);
        
        user.child('saldo').set(saldo);

    });
    Keyboard.dismiss();
    setValor('');
    navigation.navigate('Home');
 


   }

 return (
     <TouchableWithoutFeedback onPress={ () => Keyboard.dismiss() }>
        <Background>
             <Header />
          <SafeAreaView  style={{alignItems: 'center'}}>
           
              <Input 
                 placeholder="Valor Desejado" 
                 keyboardType="numeric"
                 returnKeyType="next"
                 value={valor}
                 onChangeText={ (text) => setValor(text)}
              />  

              <Picker onChange={setTipo} tipo={tipo} />

              <SubmitButton onPress={Registrar}>
                  <SubmitText>Registrar</SubmitText>
              </SubmitButton>



           </SafeAreaView>
        </Background>
     </TouchableWithoutFeedback>
 );
}