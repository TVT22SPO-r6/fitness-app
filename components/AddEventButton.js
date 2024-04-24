import React, { useState } from 'react';
import { View, Modal, StyleSheet, Text, Pressable } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { TextInput } from 'react-native-paper';
import { Button } from 'react-native-paper';

const AddEventButton = ({ onAddEvent }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [workoutType, setWorkoutType] = useState('biking');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    const handleAddEvent = () => {
        if (!date || !time) {
            console.error('Error: Date or time is undefined.');
            return;
        }

        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
        const formattedTime = `${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}`;
        const eventDateTime = `${formattedDate} ${formattedTime}`;

        console.log("Event Date-Time:", eventDateTime);

        if (!eventDateTime) {
            console.error('Event date-time is undefined.');
            return;
        }

        onAddEvent(description, eventDateTime, workoutType);
        setModalVisible(false);
    };


    const resetInputs = () => {
        setDescription('');
        setDate(new Date());
        setTime(new Date());
        setWorkoutType('biking'); // Reset to default type
    };


    return (
        <View style={styles.container}>
            <Button onPress={() => setModalVisible(true)} mode='contained'>Add event</Button>
            <Modal
                visible={modalVisible}
                animationType="slide"
                onRequestClose={() => {
                    setModalVisible(false);
                    resetInputs();
                }}
            >
                <View style={styles.modalContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Add description"
                        value={description}
                        onChangeText={setDescription}
                    />
                    <Picker
                        selectedValue={workoutType}
                        onValueChange={(itemValue) => setWorkoutType(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Biking" value="biking" />
                        <Picker.Item label="Running" value="running" />
                        <Picker.Item label="Weights" value="weights" />
                        <Picker.Item label="Squats" value="squats" />
                        <Picker.Item label="Muscle Training" value="muscles" />
                    </Picker>
                    <View style={styles.datetime}>
                        <Pressable onPress={() => setShowDatePicker(true)}>
                            <TextInput
                                mode="outlined"
                                label="Date"
                                value={date.toLocaleDateString()}
                                editable={false}
                                selectTextOnFocus={false}
                            />
                        </Pressable>
                        {showDatePicker && (
                            <DateTimePicker
                                value={date}
                                mode="date"
                                display="default"
                                onChange={(event, selectedDate) => {
                                    setShowDatePicker(false);
                                    setDate(selectedDate || date);
                                }}

                            />
                        )}

                        <Pressable onPress={() => setShowTimePicker(true)} uppercase={false} mode="outlined">
                            <TextInput
                                mode="outlined"
                                label="Time"
                                value={time ? time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "0:00"}
                                editable={false}
                                selectTextOnFocus={false}
                            />
                        </Pressable>
                        {showTimePicker && (
                            <DateTimePicker
                                value={time}
                                mode="time"
                                is24Hour={true}
                                onChange={(event, selectedTime) => {
                                    setShowTimePicker(false);
                                    setTime(selectedTime || time);
                                }}
                            />
                        )}
                    </View>
                    <Button onPress={handleAddEvent}>Add</Button>
                    <Button onPress={() => {
                        setModalVisible(false);
                        resetInputs();
                    }}>Cancel</Button>
                </View>
            </Modal >
        </View >
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
        backgroundColor: 'white',
        borderColor: 'gray',
    },
    picker: {
        width: '80%',
        marginBottom: 20,
    },
    datetime: {
        flexDirection: 'row',
    },
});

export default AddEventButton;

