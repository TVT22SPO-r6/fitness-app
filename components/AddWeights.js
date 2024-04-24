import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import SelectTime from './SelectTime';
import SelectDate from './SelectDate';
import NumericTextInput from './NumberInput';
import NumberSelector from './NumberSelector';
import RestTime from './RestTime';
import saveData from './SaveData';
import {useState, Component, useEffect} from 'react';
import { View} from 'react-native';
import { TextInput, PaperProvider, Text, Button, Portal, Dialog} from 'react-native-paper';

export default function AddWeights({sType, date, startTime, endTime, desc}) {
    const wType  = "weights"
    const [dateFromChild, setDateFromChild] = useState(null)
    const [startTimeFromChild, setStartTimeFromChild] = useState(null)
    const [endTimeFromChild, setEndTimeFromChild] = useState(null)
    const [weightFromChild, setWeightFromChild] = useState(null)
    const [repsFromChild, setRepsFromChild] = useState(null)
    const [setsFromChild, setSetsFromChild] = useState(null)
    const [intensity, setIntensity] = useState(null)
    const [notes, setNotes] = useState(null)
    const [allRestTimes, setAllRestTimes] = useState([]);
    const displayDate = new Date(date)
    const displaySTime = new Date(startTime)
    const displayETime = new Date(endTime)

    
    useEffect(() => {
      if (sType === 'current') {
        setDateFromChild(date);
        setStartTimeFromChild(startTime);
        setEndTimeFromChild(endTime);
        setNotes(desc);
      }
    }, [sType, date, startTime, endTime, desc])




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
      setWeightFromChild(num)
    }
    const handleNum2Change = (num) => {
      setRepsFromChild(num)
    }
    const handleNum3Change = (num) => {
      setSetsFromChild(num)
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

    const saveDataAndReset = async (wType, date, startTime, endTime, weight, reps, sets, intensity, notes, restTimes) => {
      
      if (date === null || startTime === null || endTime === null || weight === null || reps === null || sets === null || intensity === null) {
        console.error('Error: One or more values are null')
        showDialog()
        return
      }
      
      await saveData({
        wType: wType,
        date: date,
        startTime: startTime,
        endTime: endTime,
        weight: weight,
        reps: reps,
        sets: sets,
        intensity: intensity,
        notes: notes,
        restTimes: restTimes
      })
    
      setDateFromChild(null)
      setStartTimeFromChild(null)
      setEndTimeFromChild(null)
      setWeightFromChild(null)
      setRepsFromChild(null)
      setSetsFromChild(null)
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
      {sType === 'current' ? (
       <View style={{ flexDirection: 'row' }}>
        <TextInput label='Date' mode="outlined" placeholder='Date' editable={false} selectTextOnFocus={false} value={displayDate.toLocaleDateString()}/>
        <TextInput label='Start Time' mode="outlined" placeholder='Start Time' editable={false} selectTextOnFocus={false} value={displaySTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}/>
        <TextInput label='End Time' mode="outlined" placeholder='End Time' editable={false} selectTextOnFocus={false} value={displayETime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}/>
      </View> 
      ) : (
        <View style={{ flexDirection: 'row' }}>
            <SelectDate onDateChange={handleDateChange}/>
            <SelectTime label="Start Time" onTimeChange={handleStartTimeChange}/>
            <SelectTime label="End Time" onTimeChange={handleEndTimeChange}/>
          </View>
        )}
          <RestTime onChange={handleRestTimesChange}/>
          <View>
      </View>
          <View style={{ flexDirection: 'row' }}>
            <NumericTextInput label='Weight(kg)' onNumChange={handleNumChange} minVal={0} maxVal={999}/>
            <NumericTextInput label='Reps' onNumChange={handleNum2Change} minVal={0} maxVal={999}/>
            <NumericTextInput label='Sets' onNumChange={handleNum3Change} minVal={0} maxVal={999}/>
          </View>
          <TextInput placeholder='Notes' multiline={true} onChangeText={handleNotesChange} value={notes}/>
          <NumberSelector onSelect={handleNumberSelect} />
          <Button onPress={() => saveDataAndReset(wType, dateFromChild, startTimeFromChild, endTimeFromChild, weightFromChild, repsFromChild, setsFromChild, intensity, notes, allRestTimes)} mode='contained'>Add Workout</Button>
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