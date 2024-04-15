import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useWorkout } from '../components/WorkoutContext';
import SelectTime from './SelectTime';
import SelectDate from './SelectDate';
import NumericTextInput from './NumberInput';
import ViewAllData from "../components/ViewAllData";
import { useState } from 'react';
import { View } from 'react-native';
import { TextInput, PaperProvider, Text, Button, Portal, Dialog } from 'react-native-paper';

export default function AddWorkout(props) {
    const [dateFromChild, setDateFromChild] = useState(null);
    const [startTimeFromChild, setStartTimeFromChild] = useState(null);
    const [endTimeFromChild, setEndTimeFromChild] = useState(null);
    const [numFromChild, setNumFromChild] = useState(null);
    const [notes, setNotes] = useState('');
    const [visible, setVisible] = useState(false);
    const navigation = useNavigation();
    const { setCurrentWorkout } = useWorkout();

    const handleDateChange = (isoDate) => {
        console.log("Received date from SelectDate:", isoDate);
        setDateFromChild(isoDate);
    };
    const handleStartTimeChange = (time) => {
        setStartTimeFromChild(time);
    };
    const handleEndTimeChange = (time) => {
        setEndTimeFromChild(time);
    };
    const handleNumChange = (num) => {
        setNumFromChild(num);
    };

    const addItemToLocal = async (date, startTime, endTime, num, notes) => {
        try {
            const existingItems = await AsyncStorage.getItem('myData');
            const parsedItems = existingItems ? JSON.parse(existingItems) : [];

            parsedItems.push({ date, startTime, endTime, num, notes });

            await AsyncStorage.setItem('myData', JSON.stringify(parsedItems));

            console.log('Item added to local storage successfully');
        } catch (error) {
            console.error('Error adding item to local storage:', error);
        }
    };

    const saveDataAndReset = async () => {
        if (!dateFromChild || !startTimeFromChild || !endTimeFromChild || numFromChild === null || notes.trim() === '') {
            console.error('Error: One or more values are incomplete');
            console.log({ dateFromChild, startTimeFromChild, endTimeFromChild, numFromChild, notes });
            showDialog();
            return;
        }
    
        try {
            const existingItems = await AsyncStorage.getItem('myData');
            const parsedItems = existingItems ? JSON.parse(existingItems) : [];
            const newItem = { date: dateFromChild, startTime: startTimeFromChild, endTime: endTimeFromChild, num: numFromChild, notes };
            parsedItems.push(newItem);
    
            await AsyncStorage.setItem('myData', JSON.stringify(parsedItems));
            console.log('Item added to local storage successfully');
    
            setCurrentWorkout({ type: props.wType, date: dateFromChild, startTime: startTimeFromChild, endTime: endTimeFromChild, num: numFromChild, notes });
            navigation.navigate('Current Workout', { workout: newItem });
    
            // Reset fields
            setDateFromChild(null);
            setStartTimeFromChild(null);
            setEndTimeFromChild(null);
            setNumFromChild(null);
            setNotes('');
        } catch (error) {
            console.error('Error adding item to local storage:', error);
        }
    };

    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

    const { wType } = props;

    const typeContentMap = {
        "biking": (
            <>
                <View style={{ flexDirection: 'row' }}>
                    <SelectDate onDateChange={handleDateChange} />
                    <SelectTime label="Start Time" onTimeChange={handleStartTimeChange} />
                    <SelectTime label="End Time" onTimeChange={handleEndTimeChange} />
                    <Text>{numFromChild} {dateFromChild} {startTimeFromChild} {endTimeFromChild}</Text>
                </View>
                <NumericTextInput label='Distance (km)' onNumChange={handleNumChange} minVal={0} maxVal={200} />
                <TextInput
                    placeholder='Notes'
                    value={notes}
                    onChangeText={setNotes}
                />
                <Button onPress={() => saveDataAndReset(dateFromChild, startTimeFromChild, endTimeFromChild, numFromChild, notes)} mode='contained'>Add Workout</Button>
                <Portal>
                    <Dialog visible={visible} onDismiss={hideDialog}>
                        <Dialog.Title>Alert</Dialog.Title>
                        <Dialog.Content>
                            <Text variant="bodyMedium">One or more fields not filled</Text>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={hideDialog}>Ok</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </>
        ),
        "running": (
            <>
                <View style={{ flexDirection: 'row' }}>
                    <SelectDate onDateChange={handleDateChange} />
                    <SelectDate key={Date.now()} onDateChange={handleDateChange} />
                    <SelectTime label="Start Time" onTimeChange={handleStartTimeChange} />
                    <SelectTime label="End Time" onTimeChange={handleEndTimeChange} />
                </View>
                <NumericTextInput label='Distance (km)' onNumChange={handleNumChange} minVal={0} maxVal={200} />
                <TextInput
                    placeholder='Notes'
                    value={notes}
                    onChangeText={setNotes}
                />
                <Button onPress={() => saveDataAndReset(dateFromChild, startTimeFromChild, endTimeFromChild, numFromChild, notes)} mode='contained'>Add Workout</Button>
            </>
        ),
        "savedData": (
            <>
                <ViewAllData />
            </>
        ),
    };

    const content = typeContentMap[wType] || <></>;

    return (
        <PaperProvider>
            {content}
        </PaperProvider>
    );
}