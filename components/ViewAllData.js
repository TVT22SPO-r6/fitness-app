import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
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

  return (
    <View>
      {data.map((item, index) => (
        <View key={index}>
          <Text>wType: {item.wType}</Text>
          <Text>Date: {item.date}</Text>
          <Text>Start Time: {item.startTime}</Text>
          <Text>End Time: {item.endTime}</Text>
          <Text>Distance: {item.distance}</Text>
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
    </View>
  );
};

export default ViewAllData;