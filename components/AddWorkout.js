import AsyncStorage from '@react-native-async-storage/async-storage';
import SelectTime from './SelectTime';
import SelectDate from './SelectDate';
import NumericTextInput from './NumberInput';
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { TextInput, PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from "react-native-safe-area-context";

class AddWorkout extends Component {
  render() {
    const { wType } = this.props;

    const typeContentMap = {
      "biking": (
        <>
          <View style={{ flexDirection: 'row' }}>
            <SelectDate/>
            <SelectTime label="Start Time" />
            <SelectTime label="End Time" />
          </View>
          <NumericTextInput label='Distance'/>
          <TextInput placeholder='Notes'/>
        </>
      ),
      "running": (
        <>
          <View style={{ flexDirection: 'row' }}>
            <SelectDate/>
            <SelectTime label="Start Time" />
            <SelectTime label="End Time" />
          </View>
          <NumericTextInput label='Distance'/>
          <TextInput placeholder='Notes'/>
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
}

export default AddWorkout;