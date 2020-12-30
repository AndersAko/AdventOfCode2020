import inputData from './input.txt'
import React, {useState, useEffect} from 'react'


export default function Day9(props) {
    const [solution1, setSolution1] = useState('Unsolved');
    const [solution2, setSolution2] = useState('Unsolved');
    
    useEffect( () => {
        function solve1and2(lines) {
            console.log('Solve 1');
            lines.push('0');
            let maxAdapter = Math.max(...lines)+3;
            lines.push((maxAdapter).toString());

            lines.sort((a,b) => a-b);
            let count1=0, count3=0;
            for (let index=1; index<lines.length; index++) {
                if (lines[index]-lines[index-1] === 1) {
                    count1++;
                } else if (lines[index]-lines[index-1] === 3) {
                    count3++;
                } else {
                    console.log('Gap of ', lines[index]-lines[index-1]);
                }

            }
            console.log('Differences of 1: '+count1+', diff of 3: '+count3);
            setSolution1(count1*count3);

            console.log('Solve 2');
            function combinationsFrom(tryIndex) {
                if (cache[tryIndex]) {return cache[tryIndex];}
                // console.log('CombinationsFrom ', tryIndex, lines[tryIndex]);
                let combinations = 0;
                let tryValue = +lines[tryIndex];
                for (let i = tryIndex+1; lines[i] <= tryValue+3 && i < lines.length; i++) {
                    if (i===lines.length-1) {
                        return 1;
                    }
                    combinations += combinationsFrom(i);
                }
                cache[tryIndex] = combinations;
                return combinations;
            }
            let cache = {};
            let count=combinationsFrom(0);

            setSolution2(count);

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
                    <b>Day 10</b>
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