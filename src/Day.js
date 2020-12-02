import React, { useState } from 'react';
import Day1 from './day1/day1.js';
import Day2 from './day2/day2.js';
import './Day.css';

export default function Day(props) {
  const states = {
    idle: 'idle',
    active: 'active',
    expanded: 'expanded'
  };
  const [state, setState] = useState(states.idle);

  var dayComponent;
  switch (props.day) {
    case 1:
      dayComponent = <Day1 />;
      break;
    case 2:
      dayComponent = <Day2 />;
      break;
    default:
      dayComponent = <div>Not defined yet</div>
  }

  let top, left; 
  switch (state) {
    case states.idle:
    case states.active:
      let position = parseInt(props.day) - 1;
      top = Math.floor(position / 7) * 20 + 15;
      left = (position % 7) * 12 + 8;
      break;
    case states.expanded:
      top = 10;
      left = 10;
      break;
    default:
      top = 0; left=0;
  }

  switch (state) {
    case states.idle:
      return (
        <div className="Day" style={{ top: top + 'vh', left: left + 'vw' }} onClick={() => setState(states.active)} >
          Day {props.day}
        </div>
      );
    case states.active:
        return (
        <div className="Day" style={{ top: top + 'vh', left: left + 'vw' }} onClick={() => setState(states.expanded)}  >
          <dayComponent.type state={state}/>
        </div>
      );
    case states.expanded:
        return (
        <div className="Day expanded" style={{ top: top + 'vh', left: left + 'vw' }}  >
          <dayComponent.type state={state}/>
          <button type="button" onClick={() => setState(states.idle)}>Close</button>  
        </div>
      );
    default:
      return null;
    }
}
