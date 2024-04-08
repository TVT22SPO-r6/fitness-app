import React, {useState} from "react"
import {Pressable} from "react-native"
import { TextInput } from 'react-native-paper'
import DateTimePicker from '@react-native-community/datetimepicker';


export default function SelectTime({label, onTimeChange}) {
  const [time, setTime] = useState("0:00")
  const [show, setShow] = useState(false)

  const onChange = (event, selectedTime) => {
    const currentTime = selectedTime
    setShow(false)
    setTime(currentTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}))
    onTimeChange(currentTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}))
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
            value={time}
            editable={false}
            selectTextOnFocus={false}
          />
        </Pressable>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date()}
          mode="time"
          is24Hour={true}
          onChange={onChange}
          maximumDate={new Date()}

        />
      )}
    </>
  )

}