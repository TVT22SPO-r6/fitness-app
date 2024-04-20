import React, { useState } from "react";
import { SelectList } from 'react-native-dropdown-select-list'

const MuscleDropDown = ({onMuscleChange}) =>{

  const handleTypeChange = (muscleType) => {
    onMuscleChange(muscleType)
  }

  const data = [
    {key:'biceps', value:'Biceps'},
    {key:'chest', value:'Chest'},
    {key:'thighs', value:'Thighs'},
    {key:'calves', value:'Calves'},
]

 

    return (
        <>
          <SelectList 
            setSelected={(muscleType) => handleTypeChange(muscleType)} 
            data={data} 
            save="key"
          />
        </>
    );

}
export default MuscleDropDown