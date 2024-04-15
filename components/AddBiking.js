import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import SelectTime from './SelectTime';
import SelectDate from './SelectDate';
import NumericTextInput from './NumberInput';
import ViewAllData from "../components/ViewAllData";
import NumberSelector from './NumberSelector';
import {useState, Component} from 'react';
import { View} from 'react-native';
import { TextInput, PaperProvider, Text, Button, Portal, Dialog} from 'react-native-paper';

export default function AddWorkout(props) {
    const { wType } = props
    const [dateFromChild, setDateFromChild] = useState(null)
    const [startTimeFromChild, setStartTimeFromChild] = useState(null)
    const [endTimeFromChild, setEndTimeFromChild] = useState(null)
    const [numFromChild, setNumFromChild] = useState(null)
    const [intensity, setIntensity] = useState(null)
    const [notes, setNotes] = useState(null)


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

    const addItemToLocal = async (wType, date, startTime, endTime, num, intensity, notes) => {
      try {
        // Retrieve existing items from local storage
        const existingItems = await AsyncStorage.getItem('savedWorkouts');
        const parsedItems = existingItems ? JSON.parse(existingItems) : [];
    
        // Add the new item
        parsedItems.push({wType, date, startTime, endTime, num, intensity, notes });
    
        // Save the updated items back to local storage
        await AsyncStorage.setItem('savedWorkouts', JSON.stringify(parsedItems));
        
        console.log('Item added to local storage successfully');
        console.log('Current data saved' + JSON.stringify(parsedItems));
      } catch (error) {
        console.error('Error adding item to local storage:', error);
      }
    }

    const saveDataAndReset = async (wType, date, startTime, endTime, num, intensity, notes) => {
      // Check if any of the values are null
      if (date === null || startTime === null || endTime === null || num === null) {
        console.error('Error: One or more values are null')
        showDialog()
        return
      }
    
      // Call addItemToLocal to save the values
      await addItemToLocal(wType, date, startTime, endTime, num, intensity, notes);
    
      // Set the values to null after they have been saved
      setDateFromChild(null)
      setStartTimeFromChild(null)
      setEndTimeFromChild(null)
      setNumFromChild(null)
    
      console.log('Values saved and reset successfully');
      navigation.goBack()
    }
    const showDialog = () => setVisible(true)
    const hideDialog = () => setVisible(false)
  
    

    const typeContentMap = {
      "biking": (
        <>
          <View style={{ flexDirection: 'row' }}>
            <SelectDate onDateChange={handleDateChange}/>
            <SelectTime label="Start Time" onTimeChange={handleStartTimeChange}/>
            <SelectTime label="End Time" onTimeChange={handleEndTimeChange}/>
          </View>
          <NumericTextInput label='Distance (km)' onNumChange={handleNumChange} minVal={0} maxVal={200}/>
          <TextInput placeholder='Notes' multiline={true} onChangeText={handleNotesChange}/>
          <NumberSelector onSelect={handleNumberSelect} />
          <Button onPress={() => saveDataAndReset(wType, dateFromChild, startTimeFromChild, endTimeFromChild, numFromChild, intensity, notes)} mode='contained'>Add Workout</Button>
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
        </>
      ),
      "running": (
        <>
          <View style={{ flexDirection: 'row' }}>
            <SelectDate/>
            <SelectTime label="Start Time" />
            <SelectTime label="End Time" />
          </View>
          <NumericTextInput label='Distance (km)'/>
          <TextInput placeholder='Notes'/>
        </>
      ),
      "savedData": (
        <>
          <ViewAllData/>
        </>
      ),
    };

    const content = typeContentMap[wType] || <></>;

    return (
      <PaperProvider>
        {content}
      </PaperProvider>
    );
  
}