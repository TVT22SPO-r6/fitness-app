
import React, { useEffect, useState } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { View, Text, Button, ScrollView, StyleSheet, Platform, Modal } from 'react-native';
import { Card, Avatar, IconButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

const Feed = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const isFocused = useIsFocused();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth()); // Default to current month (0-indexed)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Default to current year
  const [filteredData, setFilteredData] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);

  useEffect(() => {
    if (isFocused) {
      fetchData();
    }
  }, [isFocused]);


  const fetchData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('savedWorkouts');
      if (jsonValue !== null) {
        const parsedData = JSON.parse(jsonValue);
        const sortedData = parsedData.sort((a, b) => {
          return new Date(b.combinedStart) - new Date(a.combinedStart);
        })
        setData(sortedData);
        setFilteredData(sortedData)
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const filterData = () => {
    const filteredData = data.filter(item => {
      const itemDate = new Date(item.combinedStart);
      const itemMonth = itemDate.getMonth(); // Zero-based index
      const itemYear = itemDate.getFullYear();
      return itemMonth === selectedMonth && itemYear === selectedYear;
    });
    setFilteredData(filteredData);
    setIsFiltered(true)
  };

  const checkWType = (workout) => {
    if (workout.wType === "running") {
      return styles.runningColor;
    } else if (workout.wType === "biking") {
      return styles.bikingColor;
    } else if (workout.wType === "weights") {
      return styles.weightsColor;
    } else if (workout.wType === "pushups") {
      return styles.pushupsColor;
    } else if (workout.wType === "squats") {
      return styles.squatsColor;
    } else if (workout.wType === "muscles") {
      return styles.muscleColor;
    } else {
      return { backgroundColor: "grey" };
    }
  };

  const handleDateChange = (event, date) => {
    if (date) {
      const selectedDate = new Date(date);
      setSelectedYear(selectedDate.getFullYear());
      setSelectedMonth(selectedDate.getMonth());
      filterData();
    }
    setShowDatePicker(false); 
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.filterContainer}>
        <Button
          title="Filter Workouts"
          color = 'tomato'
          onPress={() => setShowDatePicker(true)}
        />
       {isFiltered===true && 
       <Button
        title="Remove Filter"
        color = 'tomato'
        onPress={() => {
          setFilteredData(data);
          setIsFiltered(false)
        }}
      />}
        {showDatePicker && (
            <View >
                <DateTimePicker
                  value={new Date(selectedYear, selectedMonth)}
                  mode="date"
                  display="spinner"
                  onChange={handleDateChange}
                />
            </View>
        )}
      </View>
      {filteredData.map((item, index) => {
        const startDate = new Date(item.combinedStart);
        const endDate = new Date(item.combinedEnd);
        const durationMillis = endDate - startDate;
        const durationHours = Math.floor(durationMillis / 3600000);

        return (
          <Card
            key={index}
            style={[styles.card, checkWType(item)]}
            onPress={() => navigation.navigate("Past Workout", { workout: item })}
          >
            <Card.Title
              title={item.wType.charAt(0).toUpperCase() + item.wType.slice(1)}
              titleStyle={{fontWeight:'bold'}}
              subtitle={`For ${durationHours} hrs`}
              right={() =>
                <Text style={{textAlign: 'right', paddingRight:10}}>
                  {`
                                    ${startDate.toLocaleDateString()}\n
                                    ${startDate.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                                    `}
                </Text>
              }
            />
            <Card.Content>
              {item.distance ? (
                <Text>Distance: {item.distance} km</Text>
              ) : (
                <></>
              )}
              {item.weight ? (
                <Text>Weight: {item.weight} kg</Text>
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
    marginHorizontal: 2,
    borderRadius: 10, 
    padding: 10, 
  },
  bikingColor: {
    backgroundColor: "#ff8282"
  },
  runningColor: {
    backgroundColor: "#64b3ff"
  },
  weightsColor: {
    backgroundColor: "#9acd32"
  },
  pushupsColor: {
    backgroundColor: "#ffd700"
  },
  squatsColor: {
    backgroundColor: "#dda0dd"
  },
  muscleColor: {
    backgroundColor: "#ffa500"
  },
  filterContainer: {
    flexDirection: 'column',
    padding: 10,
    marginBottom: 10
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'top',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },


});

export default Feed;
