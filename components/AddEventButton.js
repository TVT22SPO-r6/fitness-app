import React, { useState } from 'react';
import { View, Button, TextInput, Modal, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const AddEventButton = ({ onAddEvent }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleAddEvent = () => {
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    const formattedTime = `${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}`;
    const eventDateTime = `${formattedDate} ${formattedTime}`;
    onAddEvent(description, eventDateTime);
    setModalVisible(false);
    setDescription('');
    setDate(new Date());
    setTime(new Date());
  };

  return (
    <View style={styles.container}>
      <Button title="Add Event" onPress={() => setModalVisible(true)} />
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TextInput
            style={styles.input}
            placeholder="Add description"
            value={description}
            onChangeText={setDescription}
          />
          <Button title="Choose date" onPress={() => setShowDatePicker(true)} />
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                setDate(selectedDate || date); // Prevent null values if cancelled
              }}
            />
          )}
          <Button title="Choose time" onPress={() => setShowTimePicker(true)} />
          {showTimePicker && (
            <DateTimePicker
              value={time}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={(event, selectedTime) => {
                setShowTimePicker(false);
                setTime(selectedTime || time); // Prevent null values if cancelled
              }}
            />
          )}
          <Button title="Add" onPress={handleAddEvent} />
          <Button title="Cancel" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  input: {
    height: 40,
    width: '80%',
    marginBottom: 20,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
  },
});

export default AddEventButton;

