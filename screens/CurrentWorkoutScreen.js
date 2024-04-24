import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform } from "react-native";
import {Card, Button, TextInput} from "react-native-paper"
import { useRoute, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function CurrentWorkoutScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const {workout} = route.params;
    const [timer, setTimer] = useState(0);
    const [intervalId, setIntervalId] = useState(null);
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
                wType: workout.workoutType,
                date: startTime.toISOString(), 
                startTime: startTime.toISOString(),
                endTime: endTime.toISOString(),
                desc: workout?.description
            })
        } catch (error) {
            console.error("Failed to end workout:", error);
        }
    };
    

    const formatTime = (timer) => {
        const hours = Math.floor(timer / 3600);
        const minutes = Math.floor((timer % 3600) / 60);
        const seconds = timer % 60;
    
        const formattedHours = hours.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = seconds.toString().padStart(2, '0');
    
        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    }

    const checkWType = (workout) => {
        if (workout.workoutType === "running") {
          return styles.runningColor;
        } else if (workout.workoutType === "biking") {
          return styles.bikingColor;
        } else if (workout.workoutType === "weights") {
          return styles.weightsColor;
        } else if (workout.workoutType === "pushups") {
          return styles.pushupsColor;
        } else if (workout.workoutType === "squats") {
          return styles.squatsColor;
        } else if (workout.workoutType === "muscles") {
          return styles.muscleColor;
        } else {
          return { backgroundColor: "grey" };
        }
      }

    return (
        
        <View style={[styles.cardContent, checkWType(workout)]}>
            <Text style={styles.typeText}> {workout?.workoutType.charAt(0).toUpperCase() + workout?.workoutType.slice(1)}</Text>
            <Text style={styles.timerText}>{formatTime(timer)}</Text>
            {workout.description && <TextInput 
                label='Notes' 
                multiline={true} 
                value={workout.description}
                disabled='true'
                mode='flat'
                underlineColor='black'
                backgroundColor='white'
                textColor='black'
            />}
            <View style={styles.buttonContainer}>
                {!workoutStarted && <Button type='contained' buttonColor='tomato' textColor='white' onPress={startTimer} >Start Workout</Button>}
                {workoutStarted && <Button type='contained' buttonColor='tomato' textColor='white' onPress={endWorkout} >End Workout</Button>}
            </View>
        </View>
        
    );
}

const styles = StyleSheet.create({
    
    cardContent: {
        flex: 1,
        justifyContent: 'space-between',
        margin: 20,
        padding:20,
        borderRadius: 20,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 5,
            },
        }),
    },
    typeText: {
        marginTop: 10, 
        fontSize: 24, 
        alignSelf: 'center',
        fontWeight: 'bold',
    },
    timerText: {
        fontSize: 50, 
        textAlign: 'center', 
        marginTop: 20, 
        alignSelf: 'center'
    },
    notesText: {
        textAlign: 'center',
        marginBottom: 20, 
        alignSelf: 'center'
    },
    buttonContainer: {
        width: '100%', 
        alignSelf: 'center'
    },
    bikingColor: {
      backgroundColor: "#ff8282"
    },
    runningColor: {
      backgroundColor: "#64b3ff"
    },
    weightsColor: {
      backgroundColor: "#9acd32"
    },
    pushupsColor: {
      backgroundColor: "#ffd700"
    },
    squatsColor: {
      backgroundColor: "#dda0dd"
    },
    muscleColor: {
      backgroundColor: "#ffa500"
    },
});

export default CurrentWorkoutScreen;
