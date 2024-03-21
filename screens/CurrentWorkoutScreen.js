import { Text, View, StyleSheet } from "react-native";

export default function CurrentWorkoutScreen(){
    return (
        <View style={styles.container}>
            <Text style={{fontSize: 20}} >Current Workout</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});