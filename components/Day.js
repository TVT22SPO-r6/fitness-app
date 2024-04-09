import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Event = ({ event }) => {
    const eventTime = new Date(event.eventDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
    return (
      <View style={[styles.event, { top: event.top, height: event.height }]}>
        <Text style={{ color: 'white' }}>{eventTime}  {event.description}</Text>
      </View>
    );
  };
  
  
const Day = ({ selectedDate, events }) => {
  
  const selectedDateEvents = events.filter(event => {
    const eventDate = new Date(event.eventDate);
    const eventDateString = eventDate.toISOString().split('T')[0];
    return eventDateString === selectedDate;
  });


  const sortedEvents = selectedDateEvents.sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));


  const groupEventsByTime = (events) => {
    const groupedEvents = [];
    let currentGroup = [];
    let currentEndTime = null;
  
    events.forEach((event) => {
      const eventTime = new Date(event.eventDate);
      
      if (!currentEndTime || eventTime <= currentEndTime) {
   
        currentGroup.push(event);
        currentEndTime = eventTime;
      } else {
      
        groupedEvents.push(currentGroup);
        currentGroup = [event];
        currentEndTime = eventTime;
      }
    });
    
    if (currentGroup.length > 0) {
      groupedEvents.push(currentGroup);
    }
    
    return groupedEvents;
  };

  const renderEvents = () => {
    
    const groupedEvents = groupEventsByTime(sortedEvents);

   
    return groupedEvents.map((group, groupIndex) => (
      <View key={groupIndex} style={styles.eventGroup}>
        {group.map((event, eventIndex) => (
          <Event key={eventIndex} event={event} />
        ))}
      </View>
    ));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.date}>{formatDate(selectedDate)}</Text>
      <View style={styles.eventsContainer}>
        {renderEvents()}
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
    position: 'relative',
    width: '100%',
  },
  eventGroup: {
    flexDirection: 'column', 
  },
  event: {
    backgroundColor: '#1E90FF',
    padding: 5,
    borderRadius: 5,
    width: '90%',
    marginLeft: '5%',
    marginBottom: 5,
  },
});

export default Day;
