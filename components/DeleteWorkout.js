import AsyncStorage from "@react-native-async-storage/async-storage";

export default function DeleteWorkout(workout){
    const remove = async (workout) => {
        try{
            const workouts = await AsyncStorage.getItem("savedWorkouts")
            if(workouts !== null){
                var parsedData = JSON.parse(workouts)
                parsedData.forEach(element => {
                    if(JSON.stringify(element) === JSON.stringify(workout)){
                        console.log("data before: ", parsedData)
                        parsedData.splice(parsedData.indexOf(element), 1);
                        console.log("data after: ", parsedData)
                    }
                });

                await AsyncStorage.setItem('savedWorkouts', JSON.stringify(parsedData));
            }
        }catch(error){
            console.error("Error removing data.", error)
        }
    }

    remove(workout)
}