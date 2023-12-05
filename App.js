import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
// need -npm install @react-navigation/native
import { createNativeStackNavigator } from "@react-navigation/native-stack"
// need -npm install @react-navigation/native-stack
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Login,Signup, Welcome,Home, Trends,Calendar,Settings } from "./screens";


const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

// Create a bottom tab navigator for the main app screens
function MainAppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Trends') {
            iconName = focused ? 'trending-up' : 'trending-up-outline';
          } else if (route.name === 'Calendar') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Trends" component={Trends} />
      <Tab.Screen name="Calendar" component={Calendar} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}



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
          name="MainApp"
          component={MainAppTabs}
          options={{ headerShown: false 
          }}
        />
      </Stack.Navigator>

      
    </NavigationContainer>


  );
}