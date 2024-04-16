
import { View} from 'react-native';
import AddBiking from './AddBiking';
import AddRunning from './AddRunning';
import AddWeights from './AddWeights';
import AddPushups from './AddPushups';
import AddSquats from './AddSquats';
import ViewAllData from './ViewAllData';
import {PaperProvider} from 'react-native-paper';

export default function AddWorkout(props) {
const { wType } = props

const typeContentMap = {
  "biking": (
    <>
     <AddBiking/>
    </>
  ),
  "running": (
    <>
      <AddRunning/>
    </>
  ),
  "weights": (
    <>
      <AddWeights/>
    </>
  ),
  "pushups": (
    <>
      <AddPushups/>
    </>
  ),
  "squats": (
    <>
      <AddSquats/>
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