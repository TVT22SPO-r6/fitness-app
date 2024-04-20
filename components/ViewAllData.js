import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ViewAllData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('savedWorkouts');
      if (jsonValue !== null) {
        const parsedData = JSON.parse(jsonValue);
        setData(parsedData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const deleteData = async () => {
    try {
      await AsyncStorage.removeItem('savedWorkouts');
      setData([]); // Clearing the data state
      console.log('Data deleted successfully');
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  return (
    <View>
      {data.map((item, index) => (
        <View key={index}>
          <Text> </Text>
          <Text style={{fontWeight:'bold'}}>Index: {index} </Text>
          <Text>wType: {item.wType}</Text>
          <Text>Start Time: {item.combinedStart}</Text>
          <Text>End Time: {item.combinedEnd}</Text>
          <Text>Distance: {item.distance}</Text>
          <Text>Weight: {item.weight}</Text>
          <Text>Reps: {item.reps}</Text>
          {item.muscleSets && item.muscleSets.length > 0 ? (
            item.muscleSets.map((muscleSet, index) => (
              <View key={index}>
                <Text>Muscle set {index}:</Text>
                <Text>Muscle Type: {muscleSet.muscleType}</Text>
                <Text>Weight: {muscleSet.weight}</Text>
                <Text>Reps: {muscleSet.reps}</Text>
                <Text>Sets: {muscleSet.sets}</Text>
              </View>
            ))
            ) : (
              <Text>No Muscle types</Text>
            )}
          <Text>Intensity: {item.intensity}</Text>
          <Text>Notes: {item.notes}</Text>
            {item.restTimes && item.restTimes.length > 0 ? (
            item.restTimes.map((restTime, index) => (
              <View key={index}>
                <Text>Rest Time {index}:</Text>
                <Text>Start Time: {restTime.startTime}</Text>
                <Text>End Time: {restTime.endTime}</Text>
              </View>
            ))
            ) : (
              <Text>No rest times available</Text>
            )}
        </View>
      ))}
      <Button title="Delete All Data" onPress={deleteData} />
    </View>
  );
};

export default ViewAllData;