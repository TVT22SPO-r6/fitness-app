import React, { useState } from 'react'
import { View, Button, Text } from 'react-native'
import SelectTime from './SelectTime'

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
        <View key={index} style={{ flexDirection: 'row' }}>
        <Text> Rest Time:  </Text>
          <SelectTime
            label="Start Time"
            onTimeChange={(time) => handleStartTimeChange(index, time)}
          />
          <SelectTime
            label="End Time"
            onTimeChange={(time) => handleEndTimeChange(index, time)}
          />
          <Button title="Delete" onPress={() => handleDeleteRestTime(index)} />
        </View>
      ))}
      <Button title="Add rest time" onPress={handleAddRestTime} />
    </View>
  )
}

export default RestTime;