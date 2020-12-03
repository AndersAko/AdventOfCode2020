import inputData from './input.txt'
import React, {useState, useEffect} from 'react'


export default function Day4(props) {
    const [solution1, setSolution1] = useState('Unsolved');
    const [solution2, setSolution2] = useState('Unsolved');
    const [sidePanel, setSidePanel] = useState('');

    useEffect( () => {
        // function log(...message) {
        //     sidePanelText = sidePanelText.concat('\n', ...message);
        //     setSidePanel(sidePanelText);
        // }

        function solve1(trees) {
            console.log('Solve 1');
            // setSolution1(count);
        }

        function solve2(trees) {
            console.log('Solve 2');
            // setSolution2(answer);
        }

        let sidePanelText = '';

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
                <b>Day 4</b><br/>
                Part 1: {solution1}
                <br/>
                Part 2: {solution2}
            </div>
            {props.state ==='expanded' && (
                <textarea className='sidepanel' value={sidePanel} readOnly={true} />
            )}
        </div>
    )
}