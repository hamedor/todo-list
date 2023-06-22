import './App.scss';
import Form from './components/form';
import TasksList from './components/taskList';
import ScreenWithText from './components/ScreenWithText';
import tasksStore from './store/TasksStore';

function App() {
  return (
    <div className="App">


      
        <div className="container">
          <TasksList />
          <ScreenWithText text={tasksStore.selectedTaskText}/>
        </div>
        <Form/>

    </div>
  );
}

export default App;
