import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddEventButton from '../components/AddEventButton';
import Day from '../components/Day';
import { useIsFocused } from '@react-navigation/native';
import AlertNotification from '../components/AlertNotification';

const CalendarScreen = () => {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [events, setEvents] = useState({});
    const [markedDates, setMarkedDates] = useState({});
    const [showAlert, setShowAlert] = useState(false);
    const isFocused = useIsFocused();
    const [handledEvents, setHandledEvents] = useState(new Set());

    useEffect(() => {
        if (isFocused) {
            loadEvents();
        }
    }, [isFocused]);

    useEffect(() => {
      const timer = setInterval(() => {
          const now = new Date();
          Object.values(events).flat().forEach(event => {
              const eventTime = new Date(event.eventDateTime);
              const eventID = `${eventTime.getHours()}:${eventTime.getMinutes()}`; // Unique ID per time

              if (now > eventTime && !handledEvents.has(eventID)) {
                  setShowAlert(true);
                  handledEvents.add(eventID); // Mark this event time as handled
                  setHandledEvents(new Set(handledEvents));
              }
          });
      }, 10000);

      return () => clearInterval(timer);
  }, [events, handledEvents]);

  const onCloseAlert = () => {
      setShowAlert(false);
  };


    const loadEvents = async () => {
        try {
            const storedEvents = await AsyncStorage.getItem('@events');
            if (storedEvents) {
                const newEvents = JSON.parse(storedEvents);
                setEvents(newEvents);
                updateCalendarMarks(newEvents);
            }
        } catch (error) {
            console.error('Error loading events:', error);
        }
    };

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
      const newMarkedDates = Object.keys(events).reduce((acc, date) => ({
          ...acc, [date]: { marked: true, dotColor: 'blue' }
      }), {});
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
                markedDates={markedDates}
            />
            <AddEventButton onAddEvent={handleAddEvent} />
            <Day selectedDate={selectedDate} events={events[selectedDate] || []} />
            <AlertNotification show={showAlert} onClose={onCloseAlert} />
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
