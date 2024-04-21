import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';
import { Card, Avatar, IconButton} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Feed = () => {
  const navigation = useNavigation();
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
    <ScrollView style={styles.scrollView}>
      {data.map((item, index) => {
        const startDate = new Date(item.combinedStart)
        const endDate = new Date(item.combinedEnd)
        const durationMillis = endDate - startDate
        const durationHours = Math.floor(durationMillis / 3600000)
        
        return (
        <Card key={index} style={styles.card} onPress={() => navigation.navigate("Past Workout", {workout: item})}>
            <Card.Title
                title ={item.wType}
                subtitle={`For ${durationHours} hrs`}
                right={() => 
                <Text>
                    {`
                    ${startDate.toLocaleDateString()}\n
                    ${startDate.toLocaleTimeString([],{
                    hour: '2-digit',
                    minute: '2-digit'})}
                    `}
                </Text>
                }
            />
          <Card.Content>
          {item.distance ? (
            <Text>Distance: {item.distance}</Text>
            ) : (
            <></>
            )}
          {item.weight ? (
            <Text>Weight: {item.weight}</Text>
            ) : (
            <></>
            )}
          {item.reps ? (
            <Text>Reps: {item.reps}</Text>
            ) : (
            <></>
            )}
          {item.sets > 0 ? (
            <Text>Sets: {item.sets}</Text>
            ) : (
            <></>
            )}
            {item.muscleSets && item.muscleSets.length > 0 ? (
                item.muscleSets.map((muscleSet, index) => (
                <View key={index}>
                    <Text>{muscleSet.muscleType}</Text>
                </View>
                ))
                ) : (
                <></>
                )}
            <Text>Intensity: {item.intensity}</Text>
          </Card.Content>
        </Card>
        )
        })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 2 
    },
    scrollView: {
        width: '100%' 
    },
    card: {
        marginVertical: 5, 
        marginHorizontal: 2 
    }
})
export default Feed;