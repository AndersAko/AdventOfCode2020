import React, { useState } from 'react';
import Day1 from './day1/day1.js';
import Day2 from './day2/day2.js';
import Day3 from './day3/day3.js';
import Day4 from './day4/day4.js';
import Day5 from './day5/day5.js';
import Day6 from './day6/day6.js';
import Day7 from './day7/day7.js';
import Day8 from './day8/day8.js';
import Day9 from './day9/day9.js';
import Day10 from './day10/day10.js';
import Day11 from './day11/day11.js';
import Day12 from './day12/day12.js';
import Day13 from './day13/day13.js';
import Day14 from './day14/day14.js';
import Day15 from './day15/day15.js';
import Day16 from './day16/day16.js';
import Day17 from './day17/day17.js';
import Day18 from './day18/day18.js';
import Day19 from './day19/day19.js';
import Day20 from './day20/day20.js';
import Day21 from './day21/day21.js';
import Day22 from './day22/day22.js';
import Day23 from './day23/day23.js';
import Day24 from './day24/day24.js';
import Day25 from './day25/day25.js';
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
    case 3:
      dayComponent = <Day3 />;
      break;
    case 4:
      dayComponent = <Day4 />;
      break;
    case 5:
      dayComponent = <Day5 />;
      break;
    case 6:
      dayComponent = <Day6 />;
      break;
    case 7:
      dayComponent = <Day7 />;
      break;
    case 8:
      dayComponent = <Day8 />;
      break;
    case 9:
      dayComponent = <Day9 />;
      break;
    case 10:
      dayComponent = <Day10 />;
      break;
    case 11:
      dayComponent = <Day11 />;
      break;
    case 12:
      dayComponent = <Day12 />;
      break;
    case 13:
      dayComponent = <Day13 />;
      break;
    case 14:
      dayComponent = <Day14 />;
      break;
    case 15:
      dayComponent = <Day15 />;
      break;
    case 16:
      dayComponent = <Day16 />;
      break;
    case 17:
      dayComponent = <Day17 />;
      break;
    case 18:
      dayComponent = <Day18 />;
      break;
    case 19:
      dayComponent = <Day19 />;
      break;
    case 20:
      dayComponent = <Day20 />;
      break;
    case 21:
      dayComponent = <Day21 />;
      break;
    case 22:
      dayComponent = <Day22 />;
      break;
    case 23:
      dayComponent = <Day23 />;
      break;
    case 24:
      dayComponent = <Day24 />;
      break;
    case 25:
      dayComponent = <Day25 />;
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
          {/* <div className='door left back' key='doorleftback' />
          <div className='door right back' key='doorrightback' /> */}
          <div className="door left" key="doorleft">{props.day}</div>
          <div className="door right" key="doorright">Dec</div>
        </div>
      );
    case states.active:
        return (
        <div className="Day" style={{ top: top + 'vh', left: left + 'vw' }} onClick={() => setState(states.expanded)}  >
          <dayComponent.type state={state}/>
          {/* <div className='door left back open' key='doorleftback' />
          <div className='door right back open' key='doorrightback' /> */}
          <div className="door left open" key="doorleft">{props.day}</div>
          <div className="door right open" key="doorright">Dec</div>
        </div>
      );
    case states.expanded:
        return (
        <div className="Day expanded" style={{ top: top + 'vh', left: left + 'vw' }} >
          <dayComponent.type state={state}/>
          <button type="button" onClick={() => setState(states.idle)}>Close</button>  
        </div>
      );
    default:
      return null;
    }
}
