// WorkoutContext.js
import React, { createContext, useContext, useState } from 'react';

const WorkoutContext = createContext();

export const useWorkout = () => useContext(WorkoutContext);

export const WorkoutProvider = ({ children }) => {
    const [currentWorkout, setCurrentWorkout] = useState(null);
    const updateCurrentWorkout = (workout) => {
        console.log("Updating current workout in context:", workout);
        setCurrentWorkout(workout);
    };
    const handleStartWorkout = (workout) => {
        console.log("Starting workout: ", workout);
        updateCurrentWorkout(workout);
        console.log("Navigating to Current Workout");
        navigation.navigate('Current Workout');  // Ensure this is the correct screen name
    };
    
    

    return (
        <WorkoutContext.Provider value={{ currentWorkout, setCurrentWorkout, updateCurrentWorkout }}>
            {children}
        </WorkoutContext.Provider>
    );
};

export default WorkoutContext;
