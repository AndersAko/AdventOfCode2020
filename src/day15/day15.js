import inputData from './input.txt'
import React, {useState, useEffect} from 'react'

export default function Day15(props) {
    const [solution1, setSolution1] = useState('Unsolved');
    const [solution2, setSolution2] = useState('Solving...');
    
    useEffect( () => {
        function solve1(lines) {
            console.log('Solve 1');
            let last=undefined;
            let spokenTurn = new Map(); 
            let turn = 0;
            for (let number of lines[0].split(',')) {
                spokenTurn.set(last, turn);

                number = parseInt(number,10);
                last = number;
                turn++;
            }

            let number;
            while (turn < 2020) {
                let lastSpoken = spokenTurn.get(last);
                number = lastSpoken ? turn - lastSpoken : 0;
                spokenTurn.set(last, turn);
                turn ++;
                // console.log(turn, number, last);
                last = number;
            }
            console.log('Last spoken number: ', number);
            setSolution1(number);
        }

        function solve2(lines) {
            console.log('Solve 2');
            let last=undefined;
            let spokenTurn = new Map(); 
            let turn = 0;
            for (let number of lines[0].split(',')) {
                spokenTurn.set(last, turn);

                number = parseInt(number,10);
                last = number;
                turn++;
            }

            let number;
            while (turn < 30000000) {
                let lastSpoken = spokenTurn.get(last);
                number = lastSpoken ? turn - lastSpoken : 0;
                spokenTurn.set(last, turn);
                turn ++;
                last = number;
                if (turn % 1000000 ===0) {
                    console.log(turn, number, spokenTurn.size);
                    setSolution2('Solving...'+turn/300000+'%');
                }
            }
            setSolution2(number);
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
                    <b>Day 15</b>
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