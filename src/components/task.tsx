import styles from '../styles/task.module.scss';
import tasksStore from '../store/TasksStore';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';

interface TaskProps {
  task: TaskI;
  depth: number;
}

interface TaskI {
  title: string;
  text: string;
  subtasks?: TaskI[];
}

function Task({ task, depth }: TaskProps) {

    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskText, setNewTaskText] = useState('');
    const [showForm, setShowForm] = useState(false);

    const handleToggle = (event: React.MouseEvent) => {
        event.stopPropagation();
        tasksStore.toggleTask(task.title);
      };
    
      const handleClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        tasksStore.selectTask(task.text);
      };
      const handleAddTask = (event: React.MouseEvent) => {
        event.stopPropagation();
        if (newTaskTitle && newTaskText) {
          tasksStore.addTask({ title: newTaskTitle, text: newTaskText }, task.title);
          setNewTaskTitle('');
          setNewTaskText('');
          setShowForm(false);
        } else {
          setShowForm(!showForm);
        }
      };


  return (
    <li
    className={`${styles.task} ${styles[`depth-${depth}`]}`}
    style={{ marginLeft: depth > 0 ? depth * 20 : 0 }}
    onClick={handleClick}
  >
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {task.subtasks && task.subtasks.length > 0 && (
        <button onClick={handleToggle}>
          <i
            className={`${styles.arrow} ${
              tasksStore.isTaskOpen(task.title) ? styles.up : styles.down
            }`}
          />
        </button>
      )}
      <h3>{task.title}</h3>
      <button onClick={handleAddTask}>{showForm ? 'ок' : 'Добавить задачу'}</button>
         
      {showForm && (
            <div>
              <input
                type="text"
                placeholder="Заголовок задачи"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
              />
              <input
                type="text"
                placeholder="Текст задачи"
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
              />
            </div>
          )}

      <input type="checkbox" style={{ marginLeft: 'auto' }} />
    </div>
    {tasksStore.isTaskOpen(task.title) && (
      <>
        {task.subtasks && task.subtasks.length > 0 && (
          <ul>
            {task.subtasks.map((subtask) => (
              <Task key={subtask.title} task={subtask} depth={depth + 1} />
            ))}
          </ul>
        )}

      </>
    )}
  </li>
    );

}

export default observer(Task);
