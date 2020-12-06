import inputData from './input.txt'
import React, {useState, useEffect} from 'react'


export default function Day4(props) {
    const [solution1, setSolution1] = useState('Unsolved');
    const [solution2, setSolution2] = useState('Unsolved');
    
    useEffect( () => {
        // function log(...message) {
        //     sidePanelText = sidePanelText.concat('\n', ...message);
        //     setSidePanel(sidePanelText);
        // }

        function solve1and2(lines) {
            console.log('Solve 1');

            function getSeatId(l) {
                return parseInt(l.replaceAll('B', '1').replaceAll('F', '0').replaceAll('R', 1).replaceAll('L', 0), 2);
            }
            let min = Math.min(...lines.map(getSeatId));
            let max = Math.max(...lines.map(getSeatId));
            setSolution1(max);
            console.log('Max: ', max, 'Min', min);
            for (let seatId = min; seatId< max; seatId++) {
                if (!lines.map(getSeatId).includes(seatId)) {
                    let seat = seatId.toString(2).replaceAll('1', 'B').replaceAll('0','F').replaceAll('1','R').replaceAll('0', 'L')
                    console.log('Seat ', seatId, seat, 'is not taken');
                    setSolution2(seatId);
                }
            }
        }

        fetch(inputData)
        .then(r => r.text())
        .then(t => String(t).split('\n').map(r => r.trim())) 
        .then(t => solve1and2(t));
    }, []);
    
    return (
        <div>
            <div className='solution' >
                <div>
                    <b>Day 5</b>
                    <br/>
                    Part 1: {solution1}
                    <br/>
                    Part 2: {solution2}
                </div>
            </div>
            {props.state ==='expanded' && (
                <textarea className='sidepanel' value={''} readOnly={true} />
            )}
        </div>
    )
}