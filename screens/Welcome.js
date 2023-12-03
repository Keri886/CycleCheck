import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import { LinearGradient } from "expo-linear-gradient";
// need -npx expo install expo-linear-gradient
import COLORS from '../constants/colors';
import Button from '../components/Button';

const Welcome = ({ navigation }) => {

  return (
   <LinearGradient
     style={{
       flex: 1
     }}
     colors={[ COLORS.primary,COLORS.secondary]}
   >
      <View style={{ flex: 1 }}>
         <View>
            <Image    // Add the icon on the top, image create by chatGPT
              source={require("../assets/cyclecheck.png")}
              style={{
                height: 300,
                width: 300,
                borderRadius: 20,
                position: "absolute",
                top: 90,
                left: 50,     
                 }}
               />

          </View>
    {/* Welcome page content  */}

         <View style={{
             paddingHorizontal: 22,
             position: "absolute",
             top: 400,
             width: "100%"
          }}>
             <Text style={{
                fontSize: 50,
                fontWeight: 800,
                color: COLORS.white
              }}>Welcome</Text>
              <Text style={{
                fontSize: 46,
                fontWeight: 800,
                color: COLORS.white
                }}>CycleCheck</Text>
               
         <View style={{ marginVertical: 22 }}>
            <Text style={{
                fontSize: 16,
                color: COLORS.white,
                marginVertical: 4
                }}>Your companion for tracking menstrual cycles and health.</Text>
                
          </View>
{/* Login and Signup Button */}
          <Button
            title="Join Now"
            onPress={() => navigation.navigate("Signup")}
            style={{
            marginTop: 22,
            width: "100%"
             }}
           />

          <View style={{
            flexDirection: "row",
            marginTop: 12,
            justifyContent: "center"
           }}>
          <Text style={{
            fontSize: 16,
            color: COLORS.white
            }}>Already have an account ?</Text>
           <Pressable
             onPress={() => navigation.navigate("Login")}
            >
          <Text style={{
            fontSize: 16,
            color: COLORS.white,
            fontWeight: "bold",
            marginLeft: 4
           }}>Login</Text>
           </Pressable>

          </View>  
        </View>
     </View>      
   </LinearGradient>
  )
}

export default Welcome