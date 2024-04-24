import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddEventButton from '../components/AddEventButton';
import Day from '../components/Day';
import { useIsFocused } from '@react-navigation/native';
import AlertNotification from '../components/AlertNotification';
import { workoutColors } from '../components/constants';

const CalendarScreen = () => {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [events, setEvents] = useState({});
    const [workoutsEvents, setWorkoutsEvents] = useState({})
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
    const newEvent = {
        description, 
        eventDateTime, 
        workoutType, // Ensure this data is correctly provided when the event is created
      };
    setEvents(newEvents);
    await AsyncStorage.setItem('@events', JSON.stringify(newEvents));
    updateCalendarMarks(newEvents);
    loadEvents()
  };

  const updateCalendarMarks = (events) => {
    const newMarkedDates = {};
    Object.keys(events).forEach(date => {
        let dots = [];
        let dotColor;

        if (events[date] && events[date].length > 0) {
            // Gather all event types for the day and apply the correct color
            events[date].forEach(event => {
                dotColor = workoutColors[event.workoutType] || '#000'; // Fallback color is black
                dots.push({ key: event.id, color: dotColor });
            });

            newMarkedDates[date] = {
                marked: true,
                dots: dots,  // Apply the dots array here
                selectedColor: dotColor, // Optional: sets the background color for the selected date
            };
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
            markedDates={markedDates}
        />
        <AddEventButton onAddEvent={handleAddEvent} />
        <ScrollView>
            <Day onEventChange={handleEventChange} selectedDate={selectedDate} events={workoutsEvents[selectedDate] || []} workoutColors={workoutColors} />
        </ScrollView>
    </View>
);
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f0f4f7',
      padding: 20,
    },
    calendarStyle: {
      borderWidth: 1,
      borderColor: '#d1e1df',
      borderRadius: 10,
      shadowOpacity: 0.1,
      shadowRadius: 4,
      shadowColor: '#000',
      shadowOffset: { height: 2, width: 0 },
      elevation: 3,
    },
    buttonStyle: {
      backgroundColor: '#4a90e2',
      borderRadius: 20,
      padding: 10,
      marginTop: 10,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    }
});

export default CalendarScreen;