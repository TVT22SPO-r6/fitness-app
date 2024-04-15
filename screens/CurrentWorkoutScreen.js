import React from 'react';
import { Text, View, StyleSheet } from "react-native";
import { useWorkout } from '../components/WorkoutContext'; // Adjust path as necessary

function formatDate(dateString) {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
}

function formatTime(timeString) {
    const time = new Date(timeString);
    return `${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}`;
}

export default function CurrentWorkoutScreen() {
    const { currentWorkout } = useWorkout(); // Using context to get the workout data

    if (!currentWorkout) {
        return <View style={styles.container}><Text>No current workout data available.</Text></View>;
    }

    return (
        <View style={styles.container}>
            <Text style={{fontSize: 20}}>Current Workout</Text>
            <Text>Type: {currentWorkout.type}</Text>
            <Text>Date: {formatDate(currentWorkout.date)}</Text>
            <Text>Start Time: {formatTime(currentWorkout.startTime)}</Text>
            <Text>End Time: {formatTime(currentWorkout.endTime)}</Text>
            <Text>Distance: {currentWorkout.num} km</Text>
            <Text>Notes: {currentWorkout.notes}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
