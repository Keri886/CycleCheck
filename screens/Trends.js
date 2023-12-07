import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity,Alert , Pressable } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
//npm install react-native-gifted-charts react-native-svg
import COLORS from '../constants/colors';
import { db, auth } from '../firebase/firebase';
import { deleteDoc, doc ,Timestamp, collection, query, where, getDocs, orderBy,onSnapshot} from "firebase/firestore"; 
//import { useAuth } from '../firebase/auth';

const Trends = () => {
    const [userData, setUserData] = useState([]);
    
    
    useEffect(()=> {
      const q = query(collection(db, "temperatures"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
       const userData = [];
       querySnapshot.forEach((doc) => {
        const data = doc.data();
        const date = data.Date?.toDate(); // Convert Timestamp to JavaScript Date object
        userData.push({
        id: doc.id,
        date: date, // Keep the Date object to use in toLocaleDateString
        temperature: data.Temperature,
      });
    });
        setUserData(userData)
       console.log("userData: ", userData.join(", "));
      });
      return () => unsubscribe();
    },[]);

    const handleDelete = async (id) => {
      // Confirm deletion with the user before proceeding
      Alert.alert(
        "Delete Record",
        "Are you sure you want to delete this record?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "OK", onPress: async () => {
              try {
                await deleteDoc(doc(db, "temperatures", id));
                // Update state to remove the item from the list
                setUserData(currentUserData => currentUserData.filter(item => item.id !== id));
              } catch (error) {
                console.error("Error removing document: ", error);
                Alert.alert("Error", "Could not delete the record.");
              }
            }
          }
        ]
      );
    };
    
  // Render item for FlatList
 const renderItem = ({ item }) => (
  <View style={styles.dataPoint}>
    <View style={styles.dataInfo}>
      <Text style={styles.dateText}>Date: {item.date?.toLocaleDateString()}</Text>
      <Text style={styles.tempText}>Temperature: {item.temperatures}</Text>
    </View>
    <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
      <Text>Delete</Text>
    </TouchableOpacity>
  </View>
);

return (
  <View style={styles.container}>
    <Text style={styles.header}>Measurements</Text>
    {/* Chart here */}
    <FlatList
        data={userData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
  </View>
);
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  dataPoint: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  deleteButton: {
    color: COLORS.secondary,
    // Style for your delete button
  },
});


export default Trends