import React, {useState, createContext, useEffect} from 'react';
import firebase from '../services/firebaseConnection';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({});

function AuthProvider({ children }){
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState();
    // useState para loading
    const [loadingAuth, setLoadingAuth] = useState(false);


    // funcao quando o app  e construido na tela. 
    useEffect( () => {
        async function loadStorage(){
            const storageUser = await AsyncStorage.getItem('Auth_user');

            if (storageUser){
                setUser(JSON.parse(storageUser));
                setLoading(false);
            }

            setLoading(false);
        }    
        loadStorage();
    }, []);


   // funcao para logar o usuario
   async function signIn(email, password){
       setLoadingAuth(true);
       await firebase.auth().signInWithEmailAndPassword(email, password)
       .then(async (value) => {
         let uid = value.user.uid;
         await firebase.database().ref('users').child(uid).once('value')
         .then( (snapshot)=>{
             let data = {
                uid: uid,
                nome: snapshot.val().nome,
                email:value.user.email,    
             };

             setUser(data);
             storageUser(data);
             setLoadingAuth(false);
         }) 
       })
       .catch( (error) =>{
           alert('Usuario ou senha Invalida!');
           setLoadingAuth(false);  
       })
   }




    //funcao de cadastro para ser registrado no banco de dados
    async function signUp(email, password, nome){
        setLoadingAuth(true);
        await firebase.auth().createUserWithEmailAndPassword(email,password)
        .then(async( value) => {
            let uid = value.user.uid;
            await firebase.database().ref('users').child(uid).set({
                saldo: 0,
                nome: nome
            })
            .then(()=> {
                let data = {
                    uid: uid,
                    nome: nome,
                    email: value.user.email,
                };
                setUser(data);
                storageUser(data);
                setLoadingAuth(false);
            }) 
        })
        .catch( (error) =>{
            alert('A senha precisa conter 8 caracteres');
            setLoadingAuth(false); 
        })
    }
       // guardando dados no AsyncStorage 
       async function storageUser(data){
             await AsyncStorage.setItem('Auth_user', JSON.stringify);
       }

       // ======= limpar Async-Storage e deslogar no firebird! =======
       async function signOut(){
           await firebase.auth().signOut();
           await AsyncStorage.clear()
           .then( () => {
               setUser(null);
           })
           .catch( () => {
               alert("Deslogado usuario")
           })
       }


    return(
        <AuthContext.Provider value={{ signed: !!user,
                                                 user,
                                                 signUp,
                                                 signIn,
                                                 signOut,
                                                 loading, loadingAuth }}>
            {children}
        </AuthContext.Provider>
    );
}
export default AuthProvider;