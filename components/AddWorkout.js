import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import SelectTime from './SelectTime';
import SelectDate from './SelectDate';
import NumericTextInput from './NumberInput';
import ViewAllData from "../components/ViewAllData";
import {useState, Component} from 'react';
import { View} from 'react-native';
import { TextInput, PaperProvider, Text, Button, Portal, Dialog} from 'react-native-paper';

export default function AddWorkout(props) {
    const [dateFromChild, setDateFromChild] = useState(null)
    const [startTimeFromChild, setStartTimeFromChild] = useState(null)
    const [endTimeFromChild, setEndTimeFromChild] = useState(null)
    const [numFromChild, setNumFromChild] = useState(null)
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

    const addItemToLocal = async (date, startTime, endTime, num) => {
      try {
        // Retrieve existing items from local storage
        const existingItems = await AsyncStorage.getItem('myData');
        const parsedItems = existingItems ? JSON.parse(existingItems) : [];
    
        // Add the new item
        parsedItems.push({ date, startTime, endTime, num });
    
        // Save the updated items back to local storage
        await AsyncStorage.setItem('myData', JSON.stringify(parsedItems));
        
        console.log('Item added to local storage successfully');
        console.log('Current data saved' + JSON.stringify(parsedItems));
      } catch (error) {
        console.error('Error adding item to local storage:', error);
      }
    }

    const saveDataAndReset = async (date, startTime, endTime, num) => {
      // Check if any of the values are null
      if (date === null || startTime === null || endTime === null || num === null) {
        console.error('Error: One or more values are null')
        showDialog()
        return
      }
    
      // Call addItemToLocal to save the values
      await addItemToLocal(date, startTime, endTime, num);
    
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
  
    const { wType } = props

    const typeContentMap = {
      "biking": (
        <>
          <View style={{ flexDirection: 'row' }}>
            <SelectDate onDateChange={handleDateChange}/>
            <SelectTime label="Start Time" onTimeChange={handleStartTimeChange}/>
            <SelectTime label="End Time" onTimeChange={handleEndTimeChange}/>
            <Text>{numFromChild} {dateFromChild} {startTimeFromChild} {endTimeFromChild}</Text>
          </View>
          <NumericTextInput label='Distance (km)' onNumChange={handleNumChange} minVal={0} maxVal={200}/>
          <TextInput placeholder='Notes'/>
          <Button onPress={() => saveDataAndReset(dateFromChild, startTimeFromChild, endTimeFromChild, numFromChild)} mode='contained'>Add Workout</Button>
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