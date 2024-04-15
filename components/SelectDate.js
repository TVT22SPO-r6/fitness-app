import React, { useState } from "react";
import { Pressable } from "react-native";
import { TextInput } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function SelectDate({ onDateChange }) {
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        if (selectedDate) {
            setDate(selectedDate); // set the newly selected date
            onDateChange(selectedDate.toISOString()); // communicate the date back to the parent
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
                    maximumDate={new Date(2030, 11, 31)} // Set to a future date, e.g., December 31, 2030
                />
            )}
        </>
    );
}
