import React, { useEffect, useState } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';
import { Card, Avatar, IconButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNDateTimePicker from '@react-native-community/datetimepicker';

const Feed = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const isFocused = useIsFocused();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth()); // Default to current month (0-indexed)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Default to current year
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (isFocused) {
      fetchData();
    }
  }, [isFocused]);

  useEffect(() => {
    filterData();
  }, [selectedMonth, selectedYear, data]);

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

  const filterData = () => {
    const filteredData = data.filter(item => {
      const itemDate = new Date(item.combinedStart);
      const itemMonth = itemDate.getMonth(); // Zero-based index
      const itemYear = itemDate.getFullYear();
      return itemMonth === selectedMonth && itemYear === selectedYear;
    });
    setFilteredData(filteredData);
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

  const handleConfirm = () => {
    filterData();
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.filterContainer}>
        <Button
          title="All Workouts"
          onPress={() => setFilteredData(data)}
        />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.label}>Select Month:</Text>
          <RNDateTimePicker
            style={{ width: 200 }}
            value={new Date(selectedYear, selectedMonth)}
            mode="date"
            placeholder="select month"
            format="YYYY-MM"
            minDate={new Date(2020, 0)} // January 2020
            maxDate={new Date(2030, 11)} // December 2030
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                marginLeft: 36,
              },
            }}
            onChange={(event, date) => {
              if (date) {
                const selectedDate = new Date(date);
                setSelectedYear(selectedDate.getFullYear());
                setSelectedMonth(selectedDate.getMonth());
                handleConfirm(); // Call handleConfirm directly here
              }
            }}
          />
        </View>
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
              title={item.wType}
              subtitle={`For ${durationHours} hrs`}
              right={() =>
                <Text>
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
  },
  bikingColor: {
    backgroundColor: "#dc143c"
  },
  runningColor: {
    backgroundColor: "#1e90ff"
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
  label: {
    fontWeight: 'bold',
    marginRight: 10
  },
});
export default Feed;