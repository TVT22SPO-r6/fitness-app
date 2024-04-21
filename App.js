// App.js
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { PaperProvider , BottomNavigation} from "react-native-paper";
import WorkoutPlanScreen from './screens/WorkoutPlanScreen';
import HomeScreen from './screens/HomeScreen';
import NewWorkoutScreen from './screens/NewWorkoutScreen';
import CurrentWorkoutScreen from './screens/CurrentWorkoutScreen';
import CalendarScreen from './screens/CalendarScreen';
import PastWorkoutScreen from './screens/PastWorkoutScreen';
import AlertNotification from './components/AlertNotification';
import Clock from './screens/Clock';
import { TimerProvider } from './screens/TimerContext';
import { WorkoutProvider } from './components/WorkoutContext';
import { Ionicons } from '@expo/vector-icons';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'New Workout') {
                        iconName = focused ? 'add-circle' : 'add-circle-outline';
                    } else if (route.name === 'Calendar') {
                        iconName = focused ? 'calendar' : 'calendar-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="New Workout" component={NewWorkoutScreen} />
            <Tab.Screen name="Calendar" component={CalendarScreen} />
        </Tab.Navigator>
    );
}

function AppNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Main" component={BottomTabNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="Workout Plan" component={WorkoutPlanScreen} />
            <Stack.Screen name="Current Workout" component={CurrentWorkoutScreen} />
            <Stack.Screen name="Past Workout" component={PastWorkoutScreen} initialParams={{ workout: null }} />
            <Stack.Screen name="Clock" component={Clock} />
        </Stack.Navigator>
    );
}

export default function App() {
    return (
        <WorkoutProvider>
            <TimerProvider>
                <NavigationContainer>
                    <AppNavigator />
                </NavigationContainer>
            </TimerProvider>
        </WorkoutProvider>
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
