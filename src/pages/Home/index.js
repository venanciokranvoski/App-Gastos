import React, { useContext, useState, useEffect } from 'react';
import {Alert} from 'react-native';
// O contexto da aplicacao
import { AuthContext } from '../../contexts/auth';
import Header from '../../Components/Header';
import { Background,
         Saldo,
         Container,
         Nome,
         Title, List} from './styles';
import HistoricoList from '../../Components/HistoricoList';
import firebase from '../../services/firebaseConnection';
import { format, isPast } from 'date-fns';


export default function Home() {
    const [historico, setHistorico] = useState([]);
    const [saldo, setSaldo] = useState(0);

    const { user } = useContext(AuthContext);
    const uid = user && user.uid;   



        // ======== Hooks ========= //
        useEffect(() => {
            async function loadList(){
                await firebase.database().ref('users').child(uid).on('value', (snapshot)=>{
                  setSaldo(snapshot.val().saldo);    
                });
            
            await firebase.database().ref('historico')
            .child(uid)
            .orderByChild('date').equalTo(format(new Date, 'dd/MM/yyyy'))
            .limitToLast(10).on('value', (snapshot)=> {
                setHistorico([]);

              // colocando valores dentro da lista que vieram do banco 
              
              snapshot.forEach((childItem) => {
                  let list = {
                      key: childItem.key,
                      tipo: childItem.val().tipo,
                      valor: childItem.val().valor,

                  };
                  setHistorico(oldArray => [...oldArray, list].reverse());
              })
            })
            
            
            }  
          
            loadList();
           }, []);

        // Verificar se a data ja Passou ! ---  !
        function DeletarItem(data){
            if( isPast(new Date(data.date)) ){
                // -- Se a data do registro ja passou vai entrar aqui ! --
                alert('Você não pode excluir um registro antigo !');
                return;
            }

        Alert.alert(
            'Cuidado Atenção! ',
            `Você Deseja Excluir ${data.tipo} - Valor: ${data.valor}`,
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                {
                    text: 'Continuar',
                    onPress: () => DeletarItemSucesso(data)
                }
            ]
        ) 

        }

        async function DeletarItemSucesso(data){
            await firebase.database().ref('historico')
            .child(uid).child(data.key).remove()
            .then( async  () => {
               let saldoAtual = saldo;
               data.tipo === 'despesa' ? saldoAtual += parseFloat(data.valor) : saldoAtual -= parseFloat(data.valor);

               await firebase.database().ref('users').child(uid)
               .child('saldo').set(saldoAtual);
            })
            .catch( (error) =>{
                console.log(error);
            })
        }


    return(
        <Background>
            <Header /> 
            <Container>
                <Nome>{user && user.nome}</Nome>
                    <Saldo> R$ {saldo.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</Saldo>     
            </Container>

            <Title>Ultimas Movimentações</Title>

            <List  // barra de scrool para nao aparecer
                    showsVerticalScrollIndicator={false}
                    data={historico}   
                    KeyExtractor={ item => item.key}
                    renderItem={ ({ item }) => (  <HistoricoList data={item} deleteItem={DeletarItem} />)}
            
            />
        </Background>
    );
}