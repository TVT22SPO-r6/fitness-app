import React, { useState, useEffect, useEvents } from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import AddEventButton from "../components/AddEventButton";
import Day from '../components/Day'; // Adjust the path as necessary
import AlertNotification from '../components/AlertNotification'; // Adjust the path as necessary

const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [events, setEvents] = useState([]);
  const [notificationEvent, setNotificationEvent] = useState(null);

  // Add event and schedule a notification for it
  const handleAddEvent = (description, eventDateTime) => {
    const newEvent = { description, eventDate: eventDateTime };
    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);

    // Calculate the time until the event
    const eventTime = new Date(eventDateTime).getTime();
    const currentTime = new Date().getTime();
    const timeUntilEvent = eventTime - currentTime;

    console.log(`Event scheduled in ${timeUntilEvent} milliseconds`);

    if (timeUntilEvent > 0) {
      setTimeout(() => {
        console.log("Triggering notification for event:", description);
        setNotificationEvent(newEvent); // Show notification
        setTimeout(() => setNotificationEvent(null), 5000); // Hide after 5 seconds
      }, timeUntilEvent);
    }
  };

  useEffect(() => {
    // This useEffect is no longer necessary for scheduling
    // but kept if additional app-wide effects are needed.
  }, [events]);

  return (
    <View style={styles.container}>
      <Calendar
        current={selectedDate}
        onDayPress={(day) => setSelectedDate(day.dateString)}
      />
      <AddEventButton onAddEvent={handleAddEvent} />
      <Day selectedDate={selectedDate} events={events} />
      {notificationEvent && <AlertNotification />}
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