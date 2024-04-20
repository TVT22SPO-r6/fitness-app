import React, { useState } from 'react'
import { View, Button, Text } from 'react-native'
import NumericTextInput from './NumberInput'
import { PaperProvider } from 'react-native-paper'
import DropDown from 'react-native-paper-dropdown'
import MuscleDropDown from './MuscleDropdown.js'

const MuscleSelector = ({ onChange }) => {
  const [muscleSets, setMuscleSets] = useState([])

  const handleAddMuscleSet = () => {
    const newMuscleSets = [...muscleSets]
    newMuscleSets.push({ muscleType: '', weight: '', reps:'', sets:''})
    setMuscleSets(newMuscleSets)
    onChange(newMuscleSets)
  }
  const handleDeleteMuscleSet = (index) => {
    const newMuscleSets = [...muscleSets]
    newMuscleSets.splice(index, 1)
    setMuscleSets(newMuscleSets)
    onChange(newMuscleSets)
  }

  const handleMuscleTypeChange = (index, muscleType) => {
    const newMuscleSets = [...muscleSets]
    newMuscleSets[index].muscleType = muscleType
    setMuscleSets(newMuscleSets)
    onChange(newMuscleSets)
  }

  const handleWeightChange = (index, weight) => {
    const newMuscleSets = [...muscleSets]
    newMuscleSets[index].weight = weight
    setMuscleSets(newMuscleSets)
    onChange(newMuscleSets)
  }

  const handleRepsChange = (index, reps) => {
    const newMuscleSets = [...muscleSets]
    newMuscleSets[index].reps = reps
    setMuscleSets(newMuscleSets)
    onChange(newMuscleSets)
  }

  const handleSetsChange = (index, sets) => {
    const newMuscleSets = [...muscleSets]
    newMuscleSets[index].sets = sets
    setMuscleSets(newMuscleSets)
    onChange(newMuscleSets)
  }

  return (
    <View>
      {muscleSets.map((muscleSet, index) => (
        <View key={index} >
            <MuscleDropDown 
                onMuscleChange={(muscleType) => handleMuscleTypeChange(index, muscleType)}
            />
        <View style={{ flexDirection: 'row' }}>
            <NumericTextInput 
                label='Weight (kg)' 
                onNumChange={(weight) => handleWeightChange(index, weight)} 
                minVal={0} maxVal={500}
            />
            <NumericTextInput 
                label='Reps' 
                onNumChange={(reps) => handleRepsChange(index, reps)} 
                minVal={0} maxVal={999}
            />
            <NumericTextInput 
                label='Sets' 
                onNumChange={(sets) => handleSetsChange(index, sets)} 
                minVal={0} maxVal={999}
            />
        <Button title="Delete" onPress={() => handleDeleteMuscleSet(index)} />
        </View>
        </View>
      ))}
      <Button title="Add Muscle Set" onPress={handleAddMuscleSet} />
    </View>
  )
}

export default MuscleSelector;