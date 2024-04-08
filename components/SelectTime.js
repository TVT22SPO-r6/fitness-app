import {useState, useCallback, useEffect} from 'react'
import {Pressable} from "react-native";
import {TextInput} from 'react-native-paper';
import { TimePickerModal} from 'react-native-paper-dates';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function SelectTime(props) {
    const [visible, setVisible] = useState(false)
    const [time, setTime] = useState("0:00")
    const onDismiss = useCallback(() => {
        setVisible(false)
    }, [setVisible])

    const onConfirm = useCallback(
    ({ hours, minutes }) => {
      setVisible(false);
      console.log({ hours, minutes });
      setTime(hours.toString() + ":"+ minutes.toString())
    },
    [setVisible]
    );

  return (
      <>
        <Pressable onPressIn={() => setVisible(true)} uppercase={false} mode="outlined">
          <TextInput
            mode="outlined"
            label={props.label}
            value={time}
            editable={false}
            selectTextOnFocus={false}
          />
        </Pressable>
        <TimePickerModal
          visible={visible}
          onDismiss={onDismiss}
          onConfirm={onConfirm}
          hours={12}
          minutes={0}
        />
      </>
  );
}