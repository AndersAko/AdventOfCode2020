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

        function solve1(lines) {
            console.log('Solve 1');
            let count = 0;
            setSolution1(count);
        }

        function solve2(lines) {
            console.log('Solve 2');
            let count = 0;
            setSolution2(count);
        }

        fetch(inputData)
        .then(r => r.text())
        .then(t => String(t).split('\n').map(r => r.trim())) 
        .then(t => solve1(t));

        fetch(inputData)
        .then(r => r.text())
        .then(t => String(t).split('\n').map(r => r.trim())) 
        .then(t => solve2(t) );
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