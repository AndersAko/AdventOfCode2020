import Day from './Day.js';
import './App.css';


function App() {
  return (
    <div>
      { Array(25).fill(0).map( (_,ix) => <Day day={ix+1} key={ix}/> ) }
    </div>
  );
}

export default App;
