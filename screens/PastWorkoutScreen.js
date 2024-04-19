import { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";

export default function PastWorkoutScreen({route}){
    const { workout } = route.params
    const [ data, setData ] = useState(workout)
    const [ duration, setDuration ] = useState(calculateDuration())
    const [ restTimes, setRestTimes ] = useState(calculateRestTimes())

    function calculateDuration(){
        if(data.restTimes.length === 0){
            return (new Date(data.combinedEnd) - new Date(data.combinedStart)) / 1000 / 60
        }else{
            return ((new Date(data.combinedEnd) - new Date(data.combinedStart)) / 1000 / 60) - calculateRestTimes()
        }
    }

    function calculateRestTimes(){
        var combinedRests = 0
        data.restTimes.forEach(element => {
            combinedRests += (new Date(element.endTime) - new Date(element.startTime)) / 1000 / 60
        });
        return combinedRests
    }
    
    function calculateCalories(){
        const caloriesPerHour = {
            running1: 574,
            running2: 735,
            running3: 897,
            running4: 1119,

            bicycling1: 574,
            bicycling2: 717,
            bicycling3: 861,
            bicycling4: 1184,

            weights1: 215,
            weights2: 430
        }

        if(data.wType === "running"){
            if(data.intensity === 1 || data.intensity === 2){
                return Math.round((caloriesPerHour.running1 / 60) * duration)
            }else if(data.intensity === 3){
                return Math.round((caloriesPerHour.running2 / 60) * duration)
            }else if(data.intensity === 4){
                return Math.round((caloriesPerHour.running3 / 60) * duration)
            }else if(data.intensity === 5){
                return Math.round((caloriesPerHour.running4 / 60) * duration)
            }else{
                return Math.round((caloriesPerHour.running1 / 60) * duration)
            }
        }else if(data.wType === "biking"){
            if(data.intensity === 1 || data.intensity === 2){
                return Math.round((caloriesPerHour.bicycling1 / 60) * duration)
            }else if(data.intensity === 3){
                return Math.round((caloriesPerHour.bicycling2 / 60) * duration)
            }else if(data.intensity === 4){
                return Math.round((caloriesPerHour.bicycling3 / 60) * duration)
            }else if(data.intensity === 5){
                return Math.round((caloriesPerHour.bicycling4 / 60) * duration)
            }else{
                return Math.round((caloriesPerHour.bicycling1 / 60) * duration)
            }
        }else{
            if(data.intensity < 3){
                return Math.round((caloriesPerHour.weights1 / 60) * duration)
            }else{
                return Math.round((caloriesPerHour.weights2 / 60) * duration)
            }
        }
    }
    
    if(data.wType === "running" || data.wType === "biking"){
        return (
            <View style={styles.container}>
                <View style={styles.titleBox}>
                    <Text style={styles.titleFont} >{data.wType}</Text>
                    <Text>{data.combinedStart.split("T")[0]}</Text>
                    <Text>{new Date(data.combinedStart).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                </View>
                <View style={styles.infoBox}>
                    <View style={styles.infoTextContainer}>
                        <Text style={[styles.infoText, {fontWeight: "bold"}]}>Duration:</Text>
                        <Text style={styles.infoText}>{duration >= 60 ? Math.floor(duration / 60) + ":" + (duration - 60) : "0:" + duration}</Text>
                    </View>
                    <View style={styles.infoTextContainer}>
                        <Text style={[styles.infoText, {fontWeight: "bold"}]}>Distance:</Text>
                        <Text style={styles.infoText}>{data.distance} km</Text>
                    </View>
                    { data.restTimes.length === 0 ? <></> :
                    <View style={styles.infoTextContainer}>
                        <Text style={[styles.infoText, {fontWeight: "bold"}]}>Rest:</Text>
                        <Text style={styles.infoText}>{restTimes} min</Text>
                    </View>
                    }
                    <View style={styles.infoTextContainer}>
                        <Text style={[styles.infoText, {fontWeight: "bold"}]}>Calories Burned:</Text>
                        <Text style={styles.infoText}>{calculateCalories()} kcal</Text>
                    </View>
                    <View style={styles.infoTextContainer}>
                        <Text style={[styles.infoText, {fontWeight: "bold"}]}>Notes:</Text>
                        <Text style={styles.infoText}>{data.notes}</Text>
                    </View>
                </View>
            </View>
        );
    }else if(data.wType === "weights"){
        return (
            <View style={styles.container}>
                <View style={styles.titleBox}>
                    <Text style={styles.titleFont} >{data.wType}</Text>
                    <Text>{data.combinedStart.split("T")[0]}</Text>
                    <Text>{new Date(data.combinedStart).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                </View>
                <View style={styles.infoBox}>
                    <View style={styles.infoTextContainer}>
                        <Text style={[styles.infoText, {fontWeight: "bold"}]}>Duration:</Text>
                        <Text style={styles.infoText}>{duration >= 60 ? Math.floor(duration / 60) + ":" + (duration - 60) : "0:" + duration}</Text>
                    </View>
                    <View style={styles.infoTextContainer}>
                        <Text style={[styles.infoText, {fontWeight: "bold"}]}>Weights:</Text>
                        <Text style={styles.infoText}>{data.weight} kg</Text>
                    </View>
                    <View style={styles.infoTextContainer}>
                        <Text style={[styles.infoText, {fontWeight: "bold"}]}>Reps:</Text>
                        <Text style={styles.infoText}>{data.reps}</Text>
                    </View>
                    { data.restTimes.length === 0 ? <></> :
                    <View style={styles.infoTextContainer}>
                        <Text style={[styles.infoText, {fontWeight: "bold"}]}>Rest:</Text>
                        <Text style={styles.infoText}>{restTimes} min</Text>
                    </View>
                    }
                    <View style={styles.infoTextContainer}>
                        <Text style={[styles.infoText, {fontWeight: "bold"}]}>Calories Burned:</Text>
                        <Text style={styles.infoText}>{calculateCalories()} kcal</Text>
                    </View>
                    <View style={styles.infoTextContainer}>
                        <Text style={[styles.infoText, {fontWeight: "bold"}]}>Notes:</Text>
                        <Text style={styles.infoText}>{data.notes}</Text>
                    </View>
                </View>
            </View>
        );
    }else if(data.wType === "pushups" || data.wType === "squats"){
        return (
            <View style={styles.container}>
                <View style={styles.titleBox}>
                    <Text style={styles.titleFont} >{data.wType}</Text>
                    <Text>{data.combinedStart.split("T")[0]}</Text>
                    <Text>{new Date(data.combinedStart).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                </View>
                <View style={styles.infoBox}>
                    <View style={styles.infoTextContainer}>
                        <Text style={[styles.infoText, {fontWeight: "bold"}]}>Duration:</Text>
                        <Text style={styles.infoText}>{duration >= 60 ? Math.floor(duration / 60) + ":" + (duration - 60) : "0:" + duration}</Text>
                    </View>
                    <View style={styles.infoTextContainer}>
                        <Text style={[styles.infoText, {fontWeight: "bold"}]}>Reps:</Text>
                        <Text style={styles.infoText}>{data.reps}</Text>
                    </View>
                    { data.restTimes.length === 0 ? <></> :
                    <View style={styles.infoTextContainer}>
                        <Text style={[styles.infoText, {fontWeight: "bold"}]}>Rest:</Text>
                        <Text style={styles.infoText}>{restTimes} min</Text>
                    </View>
                    }
                    <View style={styles.infoTextContainer}>
                        <Text style={[styles.infoText, {fontWeight: "bold"}]}>Calories Burned:</Text>
                        <Text style={styles.infoText}>{calculateCalories()} kcal</Text>
                    </View>
                    <View style={styles.infoTextContainer}>
                        <Text style={[styles.infoText, {fontWeight: "bold"}]}>Notes:</Text>
                        <Text style={styles.infoText}>{data.notes}</Text>
                    </View>
                </View>
            </View>
        );
    }
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
        justifyContent: "center",
        //backgroundColor: "chartreuse",
        minWidth: 350,
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
        minWidth: 350,
        //backgroundColor: "chartreuse"
    },
    infoTextContainer: {
        flexDirection: "row",
        fontSize: 16,
        padding: 5,
        margin: 5,
    },
    infoText: {
        flex: 1,
        textAlign: "justify",
        fontSize: 16,
    },
    titleFont: {
        fontSize: 20,
        fontWeight: "bold",
    },
});