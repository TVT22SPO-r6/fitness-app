import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SaveData(props) {
    

    const addItemToLocal = async (props) => {

      //yhdistää daten startTimeen ja EndTimeen
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

      try {
        
        const existingItems = await AsyncStorage.getItem('savedWorkouts');
        const parsedItems = existingItems ? JSON.parse(existingItems) : [];
    
        
        parsedItems.push({wType, combinedStart, combinedEnd, distance, weight, reps, sets, intensity, notes, restTimes });
    
        
        await AsyncStorage.setItem('savedWorkouts', JSON.stringify(parsedItems));
        
        console.log('Item added to local storage successfully');
        console.log('Current data saved' + JSON.stringify(parsedItems));
      } catch (error) {
        console.error('Error adding item to local storage:', error);
      }
    }

    const saveDataAndReset = async (props) => {
      
      await addItemToLocal(props);
    
      setDateFromChild(null)
      setStartTimeFromChild(null)
      setEndTimeFromChild(null)
      setNumFromChild(null)
      setIntensity(null)
      setNotes(null)
      setAllRestTimes([])
    
      console.log('Values saved and reset successfully');
    }

    return 
  
}
