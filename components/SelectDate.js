import React, {useState} from "react"
import {Pressable} from "react-native"
import { TextInput } from 'react-native-paper'
import DateTimePicker from '@react-native-community/datetimepicker';


export default function SelectDate({onDateChange}) {
  const [date, setDate] = useState(undefined)
  const [show, setShow] = useState(false)
  const initialDate = new Date()

  const onChange = (event, selectedDate) => {
    const dateWithoutTime = new Date(selectedDate)
    dateWithoutTime.setHours(0,0,0,0)
    setShow(false)
    setDate(dateWithoutTime)
    onDateChange(dateWithoutTime.toISOString())
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
            value={date ? date.toLocaleDateString(): "Date"}
            editable={false}
            selectTextOnFocus={false}
          />
        </Pressable>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date ? date : initialDate}
          mode="date"
          is24Hour={true}
          onChange={onChange}
          maximumDate={new Date()}

        />
      )}
    </>
  )

}