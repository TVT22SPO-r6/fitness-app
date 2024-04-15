
import { View} from 'react-native';
import AddBiking from './AddBiking';
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