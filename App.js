import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Routes from './src/routes/index';
import {NavigationContainer} from '@react-navigation/native'
import AuthProvider from './src/contexts/auth';

export default function App() {
  return (
    <NavigationContainer >
        <AuthProvider>  
            <StatusBar backgroundColor="#131313" style="auto" />
            <Routes />        
        </AuthProvider>  
    </NavigationContainer>
  );
}