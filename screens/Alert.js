import React, { useState, useEffect } from 'react';
import { Modal, Text, View, StyleSheet } from 'react-native';

function AlertNotification() {
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    // Example: Schedule a notification for a specific time
    // This is a simplified example. In a real app, you might store the workout times in state,
    // AsyncStorage, or context, and calculate the delay dynamically.
    const workoutTime = new Date(); // The time for the planned workout
    workoutTime.setSeconds(workoutTime.getSeconds() + 10); // For example, 10 seconds from now

    const currentTime = new Date();
    const delay = workoutTime.getTime() - currentTime.getTime(); // Time until workout in milliseconds

    if (delay > 0) {
      setTimeout(() => {
        setShowNotification(true);
      }, delay);
    }
  }, []);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showNotification}
      onRequestClose={() => {
        setShowNotification(false);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Your workout is about to start!</Text>
          {/* You can add a button to close the modal */}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default AlertNotification;