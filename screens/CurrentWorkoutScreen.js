import React, { useState, useEffect } from 'react';
import { Text, View, Button, StyleSheet } from "react-native";
import { useWorkout } from '../components/WorkoutContext';

function formatDate(dateString) {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
}

function formatTime(timeString) {
    const date = new Date(timeString);
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
}

function CurrentWorkoutScreen() {
    const { currentWorkout } = useWorkout();
    const [timer, setTimer] = useState(0);
    const [intervalId, setIntervalId] = useState(null);
    const [timerActive, setTimerActive] = useState(false);

    useEffect(() => {
        if (currentWorkout && currentWorkout.startTime && currentWorkout.endTime) {
            const startTime = new Date(currentWorkout.startTime).getTime();
            const endTime = new Date(currentWorkout.endTime).getTime();
            setTimer(endTime - startTime);
        }
    }, [currentWorkout]);

    const startTimer = () => {
        if (!timerActive && timer > 0) {
            const id = setInterval(() => {
                setTimer((prevTimer) => {
                    if (prevTimer <= 1000) {
                        clearInterval(id);
                        setTimerActive(false);
                        return 0;
                    }
                    return prevTimer - 1000;
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
        stopTimer();  // Ensure timer is stopped before resetting
        if (currentWorkout && currentWorkout.startTime && currentWorkout.endTime) {
            const startTime = new Date(currentWorkout.startTime).getTime();
            const endTime = new Date(currentWorkout.endTime).getTime();
            setTimer(endTime - startTime);
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
            <Text>Type: {currentWorkout.type}</Text>
            <Text>Date: {formatDate(currentWorkout.date)}</Text>
            <Text>Start Time: {formatTime(currentWorkout.startTime)}</Text>
            <Text>End Time: {formatTime(currentWorkout.endTime)}</Text>
            <Text>Distance: {currentWorkout.num} km</Text>
            <Text>Notes: {currentWorkout.notes}</Text>
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
