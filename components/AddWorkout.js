import AsyncStorage from '@react-native-async-storage/async-storage';
import SelectTime from './SelectTime';
import SelectDate from './SelectDate';
import NumericTextInput from './NumberInput';
import {useState, Component} from 'react';
import { View} from 'react-native';
import { TextInput, PaperProvider, Text } from 'react-native-paper';

export default function AddWorkout(props) {
    const [numFromChild, setNumFromChild] = useState(null)
    const [dateFromChild, setDateFromChild] = useState(null)
    const [endTimeFromChild, setEndTimeFromChild] = useState(null)
    const [startTimeFromChild, setStartTimeFromChild] = useState(null)

    const handleNumChange = (num) => {
      setNumFromChild(num)
    }
    const handleStartTimeChange = (time) => {
      setStartTimeFromChild(time)
    }
    const handleEndTimeChange = (time) => {
      setEndTimeFromChild(time)
    }
    const handleDateChange = (selectedDate) => {
      setDateFromChild(selectedDate)
    }
    
  
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
          <NumericTextInput label='Distance (km)' onNumChange={handleNumChange}/>
          <TextInput placeholder='Notes'/>
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
    };

    const content = typeContentMap[wType] || <></>;

    return (
      <PaperProvider>
        {content}
      </PaperProvider>
    );
  
}