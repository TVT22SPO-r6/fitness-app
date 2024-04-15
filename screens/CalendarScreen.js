// CalendarScreen.js
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import AddEventButton from '../components/AddEventButton';
import Day from '../components/Day';

const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [events, setEvents] = useState([]);

  const handleAddEvent = (description, eventDateTime) => {
    const newEvent = { description, eventDate: eventDateTime };
    setEvents([...events, newEvent]);
    console.log('New event:', description, eventDateTime);
  };

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
      <AddEventButton onAddEvent={handleAddEvent} />
      <Day selectedDate={selectedDate} events={events} />
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
