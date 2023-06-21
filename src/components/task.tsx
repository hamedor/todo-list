import styles from '../styles/task.module.scss';
import { useState } from 'react';

interface TaskProps{
    task: TaskI;
    depth: number;
}
interface TaskI {
    title: string;
    text: string;
    subtasks?: TaskI[];
  }
  

  const Task = ({ task, depth }: TaskProps) => {

    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
      setIsOpen(!isOpen);
    };


    return (
        <li
        className={`${styles.task} ${styles[`depth-${depth}`]}`}
        style={{ marginLeft: depth > 0 ? depth * 20 : 0 }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {task.subtasks && task.subtasks.length > 0 && (
             <button onClick={handleToggle}>
             <i className={`${styles.arrow} ${isOpen ? styles.up : styles.down}`} />
           </button>
          )}
          <h3>{task.title}</h3>
          <input type="checkbox" style={{ marginLeft: 'auto' }} />
        </div>
        {isOpen && task.subtasks && task.subtasks.length > 0 && (
          <ul>
            {task.subtasks.map((subtask) => (
              <Task key={subtask.title} task={subtask} depth={depth + 1} />
            ))}
          </ul>
        )}
      </li>
    );
  };


export default Task;