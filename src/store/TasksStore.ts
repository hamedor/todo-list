import { makeAutoObservable } from 'mobx';
import data from '../public/tasks.json';

interface Task {
  title: string;
  text: string;
  subtasks?: Task[];
}

class TasksStore {
  tasks: Task[] = [];
  openTasks: Set<string> = new Set();
  selectedTaskText: string = '';

  constructor() {
    makeAutoObservable(this);
    this.loadTasks();
  }

  loadTasks() {
    const tasks = localStorage.getItem('tasks');
    if (tasks) {
      this.tasks = JSON.parse(tasks);
    } else {
      this.tasks = data.tasks;
      localStorage.setItem('tasks', JSON.stringify(data.tasks));
    }
  }

  toggleTask(title: string) {
    if (this.openTasks.has(title)) {
      this.openTasks.delete(title);
    } else {
      this.openTasks.add(title);
    }
  }

  isTaskOpen(title: string) {
    return this.openTasks.has(title);
  }

  selectTask(text: string) {
    console.log(text)
    this.selectedTaskText = text;
  }

  addTask(newTask: Task, parentTitle?: string) {
    if (!parentTitle) {
      this.tasks.push(newTask);
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
      return;
    }
    
    const addSubtask = (tasks: Task[]) => {
      for (const task of tasks) {
        if (task.title === parentTitle) {
          if (!task.subtasks) task.subtasks = [];
          task.subtasks.push(newTask);
          tasksStore.toggleTask(parentTitle);
          return true;
        } else if (task.subtasks && addSubtask(task.subtasks)) {
          return true;
        }
      }
      return false;
    };
    
    addSubtask(this.tasks);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }


}

const tasksStore = new TasksStore();

export default tasksStore;
