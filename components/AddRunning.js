import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import SelectTime from './SelectTime';
import SelectDate from './SelectDate';
import NumericTextInput from './NumberInput';
import NumberSelector from './NumberSelector';
import RestTime from './RestTime';
import {useState, Component} from 'react';
import { View} from 'react-native';
import { TextInput, PaperProvider, Text, Button, Portal, Dialog} from 'react-native-paper';

export default function AddRunning() {
    const wType  = "running"
    const [dateFromChild, setDateFromChild] = useState(null)
    const [startTimeFromChild, setStartTimeFromChild] = useState(null)
    const [endTimeFromChild, setEndTimeFromChild] = useState(null)
    const [numFromChild, setNumFromChild] = useState(null)
    const [intensity, setIntensity] = useState(null)
    const [notes, setNotes] = useState(null)
    const [allRestTimes, setAllRestTimes] = useState([]);


    const [visible, setVisible] = useState(false)
    const navigation = useNavigation()

    const handleDateChange = (dateOnly) => {
      setDateFromChild(dateOnly)
    }
    const handleStartTimeChange = (time) => {
      setStartTimeFromChild(time)
    }
    const handleEndTimeChange = (time) => {
      setEndTimeFromChild(time)
    }
    const handleNumChange = (num) => {
      setNumFromChild(num)
    }
    const handleNumberSelect = (number) => {
      setIntensity(number)
    }
    const handleNotesChange = (newNotes) => {
      setNotes(newNotes)
    }
    const handleRestTimesChange = (newRestTimes) => {
    setAllRestTimes(newRestTimes);
    }

    const addItemToLocal = async (wType, date, startTime, endTime, distance, intensity, notes, restTimes) => {

      //yhdistää daten startTimeen ja EndTimeen, ei enää tallenna sisäisesti datea erikseen
      const dateOnlyObj = new Date(date);
      const startTimeObj = new Date(startTime);
      const endTimeObj = new Date(endTime);

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
    
        
        parsedItems.push({wType, combinedStart, combinedEnd, distance, intensity, notes, restTimes });
    
        
        await AsyncStorage.setItem('savedWorkouts', JSON.stringify(parsedItems));
        
        console.log('Item added to local storage successfully');
        console.log('Current data saved' + JSON.stringify(parsedItems));
      } catch (error) {
        console.error('Error adding item to local storage:', error);
      }
    }

    const saveDataAndReset = async (wType, date, startTime, endTime, distance, intensity, notes, restTimes) => {
      
      if (date === null || startTime === null || endTime === null || distance === null || intensity === null) {
        console.error('Error: One or more values are null')
        showDialog()
        return
      }
      
      await addItemToLocal(wType, date, startTime, endTime, distance, intensity, notes, restTimes);
    
      setDateFromChild(null)
      setStartTimeFromChild(null)
      setEndTimeFromChild(null)
      setNumFromChild(null)
      setIntensity(null)
      setNotes(null)
      setAllRestTimes([])
    
      console.log('Values saved and reset successfully');
      navigation.goBack()
    }
    const showDialog = () => setVisible(true)
    const hideDialog = () => setVisible(false)

    return (
      <PaperProvider>
        <View style={{ flexDirection: 'row' }}>
            <SelectDate onDateChange={handleDateChange}/>
            <SelectTime label="Start Time" onTimeChange={handleStartTimeChange}/>
            <SelectTime label="End Time" onTimeChange={handleEndTimeChange}/>
          </View>
          <RestTime onChange={handleRestTimesChange}/>
          <View>
      </View>
          <NumericTextInput label='Distance (km)' onNumChange={handleNumChange} minVal={0} maxVal={200}/>
          <TextInput placeholder='Notes' multiline={true} onChangeText={handleNotesChange}/>
          <NumberSelector onSelect={handleNumberSelect} />
          <Button onPress={() => saveDataAndReset(wType, dateFromChild, startTimeFromChild, endTimeFromChild, numFromChild, intensity, notes, allRestTimes)} mode='contained'>Add Workout</Button>
          <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
              <Dialog.Title>Alert</Dialog.Title>
              <Dialog.Content>
                <Text variant="bodyMedium">One or more fields not filled</Text>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={hideDialog}>Ok</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
      </PaperProvider>
    );
  
}