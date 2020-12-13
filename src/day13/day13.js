import inputData from './input.txt'
import React, {useState, useEffect} from 'react'


export default function Day13(props) {
    const [solution1, setSolution1] = useState('Unsolved');
    const [solution2, setSolution2] = useState('Unsolved');
    
    useEffect( () => {
        function solve1(lines) {
            console.log('Solve 1');

            let timestampNow = parseInt(lines[0]);
            let busses = lines[1].split(',');
            let departures = [];
            for (let bus of busses) {
                if (bus ==='x') continue;
                bus = +bus;
                let departure = Math.floor(timestampNow/bus)*bus + bus;
                departures.push({bus, departure});
                console.log('Next bus '+bus+' leaves at '+departure);
            }
            let firstBus = departures.sort( (a,b) => a.departure - b.departure)[0];
            setSolution1(firstBus.bus * (firstBus.departure - timestampNow));
        }

        function solve2(lines) {
            console.log('Solve 2');
            let busses = lines[1].split(',');
            let timeStamp = 1;
            let oldInc = 1;
            while (true) {
                let match = true;
                let increment = 1;
                for (let bus in busses) {
                    if (busses[bus] === 'x') continue;
                    if ( (timeStamp + +bus) % +busses[bus] !== 0) { match = false; break; }
                    increment *= +busses[bus];
                }
                if (match) {
                    console.log('Match for all busses at ', timeStamp);
                    break;
                }
                timeStamp += increment;
                if (increment !== oldInc) {
                    oldInc = increment;
                    console.log(timeStamp + ': Increment=' + increment);
                }
            }
            setSolution2(timeStamp);
        }

        fetch(inputData)
        .then(r => r.text())
        .then(t => String(t).split('\n').map(r => r.trim())) 
        .then(t => solve1(t));

        fetch(inputData)
        .then(r => r.text())
        .then(t => String(t).split('\n').map(r => r.trim())) 
        .then(t => solve2(t));
    }, []);
    
    return (
        <div>
            <div className='solution' >
                <div>
                    <b>Day 13</b>
                    <br/>
                    Part 1: {solution1}
                    <br/>
                    Part 2: {solution2}
                </div>
            </div>
            {props.state ==='expanded' && (
                <div className='sidepanel' value={''} readOnly={true} />
            )}
        </div>
    )
}