import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useWorkout } from '../components/WorkoutContext';

const Day = ({ selectedDate, events }) => {
    const navigation = useNavigation();
    const { updateCurrentWorkout } = useWorkout();

    const handleStartWorkout = (event) => {
        updateCurrentWorkout(event);
        navigation.navigate('Current Workout');
    };

    const renderEvents = () => events.map((event, index) => (
        <View key={index} style={styles.event}>
            <Text style={styles.eventText}>
                Time: {new Date(event.eventDateTime || event.combinedStart).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                {'\n'}Description: {event.description}
            </Text>
            <Button
                title="Start Workout"
                onPress={() => handleStartWorkout(event)}
            />
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
