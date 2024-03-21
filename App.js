import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { PaperProvider } from "react-native-paper";
import WorkoutPlanScreen from './screens/WorkoutPlanScreen';
import HomeScreen from './screens/HomeScreen';
import NewWorkoutScreen from './screens/NewWorkoutScreen';
import CurrentWorkoutScreen from './screens/CurrentWorkoutScreen';
import CalendarScreen from './screens/CalendarScreen';
import PastWorkoutScreen from './screens/PastWorkoutScreen';
import MainAppbar from './components/MainAppbar';

export default function App() {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='Home'
                screenOptions={{header: (props) => {
                    <MainAppbar {...props}
                        backgroundColor={{backgroundColor: "#00a484"}}
                        title="Home" />
                }}}>
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{title: "Home", headerTitle: "Home"}}
                />
                <Stack.Screen
                    name="Workout Plan"
                    component={WorkoutPlanScreen}
                    options={{title: "Workout Plan", headerTitle: "Workout Plan"}}
                />
                <Stack.Screen
                    name="New Workout"
                    component={NewWorkoutScreen}
                    options={{title: "New Workout", headerTitle: "New Workout"}}
                />
                <Stack.Screen
                    name="Current Workout"
                    component={CurrentWorkoutScreen}
                    options={{title: "Current Workout", headerTitle: "Current Workout"}}
                />
                <Stack.Screen
                    name="Calendar"
                    component={CalendarScreen}
                    options={{title: "Calendar", headerTitle: "Calendar"}}
                />
                <Stack.Screen
                    name="Past Workout"
                    component={PastWorkoutScreen}
                    options={{title: "Past Workout", headerTitle: "Past Workout"}}
                />
            </Stack.Navigator>
        </NavigationContainer>
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
