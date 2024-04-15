import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const NumberSelector = ({ onSelect }) => {
  const [selectedNumber, setSelectedNumber] = useState(null);

  const handleNumberSelect = (number) => {
    setSelectedNumber(number);
    onSelect(number);
  };

  return (
    <View style={styles.container}>
        <Text>Intensity of Workout</Text>
      {[1, 2, 3, 4, 5].map((number) => (
        <TouchableOpacity
          key={number}
          style={[
            styles.numberButton,
            selectedNumber === number && styles.selectedButton,
          ]}
          onPress={() => handleNumberSelect(number)}
        >
          <Text style={styles.numberText}>{number}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  numberButton: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 5,
  },
  selectedButton: {
    backgroundColor: 'blue', // Change to your desired color
  },
  numberText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default NumberSelector;