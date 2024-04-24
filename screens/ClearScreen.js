
import { useLayoutEffect, useEffect } from "react";
import { Button, Text, View, StyleSheet, SafeAreaView } from "react-native";
import Feed from "../components/Feed";
import AlertNotification from "../components/AlertNotification";
import { useNavigation} from '@react-navigation/native';

export default function ClearScreen(){
    const navigation = useNavigation()
   
    useEffect(() => {
        navigation.navigate('New Workout', {})
    }, []);

    return (
    <></>
    );
}

