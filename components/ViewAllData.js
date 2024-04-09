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
      const jsonValue = await AsyncStorage.getItem('myData');
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
          <Text>Date: {item.date}</Text>
          <Text>Start Time: {item.startTime}</Text>
          <Text>End Time: {item.endTime}</Text>
          <Text>Number: {item.num}</Text>
        </View>
      ))}
    </View>
  );
};

export default ViewAllData;