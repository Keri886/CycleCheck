import { View, Text, Image, Pressable, TextInput, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import React, { useEffect,useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from '../constants/colors';
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox"
// need -npx expo install expo-checkbox
import Button from '../components/Button';
import { db,auth } from '../firebase/firebase';
import {createUserWithEmailAndPassword} from 'firebase/auth'; 
import { doc, setDoc } from "firebase/firestore"; 

const Signup = ({ navigation }) => {
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

 


// Help create email and password and send to firebase
    const handleSignUp = () => {
    
        createUserWithEmailAndPassword(auth,email, password)
          .then(userCredentials => {
            const user = userCredentials.user;
             setDoc(doc(db, "users", user.uid), {
                Name: username,
                Email: email,
                password: password,

              });
              
            console.log('Registered with:', user.email);
            navigation.navigate('MainApp');
        
          })
          .catch(error => alert(error.message))
      }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={{ flex: 1, marginHorizontal: 22 }}>
                <View style={{ marginVertical: 22 }}>
                    <Text style={{
                        fontSize: 22,
                        fontWeight: 'bold',
                        marginVertical: 12,
                        color: COLORS.black
                    }}>
                        Create Account
                    </Text>


    {/*Input Username  */}                
    </View>

<View style={{ marginBottom: 12 }}>
    <Text style={{
        fontSize: 16,
        fontWeight: 400,
        marginVertical: 8
    }}>Username</Text>

    <View style={{
        width: "100%",
        height: 48,
        borderColor: COLORS.black,
        borderWidth: 1,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: 22
    }}>
        <TextInput
            placeholder='Enter your username'
            placeholderTextColor={COLORS.black}
            value={username}
            onChangeText={text => setUsername(text)}
            keyboardType='email-address'
            style={{
                width: "100%"
            }}
        />
    </View>
</View>

    {/*Input Email  */}                
                

                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Email address</Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22
                    }}>
                        <TextInput
                            placeholder='Enter your email address'
                            placeholderTextColor={COLORS.black}
                            value={email}
                            onChangeText={text => setEmail(text)}
                            keyboardType='email-address'
                            style={{
                                width: "100%"
                            }}
                        />
                    </View>
                </View>

    {/*Input Password */}   

                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Password</Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22
                    }}>
                        <TextInput
                            placeholder='Enter your password'
                            placeholderTextColor={COLORS.black}
                            value={password}
                            onChangeText={text => setPassword(text)}
                            secureTextEntry={isPasswordShown}
                            style={{
                                width: "100%"
                            }}
                        />

                        <TouchableOpacity
                            onPress={() => setIsPasswordShown(!isPasswordShown)}
                            style={{
                                position: "absolute",
                                right: 12
                            }}
                        >
                            {
                                isPasswordShown == true ? (
                                    <Ionicons name="eye-off" size={24} color={COLORS.black} />
                                ) : (
                                    <Ionicons name="eye" size={24} color={COLORS.black} />
                                )
                            }

                        </TouchableOpacity>
                    </View>
                </View> 
    {/*check the term and conditions */} 
                <View style={{
                    flexDirection: 'row',
                    marginVertical: 6
                }}>
                    <Checkbox
                        style={{ marginRight: 8 }}
                        value={isChecked}
                        onValueChange={setIsChecked}
                        color={isChecked ? COLORS.primary : undefined}
                    />

                    <Text>I agree to the terms and conditions</Text>
                </View>

    {/* Sign Up Button  */} 

                <Button
                    title="Sign Up"
                    onPress={handleSignUp}
                    style={{
                        marginTop: 18,
                        marginBottom: 4,
                    }}
                />

                <View style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginVertical: 22
                }}>
                    <Text style={{ fontSize: 16, color: COLORS.black }}>Already have an account</Text>
                    <Pressable
                        onPress={() => navigation.navigate("Login")}
                    >
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.primary,
                            fontWeight: "bold",
                            marginLeft: 6
                        }}>Login</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Signup