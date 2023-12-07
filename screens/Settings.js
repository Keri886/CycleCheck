import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import COLORS from '../constants/colors';
import { db, auth } from '../firebase/firebase';
//import { useAuth } from '../firebase/auth';
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Settings({navigation}){

     const handleSignOut = async () => {
       await auth.signOut();
       navigation.navigate('Welcome')
     }
   return (
    <View style= {{flex: 1, alignItems: 'center', justifyContent:'center'}}>
      <Text>Settings Screen</Text>

  <Button  
                    title="Sign Out"
                    onPress={handleSignOut}
                    style={{
                        marginTop: 18,
                        marginBottom: 4,
                    }}
                />

    </View>
  )
}