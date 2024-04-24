import React, { useEffect } from 'react';
import { Modal, Text, View, Button, StyleSheet } from 'react-native';

function AlertNotification({ show, onClose }) {
  // Removed the local showNotification state and useEffect that manages it
  // Instead, directly use the show prop to control modal visibility
  
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={show}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Your workout is about to start!</Text>
          <Button
  title="Let's go"
  color="blue"
  onPress={() => {
    onClose(); // Close the popup
  }}
/>

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
