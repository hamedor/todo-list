import { observer } from 'mobx-react-lite';
import Task from './task';
import tasksStore from '../store/TasksStore';

const TasksList = observer(() => {
  return (
    <ul>
      {tasksStore.tasks.map((task) => (
        <Task key={task.title} task={task} depth={0} />
      ))}
    </ul>
  );
});

export default TasksList;
