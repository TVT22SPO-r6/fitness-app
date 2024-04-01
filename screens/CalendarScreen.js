import React, { useState } from 'react';
import { View, StyleSheet} from 'react-native';
import { Calendar } from 'react-native-calendars';

const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]); // Muunnetaan päivämäärä merkkijonoksi

  return (
    <View style={styles.container}>
      <Calendar
        current={selectedDate}
        onDayPress={(day) => setSelectedDate(day.dateString)} 
        monthFormat={'MMMM yyyy'}
        firstDay={1}
        enableSwipeMonths={true}
        hideExtraDays={false}
        hideDayNames={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
});

export default CalendarScreen;
