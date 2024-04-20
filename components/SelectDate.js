import React, { useState, useEffect } from "react";
import { Pressable } from "react-native";
import { TextInput } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function SelectDate({ onDateChange }) {
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);

    useEffect(() => {
        
        onDateChange(date.toISOString());
    }, []);

    const onChange = (event, selectedDate) => {
        if (selectedDate) {
            setDate(selectedDate);
            console.log("New Date Selected:", selectedDate);  // Debug log
            onDateChange(selectedDate.toISOString());
            setShow(false);
        }
    };
    
    const showDatepicker = () => {
        setShow(true);
    };
    

    
    return (
        <>
            <Pressable onPress={showDatepicker}>
                <TextInput
                    mode="outlined"
                    label="Date"
                    value={date.toLocaleDateString()}
                    editable={false}
                    selectTextOnFocus={false}
                />
            </Pressable>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode="date"
                    display="default"
                    onChange={onChange}
                    maximumDate={date}
                />
            )}
        </>
    );
}
