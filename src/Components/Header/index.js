import React from 'react';
import {ButtonMenu, Container} from './style';
import { MaterialIcons } from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';

export default function Header() {
    const navigation = useNavigation();
 return (
     <Container>                      
         <ButtonMenu onPress={ () => navigation.toggleDrawer() }>
             <MaterialIcons name="menu-open" size={38} color="#FFF" /> 
         </ButtonMenu>
     </Container>
 );
}