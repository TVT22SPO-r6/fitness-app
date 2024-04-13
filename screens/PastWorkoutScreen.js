import { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const infoText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

export default function PastWorkoutScreen({route}){
    const { workoutId } = route.params
    const [ data, setData ] = useState({})

    function calculateCalories(){
        const caloriesPerHour = {bicycling: 288, running: 290, weights: 115}

        if(data.title === "Running"){
            const speed = data.distance / (data.duration / 60)
            /*
                TODO: calculate calories using speed
            */
            return Math.round((caloriesPerHour.running / 60) * data.duration)
        }else if(data.title === "Bicycling"){
            const speed = data.distance / (data.duration / 60)
            /*
                TODO: calculate calories using speed
            */
            return Math.round((caloriesPerHour.bicycling / 60) * data.duration)
        }else if(data.title === "Weights"){
            return Math.round((caloriesPerHour.weights / 60) * data.duration)
        }
        return "Could not calculate calories burned";
    }

    const fetchData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('myData');
            if (jsonValue !== null) {
                const parsedData = JSON.parse(jsonValue);
                console.log(parsedData)
                //setData(parsedData[0]);
                parsedData.forEach(element => {
                    if(element.id === workoutId){
                        setData(element)
                    }
                });
            }else{
                console.log("Nothing found")
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    
    useEffect(() => {
        fetchData();
    }, []);

    if(data.title === "Running" || data.title === "Bicycling"){
        return (
            <View style={styles.container}>
                <View style={styles.titleBox}>
                    <Text style={styles.titleFont} >{data.title}</Text>
                    <Text>{data.date.split("T")[0]}</Text>
                    <Text>{data.startTime.split("T")[1].slice(0,5)}</Text>
                </View>
                <View style={styles.infoBox}>
                    <View style={styles.infoTextContainer}>
                        <Text style={[styles.infoText, {fontWeight: "bold"}]}>Duration:</Text>
                        <Text style={styles.infoText}>{data.duration > 60 ? Math.floor(data.duration / 60) + ":" + (data.duration - 60) : "0:" + data.duration}</Text>
                    </View>
                    <View style={styles.infoTextContainer}>
                        <Text style={[styles.infoText, {fontWeight: "bold"}]}>Distance:</Text>
                        <Text style={styles.infoText}>{data.num} km</Text>
                    </View>
                    <View style={styles.infoTextContainer}>
                        <Text style={[styles.infoText, {fontWeight: "bold"}]}>Calories Burned:</Text>
                        <Text style={styles.infoText}>{calculateCalories()} kcal</Text>
                    </View>
                </View>
            </View>
        );
    }else if(data.title === "Workout"){
        return (
            <View style={styles.container}>
                <View style={styles.titleBox}>
                    <Text style={styles.titleFont} >{data.title}</Text>
                    <Text>{data.date.split("T")[0]}</Text>
                    <Text>{data.startTime.split("T")[1].slice(0,5)}</Text>
                </View>
                <View style={styles.infoBox}>
                    <View style={styles.infoTextContainer}>
                        <Text style={[styles.infoText, {fontWeight: "bold"}]}>Duration:</Text>
                        <Text style={styles.infoText}>{data.duration} min</Text>
                    </View>
                    {Object.entries(data.num).map(([key, value]) => (
                        <View style={styles.infoTextContainer} key={key}>
                            <Text style={[styles.infoText, {fontWeight: "bold"}]}>{key}:</Text>
                            <Text style={styles.infoText}>{value}</Text>
                        </View>
                    ))}
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