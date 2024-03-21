import { Text, View, StyleSheet } from "react-native";

export default function PastWorkoutScreen(){
    return (
        <View style={styles.container}>
            <Text style={{fontSize: 20}} >Past Workout</Text>
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