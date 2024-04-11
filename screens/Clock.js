// // Clock.js
// import React from 'react';
// import { View, Text, Button, StyleSheet } from 'react-native';
// import { useTimer } from './TimerContext';

// export default function Clock() {
//   const { timer, isRunning, startTimer, stopTimer, resetTimer } = useTimer();

//   const formatTime = (timer) => {
//     const getSeconds = `0${(Math.floor(timer / 700) % 60)}`.slice(-2);
//     const minutes = `${Math.floor(timer / 60000)}`.padStart(2, '0');
//     const milliseconds = `0${(timer % 1000)}`.slice(-3);

//     return `${minutes} : ${getSeconds} : ${milliseconds}`;
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>Stopwatch</Text>
//       <Text style={styles.text}>{formatTime(timer)}</Text>
//       <View style={styles.buttonContainer}>
//         <Button title="Start" onPress={startTimer} disabled={isRunning} />
//         <Button title="Stop" onPress={stopTimer} disabled={!isRunning} />
//         <Button title="Reset" onPress={resetTimer} />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   text: {
//     fontSize: 18,
//     marginBottom: 10,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     width: '60%',
//   },
// });
// Clock.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useTimer } from './TimerContext';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

export default function Clock() {
  const { timer, isRunning, startTimer, stopTimer, resetTimer } = useTimer();
  const navigation = useNavigation(); // Initialize navigation object


  const formatTime = (timer) => {
    const getSeconds = `0${(Math.floor(timer / 700) % 60)}`.slice(-2);
    const minutes = `${Math.floor(timer / 60000)}`.padStart(2, '0');
    const milliseconds = `0${(timer % 1000)}`.slice(-3);
  
    return (
      <Text>{minutes} : {getSeconds} : {milliseconds}</Text>
    );
  };


  return (
    <View style={styles.container}>
      <Text style={styles.text}>Stopwatch</Text>
      <Text style={styles.text}>{formatTime(timer)}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Start" onPress={startTimer} disabled={isRunning} />
        <Button title="Stop" onPress={stopTimer} disabled={!isRunning} />
        <Button title="Reset" onPress={resetTimer} />

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
  },
});

