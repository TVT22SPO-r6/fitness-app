import { useState } from "react";
import { Text, View, StyleSheet } from "react-native";

const infoText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

export default function PastWorkoutScreen(){
    const [testDate, testTime] = new Date().toISOString().split("T")

    const testWorkout = {
        title: "Running",
        workoutDate: testDate,
        workoutTime: testTime.slice(0, 5),
        info: {
            duration: "48:33",      // min:sec
            distance: "5 km",
            caloriesBurned: "1200 kcal"
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.titleBox}>
                <Text style={styles.titleFont} >{testWorkout.title}</Text>
                <Text>{testWorkout.workoutDate}</Text>
                <Text>{testWorkout.workoutTime}</Text>
            </View>
            <View style={styles.infoBox}>
                <Text style={styles.infoText}>
                    <Text style={{fontWeight: "bold"}}>Duration:   </Text>
                    <Text style={{textAlign: "right"}}>{testWorkout.info.duration}</Text>
                </Text>
                <Text style={styles.infoText}>
                    <Text style={{fontWeight: "bold"}}>Distance:   </Text>
                    <Text style={{textAlign: "right"}}>{testWorkout.info.distance}</Text>
                </Text>
                <Text style={styles.infoText}>
                    <Text style={{fontWeight: "bold"}}>Calories Burned:   </Text>
                    <Text style={{textAlign: "right"}}>{testWorkout.info.caloriesBurned}</Text>
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: "center",
        justifyContent: "center",
    },
    titleBox: {
        flex: 1,
        borderColor: "black",
        borderWidth: 2,
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 100,
        marginHorizontal: 25,
        marginVertical: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    infoBox: {
        flex: 12,
        borderColor: "black",
        borderWidth: 2,
        borderRadius: 20,
        //paddingVertical: 10,
        //paddingHorizontal: 100,
        marginHorizontal: 25,
        marginVertical: 20,
    },
    infoText: {
        fontSize: 16,
        padding: 5,
        margin: 5,
    },
    titleFont: {
        fontSize: 20,
        fontWeight: "bold",
    },
});