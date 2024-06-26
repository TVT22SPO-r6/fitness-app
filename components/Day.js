import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { workoutColors } from '../components/constants';

const Day = ({ onEventChange, selectedDate, events, workoutColors }) => {
    const navigation = useNavigation();

    const handleStartWorkout = (workout) => {
       navigation.navigate('Current Workout', {workout});
    };

    const handleDeleteEvent = async (event) => {
        try {
            const storedEvents = await AsyncStorage.getItem('@events');
            if (storedEvents) {
                let eventsObj = JSON.parse(storedEvents);
                const eventDateKey = new Date(event.eventDateTime).toISOString().split('T')[0];
                eventsObj[eventDateKey] = eventsObj[eventDateKey].filter(e => e.eventDateTime !== event.eventDateTime);
                await AsyncStorage.setItem('@events', JSON.stringify(eventsObj));
                Alert.alert('Event deleted successfully');
            }
        } catch (error) {
            console.error("Failed to delete event:", error);
        }
        onEventChange()
    };

    const renderEvents = () => events.map((event, index) => (
        <View key={index} style={[styles.event, { backgroundColor: workoutColors[event.workoutType] || '#1E90FF' }]}>
            <Text style={styles.eventText} onPress={() => {event.combinedStart !== undefined ? navigation.navigate("Past Workout", {workout: event}) : {}}}>
                Time: {event.eventDateTime !== undefined ? new Date(event.eventDateTime || event.combinedStart).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                : new Date(event.combinedStart).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                {'\n'}Description: {event.description !== undefined ? event.description : event.wType}
            </Text>
            
          {event.combinedStart === undefined ? (
            <>
            <Button
                title="Start Workout"
                onPress={() => handleStartWorkout(event)}
            />
            <Button
                title="Delete Event"
                onPress={() => handleDeleteEvent(event)}
            />
            </>
            ):(
            <></>
            )}
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
