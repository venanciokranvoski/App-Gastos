import React from "react";
import {
        createStackNavigator,
  } from '@react-navigation/stack';

  import SignIn from "../pages/SignIn";
  import SignUp from "../pages/SignUp";

  const Nav = createStackNavigator();

  function AuthRoutes(){
      return(
        <Nav.Navigator>
            <Nav.Screen name="Login"
                        component={SignIn}
                        options={{headerShown:false }} />

            <Nav.Screen  name="SignUp"
                         component={SignUp}
                         options={{headerStyle:{
                             backgroundColor: '#131313',
                             borderBottomWidth: 1,
                             borderBottomColor: '#00b94a' 
                         },
                            headerTintColor: '#FFF',
                            headerBackTitleVisible: false,
                            headerTitle: 'Voltar'
                        }}
                          />            
        </Nav.Navigator>
      );
  }

export default AuthRoutes;