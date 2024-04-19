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
      if (storedEvents) {
        const loadedEvents = JSON.parse(storedEvents);
        setEvents(loadedEvents);
        updateCalendarMarks(loadedEvents);
      }
    } catch (error) {
      console.error('Error loading events:', error);
    }
  };

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

{/*

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
      const combinedEvents = makeEvents(
        storedEvents ? JSON.parse(storedEvents) : {},
        storedWorkouts ? JSON.parse(storedWorkouts) : []
      );
      setEvents(combinedEvents);
      updateCalendarMarks(combinedEvents);
    } catch (error) {
      console.error('Error loading events:', error);
    }
  };

  const makeEvents = (eventData, workoutData) => {
    var combinedEvents = {};
    
    if (workoutData && workoutData.forEach) {
      workoutData.forEach(workout => {
        const date = workout.combinedStart.split("T")[0];
        if (combinedEvents[date]) {
          combinedEvents[date] = [...combinedEvents[date], workout];
        } else {
          combinedEvents[date] = [workout];
        }
      });
    }

    if (eventData && typeof eventData === 'object') {
      Object.keys(eventData).forEach(date => {
        if (eventData[date].forEach) {
          eventData[date].forEach(event => {
            if (combinedEvents[date]) {
              combinedEvents[date] = [...combinedEvents[date], event];
            } else {
              combinedEvents[date] = [event];
            }
          });
        }
      });
    }

    return combinedEvents;
  };

  const handleAddEvent = async (description, eventDateTime) => {
    const dateKey = eventDateTime.split(' ')[0];
    const newEvents = { ...events, [dateKey]: [...(events[dateKey] || []), { description, eventDateTime }] };
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
*/}
