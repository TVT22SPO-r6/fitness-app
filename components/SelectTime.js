import React, {useState} from "react"
import {Pressable} from "react-native"
import { TextInput } from 'react-native-paper'
import DateTimePicker from '@react-native-community/datetimepicker';


export default function SelectTime({label, onTimeChange}) {
  const [time, setTime] = useState(undefined)
  const [show, setShow] = useState(false)
  const initialTime = new Date()

  const onChange = (event, selectedTime) => {
    const timeOnly = new Date (1970, 0, 1, selectedTime.getHours(), selectedTime.getMinutes(), 0, 0)
    setShow(false)
    setTime(timeOnly)
    onTimeChange(timeOnly.toISOString())
  }

  const showTimepicker = () => {
    setShow(true)
  }

  return (
    <>
      <Pressable onPressIn={showTimepicker} uppercase={false} mode="outlined">
          <TextInput
            mode="outlined"
            label={label}
            value={time ? time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) :"0:00"}
            editable={false}
            selectTextOnFocus={false}
          />
        </Pressable>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={time ? time : initialTime}
          mode="time"
          is24Hour={true}
          onChange={onChange}
          maximumDate={new Date()}

        />
      )}
    </>
  )

}