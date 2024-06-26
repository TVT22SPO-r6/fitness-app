import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function DeleteWorkout(workout){
    try{
        const workouts = await AsyncStorage.getItem("savedWorkouts")
        if(workouts !== null){
            var parsedData = JSON.parse(workouts)
            parsedData.forEach(element => {
                if(JSON.stringify(element) === JSON.stringify(workout)){
                    parsedData.splice(parsedData.indexOf(element), 1);

                }
            });

            return await AsyncStorage.setItem('savedWorkouts', JSON.stringify(parsedData));
        }
    }catch(error){
        console.error("Error removing data.", error)
    }
}