import {PaperProvider} from "react-native-paper";
import React, { useState } from "react";
import {StyleSheet, ScrollView, Text } from "react-native";
import { SelectList } from 'react-native-dropdown-select-list'
import AddWorkout from '../components/AddWorkout';
import { useRoute } from '@react-navigation/native';

export default function NewWorkoutScreen(){
  const [workoutType, setWorkoutType] = useState('');
  const route = useRoute();
  const params = route.params



  
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
          {params ? (
            <>
            <Text>{params.endTime}</Text>
            <Text>{params.startTime}</Text>
            <Text>{params.date}</Text>
            <Text>{params.wType}</Text>
            <Text>{params.desc}</Text>
            <AddWorkout wType={params.wType} sType='current' date={params.date} startTime={params.startTime} endTime={params.endTime} desc={params.desc}/>
            </>
          ) : (
            <>
              <SelectList
              setSelected={(val) => setWorkoutType(val)} 
              data={workoutTypeList} 
              save="key" 
              />
              <AddWorkout wType={workoutType}/>
            </>
          )}
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
