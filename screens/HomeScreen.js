// HomeScreen.js
import { useLayoutEffect } from "react";
import { Button, Text, View, StyleSheet, SafeAreaView } from "react-native";
import Feed from "../components/Feed";
import AlertNotification from "../components/AlertNotification";

export default function HomeScreen({navigation}){
    return (
        <SafeAreaView style={styles.container}>
            <Feed />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    screenText: {
        fontSize: 20,
        marginBottom: 20,
    }
});