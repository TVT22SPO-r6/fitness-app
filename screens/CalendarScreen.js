import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddEventButton from '../components/AddEventButton';
import Day from '../components/Day';
import { useWorkout } from '../components/WorkoutContext';
import { useNavigation } from '@react-navigation/native';

const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [events, setEvents] = useState({});
  const [markedDates, setMarkedDates] = useState({});
  const { updateCurrentWorkout } = useWorkout();
  const navigation = useNavigation();
  
  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
        const storedEvents = await AsyncStorage.getItem('@events');
        const storedWorkouts = await AsyncStorage.getItem('savedWorkouts');
        if (storedEvents && storedWorkouts) {
            const eventData = JSON.parse(storedEvents);
            const workoutData = JSON.parse(storedWorkouts);
            const combinedEvents = makeEvents(eventData, workoutData);
            setEvents(combinedEvents);
            updateCalendarMarks(combinedEvents);
        } else {
        }
    } catch (error) {
        console.error('Error loading events:', error);
    }
};

  const handleStartWorkout = (workout) => {
    updateCurrentWorkout(workout);
    navigation.navigate('Current Workout');
};

const makeEvents = (eventData, workoutData) => {
  var combinedEvents = {};

  workoutData.forEach(workout => {
      const date = workout.combinedStart.split("T")[0];
      combinedEvents[date] = combinedEvents[date] ? [...combinedEvents[date], workout] : [workout];
  });

  Object.keys(eventData).forEach(date => {
      if (combinedEvents[date]) {
          combinedEvents[date] = [...combinedEvents[date], ...eventData[date]];
      } else {
          combinedEvents[date] = [...eventData[date]];
      }
  });

  return combinedEvents;
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
      <Day selectedDate={selectedDate} events={events[selectedDate] || []} onStartWorkout={handleStartWorkout} />
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
