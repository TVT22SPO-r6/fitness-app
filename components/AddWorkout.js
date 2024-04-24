
import { View} from 'react-native';
import AddBiking from './AddBiking';
import AddRunning from './AddRunning';
import AddWeights from './AddWeights';
import AddPushups from './AddPushups';
import AddSquats from './AddSquats';
import AddMuscleTraining from './AddMuscleTraining';
import {PaperProvider} from 'react-native-paper';

export default function AddWorkout({ wType, sType, date, startTime, endTime, desc }) {

const typeContentMap = {
  "biking": (
    <>
     <AddBiking sType={sType} date={date} startTime={startTime} endTime={endTime} desc={desc}/>
    </>
  ),
  "running": (
    <>
      <AddRunning sType={sType} date={date} startTime={startTime} endTime={endTime} desc={desc}/>
    </>
  ),
  "weights": (
    <>
      <AddWeights sType={sType} date={date} startTime={startTime} endTime={endTime} desc={desc}/>
    </>
  ),
  "pushups": (
    <>
      <AddPushups sType={sType} date={date} startTime={startTime} endTime={endTime} desc={desc}/>
    </>
  ),
  "squats": (
    <>
      <AddSquats sType={sType} date={date} startTime={startTime} endTime={endTime} desc={desc}/>
    </>
  ),
  "muscles": (
    <>
      <AddMuscleTraining sType={sType} date={date} startTime={startTime} endTime={endTime} desc={desc}/>
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