import Day1 from './day1/day1.js';
import './Day.css';


export default function Day(props) {
    let className = "Day"+props.day;
    let top = Math.floor(parseInt(props.day)/7)*20+15;
    let left = (parseInt(props.day) % 7 -1) * 12 + 8;
    var DayComponent;
    switch(props.day) {
        case "1":
            DayComponent = <Day1/>;
            break;
        default:
            return (
                <div className="Day">
                  Not defined yet
                </div>
              );
    }
    return (
        <div className="Day" style={{top: top+'vh', left: left+'vw'}}>
          {DayComponent}
        </div>
      );
}
