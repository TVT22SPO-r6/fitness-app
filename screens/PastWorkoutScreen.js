import { useEffect, useState } from "react";
import { Text, View, StyleSheet, Button, FlatList, Alert } from "react-native";
import DeleteWorkout from "../components/DeleteWorkout";
import { Card } from "react-native-paper";

export default function PastWorkoutScreen({route, navigation}){
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
    
    const confirmDelete = (workout) => {
        Alert.alert("Confirm delete", "Are you sure you want to delete this workout?", [{
            text: "No",
            style: "cancel"
        },{
            text: "Yes",
            onPress: () => handleDelete(workout),
        }])
    }

    const handleDelete = async (workout) => {
        await DeleteWorkout(workout)
        navigation.goBack()
    }

    const formatDuration = (duration) => {
        if(duration >= 60){
            return Math.floor(duration / 60) + ":" + (duration % 60)
        }else{
            return "0:" + duration
        }
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

    const checkWType = (workout) => {
        if(workout.wType === "running"){
            return {backgroundColor: "#64b3ff"}
        }else if(workout.wType === "biking"){
            return {backgroundColor: "#ff8282"}
        }else if(workout.wType === "weights"){
            return {backgroundColor: "#9acd32"}
        }else if(workout.wType === "pushups"){
            return {backgroundColor: "#ffd700"}
        }else if(workout.wType === "squats"){
            return {backgroundColor: "#dda0dd"}
        }else if(workout.wType === "muscles"){
            return {backgroundColor: "#ffa500"}
        }else{
            return {backgroundColor: "grey"}
        }
      }

    if(data.wType === "running" || data.wType === "biking"){
        return (
            <Card style={styles.container}>
                <Card.Title
                    style={[styles.titleBox, checkWType(data)]}
                    titleStyle={{fontWeight: "bold"}}
                    title={data.wType.charAt(0).toUpperCase() + data.wType.slice(1)}
                    subtitle={`For ${duration} mins`}
                    right={() => 
                        <Text style={{paddingRight: 10}}>
                            {`
                            ${new Date(data.combinedStart).toLocaleDateString()}\n
                            ${new Date(data.combinedStart).toLocaleTimeString([],{
                                hour: "2-digit",
                                minute: "2-digit"
                            })}
                            `}
                        </Text>
                    }
                />
                <Card style={[styles.infoBox, checkWType(data)]}>
                    <Card.Content style={styles.infoTextContainer}>
                        <Text style={[styles.infoText, {fontWeight: "bold"}]}>Duration:</Text>
                        <Text style={styles.infoText}>{formatDuration(duration)}</Text>
                    </Card.Content>
                    <Card.Content style={styles.infoTextContainer}>
                        <Text style={[styles.infoText, {fontWeight: "bold"}]}>Distance:</Text>
                        <Text style={styles.infoText}>{data.distance} km</Text>
                    </Card.Content>
                    { data.restTimes.length === 0 ? <></> :
                    <Card.Content style={styles.infoTextContainer}>
                        <Text style={[styles.infoText, {fontWeight: "bold"}]}>Rest:</Text>
                        <Text style={styles.infoText}>{restTimes} min</Text>
                    </Card.Content>
                    }
                    <Card.Content style={styles.infoTextContainer}>
                        <Text style={[styles.infoText, {fontWeight: "bold"}]}>Calories Burned:</Text>
                        <Text style={styles.infoText}>{calculateCalories()} kcal</Text>
                    </Card.Content>
                    <Card.Content style={styles.infoTextContainer}>
                        <Text style={[styles.infoText, {fontWeight: "bold"}]}>Notes:</Text>
                        <Text style={styles.infoText} numberOfLines={15}>{data.notes}</Text>
                    </Card.Content>
                </Card>
                <Card style={styles.deleteButton}>
                    <Button title="Delete workout" color="red" onPress={() => confirmDelete(data)} />
                </Card>
            </Card>
        );
    }else if(data.wType === "weights"){
        return (
            <Card style={styles.container}>
                <Card.Title
                    style={[styles.titleBox, checkWType(data)]}
                    titleStyle={{fontWeight: "bold"}}
                    title={data.wType.charAt(0).toUpperCase() + data.wType.slice(1)}
                    subtitle={`For ${duration} mins`}
                    right={() => 
                        <Text style={{paddingRight: 10}}>
                            {`
                            ${new Date(data.combinedStart).toLocaleDateString()}\n
                            ${new Date(data.combinedStart).toLocaleTimeString([],{
                                hour: "2-digit",
                                minute: "2-digit"
                            })}
                            `}
                        </Text>
                    }
                />
                <Card style={[styles.infoBox, checkWType(data)]}>
                    <Card.Content style={styles.infoTextContainer}>
                        <Text style={[styles.infoText, {fontWeight: "bold"}]}>Duration:</Text>
                        <Text style={styles.infoText}>{formatDuration(duration)}</Text>
                    </Card.Content>
                    <Card.Content style={styles.infoTextContainer}>
                        <Text style={[styles.infoText, {fontWeight: "bold"}]}>Weights:</Text>
                        <Text style={styles.infoText}>{data.weight} kg</Text>
                    </Card.Content>
                    <Card.Content style={styles.infoTextContainer}>
                        <Text style={[styles.infoText, {fontWeight: "bold"}]}>Reps:</Text>
                        <Text style={styles.infoText}>{data.reps}</Text>
                    </Card.Content>
                    { data.restTimes.length === 0 ? <></> :
                    <Card.Content style={styles.infoTextContainer}>
                        <Text style={[styles.infoText, {fontWeight: "bold"}]}>Rest:</Text>
                        <Text style={styles.infoText}>{restTimes} min</Text>
                    </Card.Content>
                    }
                    <Card.Content style={styles.infoTextContainer}>
                        <Text style={[styles.infoText, {fontWeight: "bold"}]}>Calories Burned:</Text>
                        <Text style={styles.infoText}>{calculateCalories()} kcal</Text>
                    </Card.Content>
                    <Card.Content style={styles.infoTextContainer}>
                        <Text style={[styles.infoText, {fontWeight: "bold"}]}>Notes:</Text>
                        <Text style={styles.infoText}>{data.notes}</Text>
                    </Card.Content>
                </Card>
                <Card style={styles.deleteButton}>
                    <Button title="Delete workout" color="red" onPress={() => confirmDelete(data)} />
                </Card>
            </Card>
        );
    }else if(data.wType === "pushups" || data.wType === "squats"){
        return (
            <Card style={styles.container}>
                <Card.Title
                    style={[styles.titleBox, checkWType(data)]}
                    titleStyle={{fontWeight: "bold"}}
                    title={data.wType.charAt(0).toUpperCase() + data.wType.slice(1)}
                    subtitle={`For ${duration} mins`}
                    right={() => 
                        <Text style={{paddingRight: 10}}>
                            {`
                            ${new Date(data.combinedStart).toLocaleDateString()}\n
                            ${new Date(data.combinedStart).toLocaleTimeString([],{
                                hour: "2-digit",
                                minute: "2-digit"
                            })}
                            `}
                        </Text>
                    }
                />
                <Card style={[styles.infoBox, checkWType(data)]}>
                    <Card.Content style={styles.infoTextContainer}>
                        <Text style={[styles.infoText, {fontWeight: "bold"}]}>Duration:</Text>
                        <Text style={styles.infoText}>{formatDuration(duration)}</Text>
                    </Card.Content>
                    <Card.Content style={styles.infoTextContainer}>
                        <Text style={[styles.infoText, {fontWeight: "bold"}]}>Reps:</Text>
                        <Text style={styles.infoText}>{data.reps}</Text>
                    </Card.Content>
                    { data.restTimes.length === 0 ? <></> :
                    <Card.Content style={styles.infoTextContainer}>
                        <Text style={[styles.infoText, {fontWeight: "bold"}]}>Rest:</Text>
                        <Text style={styles.infoText}>{restTimes} min</Text>
                    </Card.Content>
                    }
                    <Card.Content style={styles.infoTextContainer}>
                        <Text style={[styles.infoText, {fontWeight: "bold"}]}>Calories Burned:</Text>
                        <Text style={styles.infoText}>{calculateCalories()} kcal</Text>
                    </Card.Content>
                    <Card.Content style={styles.infoTextContainer}>
                        <Text style={[styles.infoText, {fontWeight: "bold"}]}>Notes:</Text>
                        <Text style={styles.infoText}>{data.notes}</Text>
                    </Card.Content>
                </Card>
                <Card style={styles.deleteButton}>
                    <Button title="Delete workout" color="red" onPress={() => confirmDelete(data)} />
                </Card>
            </Card>
        );
    }else if(data.wType === "muscles"){
        return (
            <Card style={styles.container}>
                <Card.Title
                    style={[styles.titleBox, checkWType(data)]}
                    titleStyle={{fontWeight: "bold"}}
                    title={data.wType.charAt(0).toUpperCase() + data.wType.slice(1)}
                    subtitle={`For ${duration} mins`}
                    right={() => 
                        <Text style={{paddingRight: 10}}>
                            {`
                            ${new Date(data.combinedStart).toLocaleDateString()}\n
                            ${new Date(data.combinedStart).toLocaleTimeString([],{
                                hour: "2-digit",
                                minute: "2-digit"
                            })}
                            `}
                        </Text>
                    }
                />
                <Card style={[styles.infoBox, checkWType(data)]}>
                    <Card.Content style={styles.infoTextContainer}>
                        <Text style={[styles.infoText, {fontWeight: "bold"}]}>Duration:</Text>
                        <Text style={styles.infoText}>{formatDuration(duration)}</Text>
                    </Card.Content>
                    <Card.Content style={styles.infoTextContainer}>
                        <Text style={[styles.infoText, {fontWeight: "bold"}]}>Muscle sets:</Text>
                        <FlatList style={{flex: 1, textAlign: "justify"}} data={data.muscleSets} renderItem={({item}) =>
                            <Text style={styles.infoText}>{item.muscleType}: {item.weight} kg, {item.reps}x{item.sets}</Text>
                        }/>
                    </Card.Content>
                    { data.restTimes.length === 0 ? <></> :
                    <Card.Content style={styles.infoTextContainer}>
                        <Text style={[styles.infoText, {fontWeight: "bold"}]}>Rest:</Text>
                        <Text style={styles.infoText}>{restTimes} min</Text>
                    </Card.Content>
                    }
                    <Card.Content style={styles.infoTextContainer}>
                        <Text style={[styles.infoText, {fontWeight: "bold"}]}>Calories Burned:</Text>
                        <Text style={styles.infoText}>{calculateCalories()} kcal</Text>
                    </Card.Content>
                    <Card.Content style={styles.infoTextContainer}>
                        <Text style={[styles.infoText, {fontWeight: "bold"}]}>Notes:</Text>
                        <Text style={styles.infoText}>{data.notes}</Text>
                    </Card.Content>
                </Card>
                <Card style={styles.deleteButton}>
                    <Button title="Delete workout" color="red" onPress={() => confirmDelete(data)} />
                </Card>
            </Card>
        );
    }else{
        <Card style={styles.container}>
            <Card.Content style={styles.titleBox}>
                <Text style={styles.titleFont} >Couldn't find workout</Text>
            </Card.Content>
        </Card>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: "center",
        justifyContent: "center",
        padding: 2
    },
    titleBox: {
        flex: 1,
        borderColor: "black",
        width: "100%",
        borderWidth: 2,
        borderRadius: 20,
        marginHorizontal: 2,
        marginVertical: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    infoBox: {
        flex: 12,
        borderColor: "black",
        borderWidth: 2,
        borderRadius: 20,
        marginHorizontal: 2,
        marginVertical: 5,
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
    deleteButton: {
        paddingBottom: 15,
        width: "80%",
        alignSelf: "center"
    }
});