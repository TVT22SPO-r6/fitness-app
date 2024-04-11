// HomeScreen.js
import { useLayoutEffect } from "react";
import { Button, Text, View, StyleSheet, SafeAreaView } from "react-native";
import WorkoutPlanScreen from "./WorkoutPlanScreen";
import AlertNotification from "./Alert";

export default function HomeScreen({navigation}){
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.screenText}>Home Screen</Text>
            <Button title="Workout plan" onPress={() => navigation.navigate("Workout Plan")}/>
            <Button title="New Workout" onPress={() => navigation.navigate("New Workout")}/>
            <Button title="Current Workout" onPress={() => navigation.navigate("Current Workout")}/>
            <Button title="Calendar" onPress={() => navigation.navigate("Calendar")}/>
            <Button title="Past Workout(s)" onPress={() => navigation.navigate("Past Workout")}/>
            <Button title="Add training routine" onPress={() => navigation.navigate("Training Routine")}/>
            <Button title="Clock" onPress={() => navigation.navigate("Clock")}/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    screenText: {
        fontSize: 20,
        marginBottom: 20,
    }
});