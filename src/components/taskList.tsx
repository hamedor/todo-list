import data from '../public/tasks.json';
import Task from './task';


const TasksList = () => {

    return (
        <ul>
          {data.tasks.map((task) => (
            <Task key={task.title} task={task} depth={0} />
          ))}
        </ul>
      );
}


export default TasksList;