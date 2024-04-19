import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddEventButton from '../components/AddEventButton';
import Day from '../components/Day';

const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [events, setEvents] = useState({});
  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const storedEvents = await AsyncStorage.getItem('@events');
      const storedWorkouts = await AsyncStorage.getItem('savedWorkouts');
      const combinedEvents = makeEvents(JSON.parse(storedEvents), JSON.parse(storedWorkouts))
      setEvents(combinedEvents)
      updateCalendarMarks(combinedEvents)
      /*if (storedEvents) {
        const loadedEvents = JSON.parse(storedEvents);
        setEvents(loadedEvents);
        updateCalendarMarks(loadedEvents);
      }*/
    } catch (error) {
      console.error('Error loading events:', error);
    }
  };

  const makeEvents = (eventData, workoutData) => {
    var combinedEvents = {}
    
    workoutData.forEach(workout => {
        const date = workout.combinedStart.split("T")[0]
        if(date in combinedEvents){
            combinedEvents[date] = [...combinedEvents, workout]
        }else{
            combinedEvents[date] = [workout]
        }
    })

    Object.keys(eventData).forEach(date => {
        eventData[date].forEach(event => {
            combinedEvents[date] = [...combinedEvents[date], event]
        })
    })

    return combinedEvents
  }

  const handleAddEvent = async (description, eventDateTime) => {
    const newEvents = { ...events, [eventDateTime.split(' ')[0]]: [...(events[eventDateTime.split(' ')[0]] || []), { description, eventDateTime }] };
    setEvents(newEvents);
    await AsyncStorage.setItem('@events', JSON.stringify(newEvents));
    updateCalendarMarks(newEvents);
  };

  const updateCalendarMarks = (events) => {
    const newMarkedDates = {};
    Object.keys(events).forEach(date => {
      newMarkedDates[date] = { marked: true };
    });
    setMarkedDates(newMarkedDates);
  };
  
  return (
    <View style={styles.container}>
      <Calendar
        current={selectedDate}
        onDayPress={(day) => setSelectedDate(day.dateString)}
        monthFormat={'MMMM yyyy'}
        firstDay={1}
        enableSwipeMonths={true}
        markedDates={{...markedDates, [selectedDate]: { ...markedDates[selectedDate], selected: true }}}
      />
      <AddEventButton onAddEvent={handleAddEvent} />
      <Day selectedDate={selectedDate} events={events[selectedDate] || []} />
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
