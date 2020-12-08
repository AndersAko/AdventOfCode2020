import Day from './Day.js';
import './App.css';
import background from './bakgrund.jpg';

function App() {
  return (
    <div>
      <img src={background} style={{width:'100%'}} alt=''/>
      { Array(25).fill(0).map( (_,ix) => <Day day={ix+1} key={ix}/> ) }
      <div style={{position: 'absolute', right: '12vw', bottom: '10vh', height: '10vh', width: '20vw'}}>
        An AdventOfCode exercise by Anders Kökeritz
        </div>
    </div>
  );
}

export default App;
