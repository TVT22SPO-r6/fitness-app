import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddEventButton from '../components/AddEventButton';
import Day from '../components/Day';
import { useIsFocused } from '@react-navigation/native';

const CalendarScreen = () => {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [events, setEvents] = useState({});
    const [workoutsEvents, setWorkoutsEvents] = useState({})
    const [markedDates, setMarkedDates] = useState({});
    const isFocused = useIsFocused();

  useEffect(() => {
    if(isFocused){
        loadEvents();
    }
  }, [isFocused]);

    const handleEventChange = async () => {
        loadEvents()
    }

    const loadEvents = async () => {
        try {
            const storedEvents = await AsyncStorage.getItem('@events');
            const storedWorkouts = await AsyncStorage.getItem('savedWorkouts')
            const combinedEvents = makeEvents(
                storedEvents ? JSON.parse(storedEvents) : {},
                storedWorkouts ? JSON.parse(storedWorkouts) : []
            )
            setWorkoutsEvents(combinedEvents)
            updateCalendarMarks(combinedEvents)
        } catch (error) {
            console.error('Error loading events:', error);
        }
    };

    const makeEvents = (eventData, workoutData) => {
        var combinedEvents = {}
        
        if(workoutData.length !== 0){
            workoutData.forEach(workout => {
                const date = workout.combinedStart.split("T")[0]
                if(date in combinedEvents){
    
                    combinedEvents[date] = [...combinedEvents[date], workout]
                }else{
    
                    combinedEvents[date] = [workout]
                }
            })
        }
    
        if(JSON.stringify(eventData) !== "{}"){
            setEvents(eventData)
            Object.keys(eventData).forEach(date => {
                eventData[date].forEach(event => {
                    if(JSON.stringify(combinedEvents) === "{}"){
                        combinedEvents[date] = [event]
                    }else{
                        combinedEvents[date] ? combinedEvents[date] = [...combinedEvents[date], event] : combinedEvents[date] = [event]
                    }
                })
            })
        }
    
        return combinedEvents
    }

  

  const handleAddEvent = async (description, eventDateTime, workoutType) => {
    const newEvents = { ...events, [eventDateTime.split(' ')[0]]: [...(events[eventDateTime.split(' ')[0]] || []), { description, eventDateTime, workoutType }] };
    setEvents(newEvents);
    await AsyncStorage.setItem('@events', JSON.stringify(newEvents));
    updateCalendarMarks(newEvents);
    loadEvents()
  };

    const updateCalendarMarks = (events) => {
        const newMarkedDates = {};
        Object.keys(events).forEach(date => {
            if (events[date] && events[date].length > 0) {
                newMarkedDates[date] = { marked: true };
            }
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
            <Day onEventChange={handleEventChange} selectedDate={selectedDate} events={workoutsEvents[selectedDate] || []} />
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
