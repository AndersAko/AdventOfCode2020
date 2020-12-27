import inputData from './input.txt'
import React, {useState, useEffect} from 'react'



export default function Day21(props) {
    const [solution1, setSolution1] = useState('Solving...');
    const [solution2, setSolution2] = useState('Solving...');

    
    useEffect( () => {
        function solve1(lines) {
            console.log('Solve 1');
        }

        fetch(inputData)
        .then(r => r.text())
        .then(t => String(t).split('\n').map(r => r.trim())) 
        .then(t => solve1(t));
    }, []);
    
    return (
        <div>
            <div className='solution' >
                <div>
                    <b>Day 21</b>
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