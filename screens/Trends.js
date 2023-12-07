import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity,Alert , Pressable, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
//npm install react-native-gifted-charts react-native-svg
import COLORS from '../constants/colors';
import { db, auth } from '../firebase/firebase';
import { deleteDoc, doc ,Timestamp, collection, query, where, getDocs, orderBy,onSnapshot} from "firebase/firestore"; 
//import { useAuth } from '../firebase/auth';


const Trends = () => {
    const [userData, setUserData] = useState([]);
    //const auth = getAuth();
    //const user = auth.currentUser;
    
    useEffect(()=> {
     // if (user) {
        //const uid = user.uid;
      const q = query(collection(db, "temperatures" ));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
       const userData = [];
       querySnapshot.forEach((doc) => {
        const data = doc.data();
        console.log(data);
        const date = data.Date?.toDate(); // Convert Timestamp to JavaScript Date object
        // Convert the temperature string to a floating-point number
        const temperature = parseFloat(data.Temperature);
        userData.push({
        id: doc.id,
        date: date, // Keep the Date object to use in toLocaleDateString
        temperature: data.Temperature,
      });
    });
      
        setUserData(userData)
        console.log("userData:", userData);
      });
      return () => unsubscribe();
 //   }
    },[]);

    const chartData = {

      labels: ["12/4", "12/5", "12/6", "12/7", "12/8", "12/9", "12/10"], 
      // Replace with 
      // labels: [userDate.Date]
      datasets: [
        {
          data: [36.6, 36.7, 36.5, 36.8, 36.5, 36.9, 37.0],
          // Peplace with 
          //data: [userDate.Temperature],
          color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
          strokeWidth: 2
        }
      ],
      legend: ["Temperature over the week"]
    };

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
      <Text style={styles.tempText}>Temperature: {item.temperature}</Text>
    </View>
    <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
      <Text>Delete</Text>
    </TouchableOpacity>
  </View>
);

return (
  <View style={styles.container}>
        <Text style={styles.header}>Report</Text>
                                                                   {/*Create Chart */}  
        <LineChart
        data={chartData}
        width={Dimensions.get('window').width - 20} // from react-native
        height={220}
        chartConfig={{
          backgroundColor: COLORS.primary,
          backgroundGradientFrom: COLORS.primary,
          backgroundGradientTo: COLORS.secondary,
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726"
          }
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />
 
    
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