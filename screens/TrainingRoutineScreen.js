import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function TrainingRoutineScreen({ navigation }) {
    const [routineName, setRoutineName] = useState('');

    const handleAddRoutine = async () => {
        if (routineName.trim() === '') {
            // Using Alert instead of console.log to notify the user.
            Alert.alert("Missing Name", "Please enter a routine name.");
            return;
        }
    
        const id = new Date().toISOString();
    
        const newRoutine = {
            id,
            name: routineName,
        };
    
        try {
            const existingRoutines = JSON.parse(await AsyncStorage.getItem('routines')) || [];
            const updatedRoutines = [...existingRoutines, newRoutine];
            await AsyncStorage.setItem('routines', JSON.stringify(updatedRoutines));
    
            // Display a success message.
            Alert.alert("Success", "Routine added successfully!", [
                { text: "OK", onPress: () => navigation.goBack() }
            ]);
    
        } catch (error) {
            console.error('Error saving the routine:', error);
            // Consider using an Alert here as well to notify the user of the error.
            Alert.alert("Error", "There was an error saving the routine.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add Training Routine</Text>
            <TextInput
                style={styles.input}
                placeholder="Routine Name"
                value={routineName}
                onChangeText={setRoutineName}
            />
            <Button title="Add Routine" onPress={handleAddRoutine} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 20,
        marginBottom: 20,
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        marginBottom: 20,
    },
});

export default TrainingRoutineScreen;
