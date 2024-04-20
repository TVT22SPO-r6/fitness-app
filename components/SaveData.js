import AsyncStorage from '@react-native-async-storage/async-storage';

const saveData = async(props) => {
       
      const dateOnlyObj = new Date(props.date);
      const startTimeObj = new Date(props.startTime);
      const endTimeObj = new Date(props.endTime);

      const startHours = startTimeObj.getHours();
      const startMinutes = startTimeObj.getMinutes();
      const endHours = endTimeObj.getHours();
      const endMinutes = endTimeObj.getMinutes();

      const combinedStartTime = new Date(dateOnlyObj);
      const combinedEndTime = new Date(dateOnlyObj);

      combinedStartTime.setHours(startHours, startMinutes)
      combinedEndTime.setHours(endHours, endMinutes)

      const combinedStart = combinedStartTime.toISOString();
      const combinedEnd = combinedEndTime.toISOString();

      const wType = props.wType
      const distance = props.distance
      const weight = props.weight
      const reps = props.reps
      const sets = props.sets
      const intensity = props.intensity
      const notes = props.notes
      const restTimes = props.restTimes 
      const muscleSets = props.muscleSets

      try {
        
        const existingItems = await AsyncStorage.getItem('savedWorkouts');
        const parsedItems = existingItems ? JSON.parse(existingItems) : [];
    
        
        parsedItems.push({wType, combinedStart, combinedEnd, distance, weight, reps, sets, muscleSets, intensity, notes, restTimes });
    
        
        await AsyncStorage.setItem('savedWorkouts', JSON.stringify(parsedItems));
        
        console.log('Item added to local storage successfully');
        console.log('Current data saved' + JSON.stringify(parsedItems));
      } catch (error) {
        console.error('Error adding item to local storage:', error);
      }
    

    return null
  
}
export default saveData
