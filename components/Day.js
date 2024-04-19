import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Day = ({ selectedDate, events }) => {
  const renderEvents = () => events.map((event, index) => (
    <View key={index} style={styles.event}>
      <Text style={styles.eventText}>
        Time: {new Date(event.eventDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        {'\n'}Description: {event.description}
      </Text>
    </View>
  ));

  return (
    <View style={styles.container}>
      <Text style={styles.date}>{new Date(selectedDate).toLocaleDateString('en-GB', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
      })}</Text>
      <View style={styles.eventsContainer}>
        {events.length > 0 ? renderEvents() : <Text>No Events</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  date: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  eventsContainer: {
    width: '100%',
  },
  event: {
    backgroundColor: '#1E90FF',
    padding: 10,
    borderRadius: 5,
    width: '90%',
    marginVertical: 5,
    marginLeft: '5%',
  },
  eventText: {
    color: 'white',
  }
});

export default Day;
