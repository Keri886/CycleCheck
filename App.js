import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
// need -npm install @react-navigation/native
import { createNativeStackNavigator } from "@react-navigation/native-stack"
// need -npm install @react-navigation/native-stack
import { Login,Signup, Welcome } from "./screens";
import Home from './screens/Home';

const Stack = createNativeStackNavigator();

export default function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Welcome'
      >
        <Stack.Screen           //// Navigation to the Welcome screen
          name="Welcome"
          component={Welcome}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen       // Navigation to the Login screen
          name="Login"
          component={Login}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Signup"   //// Navigation to the Signup screen
          component={Signup}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen       // Navigation to the Home screen
          name="Home"
          component={Home}
          options={{
            headerShown: false
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}