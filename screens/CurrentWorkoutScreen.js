import React, { useState, useEffect } from 'react';
import { Text, View, Button, StyleSheet } from "react-native";
import { useWorkout } from '../components/WorkoutContext';
import { useRoute } from '@react-navigation/native';

function formatDate(dateString) {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
}

function formatTime(timeString) {
    const date = new Date(timeString);
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
}

function CurrentWorkoutScreen() {
    const route = useRoute();
    const { currentWorkout } = useWorkout();
    const [timer, setTimer] = useState(0);
    const [intervalId, setIntervalId] = useState(null);
    const [timerActive, setTimerActive] = useState(false);
    const workout = route.params?.workout || currentWorkout;

    useEffect(() => {
        const navWorkout = route.params?.workout;
        console.log("Workout on screen received from navigation:", navWorkout);
        if (navWorkout) {
            console.log("Using workout from navigation");
            updateCurrentWorkout(navWorkout);
        }
    }, [route.params?.workout]);

    useEffect(() => {
        if (workout && workout.combinedStart && workout.combinedEnd) {
            const duration = new Date(workout.combinedEnd).getTime() - new Date(workout.combinedStart).getTime();
            setTimer(duration);
        }
    }, [workout]);


    function formatDate(dateString) {
        if (!dateString) return 'Date not available';  // Handle undefined or null dateString
    
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return 'Invalid date';  // Check if the date is invalid
        console.log("Received workout date:", workout.date);
    
        return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
    }

    function formatTime(timeString) {
        if (!timeString) return 'Time not available';  // Handle undefined or null timeString
    
        const time = new Date(timeString);
        if (isNaN(time.getTime())) return 'Invalid time';  // Check if the time is invalid
    
        return `${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}`;
    }

    const startTimer = () => {
        if (!timerActive && timer > 0) {
            const id = setInterval(() => {
                setTimer((prevTimer) => {
                    const newTime = prevTimer - 1000;
                    if (newTime <= 0) {
                        clearInterval(id);
                        setTimerActive(false);
                        return 0;
                    }
                    return newTime;
                });
            }, 1000);
            setIntervalId(id);
            setTimerActive(true);
        }
    };


    const stopTimer = () => {
        if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
            setTimerActive(false);
        }
    };

    const resetTimer = () => {
        stopTimer();
        if (workout && workout.combinedStart && workout.combinedEnd) {
            const duration = new Date(workout.combinedEnd).getTime() - new Date(workout.combinedStart).getTime();
            setTimer(duration);
        }
    };

    if (!currentWorkout) {
        return <View style={styles.container}><Text>No current workout data available.</Text></View>;
    }

    const formattedTime = Math.max(0, Math.floor(timer / 1000));
    const hours = Math.floor(formattedTime / 3600);
    const minutes = Math.floor((formattedTime % 3600) / 60);
    const seconds = formattedTime % 60;

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Current Workout</Text>
            <Text>Type: {workout.wType}</Text>
            <Text>Date: {formatDate(workout.combinedStart)}</Text>
            <Text>Start Time: {formatTime(workout.combinedStart)}</Text>
            <Text>End Time: {formatTime(workout.combinedEnd)}</Text>
            {['pushups', 'weights'].includes(workout.wType) && <Text>Reps: {workout.reps}</Text>}
            {['biking', 'running'].includes(workout.wType) && <Text>Distance: {workout.distance} km</Text>}
            {workout.wType === 'weights' && <Text>Weight: {workout.weight} kg</Text>}
            <Text>Intensity of Workout: {workout.intensity} </Text>
            <Text>Notes: {workout.notes}</Text>
            <Text>Timer: {`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}</Text>
            <Button onPress={startTimer} title="Start Timer" />
            <Button onPress={stopTimer} title="Stop Timer" />
            <Button onPress={resetTimer} title="Reset Timer" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
