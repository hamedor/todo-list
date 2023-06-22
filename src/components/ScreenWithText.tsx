import { observer } from 'mobx-react-lite';
import tasksStore from '../store/TasksStore';

interface ScreenWithTextProps {
  text: string;
}

function ScreenWithText({ text }: ScreenWithTextProps) {
  return (
    <div>
      <p>{tasksStore.selectedTaskText}</p>
    </div>
  );
}

export default observer(ScreenWithText);
