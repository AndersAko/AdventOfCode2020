import inputData from './input1.txt'
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

        function solve1(lines) {
            console.log('Solve 1');
            let passport = [];
            for(let line of lines) {
                if (line ==='') {
                    console.log('Checking passport: ', passport);
                    passport=[];
                } else {
                    let re = /(\w+):\w+/;
                    let fields = line.split(' ').map(f => re.exec(f)[1]);
                    passport.concat(fields);
                }
            }

            // setSolution1(count);
        }

        function solve2(lines) {
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
                <div>
                    <b>Day 4</b>
                    <br/>
                    Part 1: {solution1}
                    <br/>
                    Part 2: {solution2}
                </div>
            </div>
            {props.state ==='expanded' && (
                <textarea className='sidepanel' value={sidePanel} readOnly={true} />
            )}
        </div>
    )
}