// App.js
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
import TrainingRoutineScreen from './screens/TrainingRoutineScreen';
import AlertNotification from './components/AlertNotification';
import Clock from './screens/Clock';
import { TimerProvider } from './screens/TimerContext';

export default function App() {
    const Stack = createNativeStackNavigator();
    return (
        <TimerProvider>
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName='Home'>
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
                        initialParams={{workoutId: null}}
                    />
                    <Stack.Screen
                        name="Training Routine"
                        component={TrainingRoutineScreen}
                        options={{ title: "Add Training Routine", headerTitle: "Add training routine" }}
                        />
                    <Stack.Screen
                        name="Clock"
                        component={Clock}
                        options={{ title: "Clock", headerTitle: "Clock" }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </TimerProvider>
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
