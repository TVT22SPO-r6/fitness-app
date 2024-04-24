import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button} from 'react-native-paper'
import SelectTime from './SelectTime'
import { Ionicons } from '@expo/vector-icons';

const RestTime = ({ onChange }) => {
  const [restTimes, setRestTimes] = useState([])

  const handleAddRestTime = () => {
    const newRestTimes = [...restTimes]
    newRestTimes.push({ startTime: '', endTime: '' })
    setRestTimes(newRestTimes)
    onChange(newRestTimes)
  }
  const handleDeleteRestTime = (index) => {
    const newRestTimes = [...restTimes]
    newRestTimes.splice(index, 1)
    setRestTimes(newRestTimes)
    onChange(newRestTimes)
  }

  const handleStartTimeChange = (index, startTime) => {
    const newRestTimes = [...restTimes]
    newRestTimes[index].startTime = startTime
    setRestTimes(newRestTimes)
    onChange(newRestTimes)
  }

  const handleEndTimeChange = (index, endTime) => {
    const newRestTimes = [...restTimes]
    newRestTimes[index].endTime = endTime
    setRestTimes(newRestTimes)
    onChange(newRestTimes)
  }

  return (
    <View>
      {restTimes.map((restTime, index) => (
        <View key={index} style={{ flexDirection: 'row' , alignItems: "center", justifyContent: 'space-between', marginBottom:5}}>
          <Button  
          type='contained'
          onPress={() => handleDeleteRestTime(index)}
          style={styles.button}
          buttonColor='lightgray'
          textColor='black'
          >
            - Remove
          </Button>
          <SelectTime
            label="Start Time"
            onTimeChange={(time) => handleStartTimeChange(index, time)}
          />
          <SelectTime
            label="End Time"
            onTimeChange={(time) => handleEndTimeChange(index, time)}
          />
        </View>
      ))}
      <Button buttonColor='tomato' textColor='white' onPress={handleAddRestTime} style={{marginBottom:10}}>+ Add new rest time</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    paddingHorizontal: 5,
    marginRight: 10
  }
});

export default RestTime;