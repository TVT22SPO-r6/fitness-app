import React, {useState} from "react"
import {Pressable} from "react-native"
import { TextInput } from 'react-native-paper'
import DateTimePicker from '@react-native-community/datetimepicker';


export default function SelectDate({onDateChange}) {
  const [date, setDate] = useState(new Date())
  const [show, setShow] = useState(false)

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate
    setShow(false)
    setDate(currentDate)
    onDateChange(currentDate.toLocaleDateString())
  }

  const showDatepicker = () => {
    setShow(true)
  }

  return (
    <>
      <Pressable onPressIn={showDatepicker} uppercase={false} mode="outlined">
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
          is24Hour={true}
          onChange={onChange}
          maximumDate={new Date()}

        />
      )}
    </>
  )

}