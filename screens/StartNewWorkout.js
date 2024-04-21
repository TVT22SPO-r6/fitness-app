import {PaperProvider} from "react-native-paper";
import React, { useState } from "react";
import {StyleSheet, ScrollView } from "react-native";
import { SelectList } from 'react-native-dropdown-select-list'
import AddWorkout from '../components/AddWorkout';

export default function StartNewWorkout(){
  const [workoutType, setWorkoutType] = useState('');

  // Expanded workout type list including handling for additional types.
  const workoutTypeList = [
    {
      key: "biking",
      value: "Biking",
    },
    {
      key: "running",
      value: "Running",
    },
    {
      key: "weights",
      value: "Weights",
    },
    {
      key: "pushups",
      value: "Push-Ups",
    },
    {
      key: "squats",
      value: "Squats",
    },
    {
      key: "muscles",
      value: "Muscle Training",
    },
    {
      key: "savedData",
      value: "All Saved Data",
    },
  ];
  
 

    return (
        <PaperProvider>
          <ScrollView>
          <SelectList
           setSelected={(val) => setWorkoutType(val)} 
           data={workoutTypeList} 
           save="key" 
        />
        <AddWorkout wType={workoutType}/>
        </ScrollView>
        </PaperProvider>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
