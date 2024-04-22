import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
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
        if (isFocused) {
            loadEvents();
        }
    }, [isFocused]);

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
    
                    combinedEvents[date] = [...combinedEvents, workout]
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

    const handleAddEvent = (eventData) => {
        const { description, eventDateTime, wType } = eventData;
        if (!eventDateTime) {
            console.error('Event date-time is undefined.');
            return;
        }
        const datePart = eventDateTime.split(' ')[0];
        if (!datePart) {
            console.error('Invalid or undefined date part in eventDateTime.');
            return;
        }
        const newEvents = { ...events, [datePart]: [...(events[datePart] || []), eventData] };
        setEvents(newEvents);
        AsyncStorage.setItem('@events', JSON.stringify(newEvents)).then(() => {
            updateCalendarMarks(newEvents);
        }).catch(err => console.error('Failed to save events:', err));
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
            <Day selectedDate={selectedDate} events={workoutsEvents[selectedDate] || []} />
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
