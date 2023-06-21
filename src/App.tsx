import './App.scss';
import Form from './components/form';
import TasksList from './components/taskList';
import ScreenWithText from './components/ScreenWithText';

function App() {
  return (
    <div className="App">


      
        <div className="container">
          <TasksList />
          <ScreenWithText text={'test'} />
        </div>
        <Form/>

    </div>
  );
}

export default App;
