
import { View} from 'react-native';
import AddBiking from './AddBiking';
import AddRunning from './AddRunning';
import AddWeights from './AddWeights';
import AddPushups from './AddPushups';
import AddSquats from './AddSquats';
import ViewAllData from './ViewAllData';
import AddMuscleTraining from './AddMuscleTraining';
import {PaperProvider} from 'react-native-paper';

export default function AddWorkout({wType, sType}) {

const typeContentMap = {
  "biking": (
    <>
     <AddBiking sType={sType}/>
    </>
  ),
  "running": (
    <>
      <AddRunning sType={sType}/>
    </>
  ),
  "weights": (
    <>
      <AddWeights sType={sType}/>
    </>
  ),
  "pushups": (
    <>
      <AddPushups sType={sType}/>
    </>
  ),
  "squats": (
    <>
      <AddSquats sType={sType}/>
    </>
  ),
  "muscles": (
    <>
      <AddMuscleTraining sType={sType}/>
    </>
  ),
  "others": (
    <>
    </>
  ),
  "savedData": (
    <>
      <ViewAllData/>
    </>
  ),
};

const content = typeContentMap[wType] || <></>;

return (
  <PaperProvider>
    {content}
  </PaperProvider>
);

}