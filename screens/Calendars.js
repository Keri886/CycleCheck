import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Calendar } from 'react-native-calendars';

const Calendars = () => {
  const [markedDates, setMarkedDates] = useState({});

  const onDayPress = (day) => {
    const { dateString } = day;
    setMarkedDates((currentMarks) => {
      if (currentMarks[dateString]) {
        // Already marked, so unmark it
        const updatedMarks = { ...currentMarks };
        delete updatedMarks[dateString]; // Remove the mark for this day
        return updatedMarks;
      } else {
        // Not marked, so add a mark
        return {
          ...currentMarks,
          [day.dateString]: {
            selected: true,
            selectedColor: 'pink',
            // Use custom styles for larger circle or different styles
            customStyles: {
              container: {
                backgroundColor: 'pink',
                borderRadius: 20,
              },
              text: {
                color: 'white',
                fontWeight: 'bold',
              },
            },
          },
        };
      }
    });
  };

  return (
    <View style={styles.container}>
      <Calendar
        current={Date()}
        onDayPress={onDayPress}
        monthFormat={'MM/yyyy'}
        hideExtraDays={true}
        firstDay={1}
        enableSwipeMonths={true}
        markedDates={markedDates}
        markingType={'simple'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
    paddingTop: 10,
  },
});

export default Calendars;
