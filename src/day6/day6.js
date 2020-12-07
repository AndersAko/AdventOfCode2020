import inputData from './input.txt'
import React, {useState, useEffect} from 'react'


export default function Day6(props) {
    const [solution1, setSolution1] = useState('Unsolved');
    const [solution2, setSolution2] = useState('Unsolved');
    
    useEffect( () => {
        // function log(...message) {
        //     sidePanelText = sidePanelText.concat('\n', ...message);
        //     setSidePanel(sidePanelText);
        // }

        function solve1and2(lines) {
            console.log('Solve 1 & 2');
            let count1 = 0, count2=0;
            let groupAnswers; 
            let groupAnswersAllYes; 
            let firstline = true;

            for (let line of lines) {
                if (line !=='') {
                    let answers=line.split('');
                    if (firstline) {
                        groupAnswers = new Set(answers);
                        groupAnswersAllYes = new Set(answers);
                        firstline = false;
                    } else {
                        // Check groupAnswersAllYes, remove any missing in answers
                        groupAnswersAllYes = new Set([...groupAnswersAllYes].filter(a => answers.includes(a)));
                        // Add answers to groupAnswers
                        groupAnswers = new Set([...groupAnswers].concat(answers));
                        // answers.forEach(answer => groupAnswers.add(answer));
                    }
                } else {
                    console.log('Group answers:', groupAnswers, groupAnswers.size);
                    count1 += groupAnswers.size
                    console.log('Group yes answers:', groupAnswersAllYes, groupAnswersAllYes.size);
                    count2 += groupAnswersAllYes.size
                    firstline = true;
                }
            }   
            setSolution1(count1);
            setSolution2(count2);
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
                    <b>Day 6</b>
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