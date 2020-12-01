import React, { useState } from 'react';
import Day1 from './day1/day1.js';
import Day2 from './day2/day2.js';
import './Day.css';

export default function Day(props) {
  const [active, setActive] = useState(false);

  let position = parseInt(props.day) - 1;
  let top = Math.floor(position / 7) * 20 + 15;
  let left = (position % 7) * 12 + 8;
  var DayComponent;
  switch (props.day) {
    case 1:
      DayComponent = <Day1 />;
      break;
    case 2:
      DayComponent = <Day2 />;
      break;
    default:
      DayComponent = <>Not defined yet</>
  }
  if (active) {
    return (
      <div className="Day active" style={{ top: '10vh', left: '10vw' }} 
        // onClick={() => setActive(false)}
         >
        {DayComponent}
      </div>
    );
  } else {
    return (
      <div className="Day" style={{ top: top + 'vh', left: left + 'vw' }} onClick={() => setActive(true)} >
        Day {props.day}
      </div>
    );
  }
}
