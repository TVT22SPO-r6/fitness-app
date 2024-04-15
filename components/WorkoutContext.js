import React, { createContext, useContext, useState } from 'react';

const WorkoutContext = createContext();

export const useWorkout = () => useContext(WorkoutContext);

export const WorkoutProvider = ({ children }) => {
    const [currentWorkout, setCurrentWorkout] = useState(null);

    return (
        <WorkoutContext.Provider value={{ currentWorkout, setCurrentWorkout }}>
            {children}
        </WorkoutContext.Provider>
    );
};
