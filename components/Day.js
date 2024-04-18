import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Event = ({ event }) => {
    const eventTime = new Date(event.combinedStart).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const navigation = useNavigation();

    return (
      <View style={[styles.event, { top: event.top, height: event.height }]}>
        <Text style={{ color: 'white' }} onPress={() => navigation.navigate("Past Workout", {workout: event})} >{eventTime}  {event.wType}</Text>
      </View>
    );
  };
  
  
const Day = ({ selectedDate, events }) => {
    const [ data, setData ] = useState([])

    const fetchData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('savedWorkouts');
            if (jsonValue !== null) {
                const parsedData = JSON.parse(jsonValue);
                console.log("ParsedData", parsedData)
                setData(parsedData);
            }else{
                console.log("Nothing found")
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

  const selectedDateEvents = data.filter(event => {
    const eventDate = new Date(event.combinedStart);
    const eventDateString = eventDate.toISOString().split('T')[0];
    return eventDateString === selectedDate;
  });


  const sortedEvents = selectedDateEvents.sort((a, b) => new Date(a.combinedStart) - new Date(b.combinedStart));


  const groupEventsByTime = (events) => {
    const groupedEvents = [];
    let currentGroup = [];
    let currentEndTime = null;
  
    events.forEach((event) => {
      const eventTime = new Date(event.combinedStart);
      
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
