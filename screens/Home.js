import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import COLORS from '../constants/colors';
import { db, auth } from '../firebase/firebase';
import { doc, setDoc ,Timestamp, collection, addDoc} from "firebase/firestore"; 
//import { useAuth } from '../firebase/auth';
import { getAuth, onAuthStateChanged } from "firebase/auth";




const Home = () => {
  const [temperature, setTemperature] = useState();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  //const { authUser } = useAuth();
  const auth = getAuth();
  const user = auth.currentUser;
  

  const onChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios'); // If iOS, keep the picker open
    setSelectedDate(selectedDate || new Date()); // Set new date or default to current
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  

  const handleSubmit = async () => {
    
    if (!temperature) {
      Alert.alert('Input Required', 'Please enter your temperature.');
      return;
    }

    const tempValue = parseFloat(temperature);
    if (isNaN(tempValue)) {
      Alert.alert('Invalid Temperature', 'Please enter a valid temperature.');
      return;
    }

  
      if (user) {
        const uid = user.uid;
        try {
          await  addDoc(collection(db,'temperatures'), {
             Temperature: temperature,
             Date: Timestamp.fromDate(selectedDate),
             uid: uid,
            })
          Alert.alert('Temperature Add ');
          setTemperature(''); // Clear the temperature input
          setSelectedDate(new Date()); // Optionally reset the date 
        } catch (error) {
          Alert.alert('Error', error.message);
          console.error("Error writing document: ", error);
          }
    
      } else {
        Alert.alert('No User', 'No user is currently signed in.');
      }
     
    };

  return (
    <View style={styles.container}>
    <Text style={styles.header}>Add Measurement</Text>
      <Text style={styles.label}>Enter your temperature:</Text>
      <TextInput
        style={styles.input}
        value={temperature}
        onChangeText={setTemperature}
        type = "number"
        placeholder="Enter temperature"
        keyboardType="default"
      />
      
      <Text style={styles.label}>Select Date:</Text>
      <TouchableOpacity onPress={showDatepicker} style={styles.input}>
        <Text style={styles.dateText}>
          {selectedDate.toLocaleDateString()}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="calendar"
          onChange={onChange}
        />
      )}

      <Button
        title="Submit"
        onPress={handleSubmit}
        color={COLORS.secondary}
        style={{
          marginTop: 18,
          marginBottom: 4,
      }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 28,
    textAlign: 'left',
    color: COLORS.secondary,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: COLORS.secondary,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 20,
    borderRadius: 4,
    justifyContent: 'center',
  },
  dateText: {
    fontSize: 16,
  },
});

export default Home;
