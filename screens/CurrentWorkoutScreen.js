import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from "react-native";
import { useWorkout } from '../components/WorkoutContext';
import { useRoute, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function CurrentWorkoutScreen() {
    const navigation = useNavigation();
    const { currentWorkout } = useWorkout();
    const route = useRoute();
    const [timer, setTimer] = useState(0);
    const [intervalId, setIntervalId] = useState(null);
    const workout = route.params?.workout || currentWorkout;
    const [workoutStarted, setWorkoutStarted] = useState(false);
    const [startTime, setStartTime] = useState(null);

    // Function to start the timer
    const startTimer = () => {
        if (!intervalId) {
            const id = setInterval(() => {
                setTimer(prevTimer => prevTimer + 1); // Use previous state to increment
            }, 1000);
            setIntervalId(id);
            setWorkoutStarted(true)
            setStartTime(new Date())
        }
    };
    
    const stopTimer = () => {
        clearInterval(intervalId);
        setIntervalId(null);
    };

    const resetTimer = () => {
        stopTimer();
        setTimer(0);
    };

    const endWorkout = async () => {
        try {
            const endTime = new Date();
            resetTimer();
            const events = await AsyncStorage.getItem('@events');
            if (events) {
                let eventsObj = JSON.parse(events);
                console.log("Retrieved events:", eventsObj);
                const eventDateKey = new Date(workout.eventDateTime).toISOString().split('T')[0];
                if (eventsObj[eventDateKey]) {
                    eventsObj[eventDateKey] = eventsObj[eventDateKey].filter(e => e.eventDateTime !== workout.eventDateTime);
                    if (eventsObj[eventDateKey].length === 0) {
                        delete eventsObj[eventDateKey];
                    }
    
                    await AsyncStorage.setItem('@events', JSON.stringify(eventsObj));
                } else {
                    console.log("No events found for date:", eventDateKey);
                }
            }
            navigation.navigate('New Workout', {
                wType: workout.wType,
                date: startTime.toISOString(), 
                startTime: startTime.toISOString(),
                endTime: endTime.toISOString(),
                desc: workout?.description
            })
        } catch (error) {
            console.error("Failed to end workout:", error);
        }
    };
    

    const formatTime = () => {
        if (timer < 60) {
            return `${timer} seconds`;
        }
        return `${(timer / 60).toFixed(2)} minutes`;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Current Workout</Text>
            <Text>Type: {workout?.wType}</Text>
            <Text>Notes: {workout?.description}</Text>
            <Text>Timer: {formatTime()}</Text>
            {!workoutStarted && <Button title="Start Workout" onPress={startTimer} />}
            {workoutStarted && <Button title="End Workout" onPress={endWorkout} />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10
    }
});

export default CurrentWorkoutScreen;
