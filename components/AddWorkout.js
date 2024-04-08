import AsyncStorage from '@react-native-async-storage/async-storage';
import SelectTime from './SelectTime';
import SelectDate from './SelectDate';
import NumericTextInput from './NumberInput';
import React, { Component } from 'react';
import { View} from 'react-native';
import { TextInput, PaperProvider } from 'react-native-paper';

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
          <NumericTextInput label='Distance (km)'/>
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
          <NumericTextInput label='Distance (km)'/>
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