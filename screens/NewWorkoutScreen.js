import {PaperProvider} from "react-native-paper";
import React, { useState } from "react";
import {StyleSheet, View } from "react-native";
import DropDown from "react-native-paper-dropdown";
import AddWorkout from '../components/AddWorkout';

export default function NewWorkoutScreen(){
  const [showDropDown, setShowDropDown] = useState(false);
  const [workoutType, setWorkoutType] = useState('');
  const workoutTypeList = [
    {
      label: "Biking",
      value: "biking",
    },
    {
      label: "Running",
      value: "running",
    },
    {
      label: "Weights",
      value: "weights",
    },
    {
      label: "Others",
      value: "others",
    },
  ];
    return (
        <PaperProvider>
        <DropDown
            label={"Workout Type"}
            mode={"outlined"}
            visible={showDropDown}
            showDropDown={() => setShowDropDown(true)}
            onDismiss={() => setShowDropDown(false)}
            value={workoutType}
            setValue={setWorkoutType}
            list={workoutTypeList}
        />
        <AddWorkout wType={workoutType}/>
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