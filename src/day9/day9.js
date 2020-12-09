import inputData from './input.txt'
import React, {useState, useEffect} from 'react'


export default function Day9(props) {
    const [solution1, setSolution1] = useState('Unsolved');
    const [solution2, setSolution2] = useState('Unsolved');
    
    useEffect( () => {
        function solve1and2(lines) {
            console.log('Solve 1');
            let preambleLength = 25;
    
            function isValid(x, preamble) {
                for (let dig1 of preamble) {
                    for (let dig2 of preamble) {
                        if (dig1 !== dig2 && parseInt(x) === parseInt(dig1)+parseInt(dig2)) {
                            return true;
                        }
                    }
                }
                return false;
            }

            let startIndex = 0;
            for (let digit of lines.slice(preambleLength)) {
                let preamble = lines.slice(startIndex,startIndex+preambleLength);
                startIndex ++;
                if (!isValid(digit, preamble)) {
                    console.log(digit, 'is not valid according to ', preamble);
                    setSolution1(digit);
                    var part1Digit = parseInt(digit);
                }
            }
            console.log('Solve2', part1Digit);

            function validSequence(startingAtIndex) {
                let sum = 0;
                for (let index = startingAtIndex; index<lines.length; index++) {
                    sum += parseInt(lines[index]);
                    if (sum === part1Digit && index !==startingAtIndex) return {start: startingAtIndex, end: index};
                    if (sum > part1Digit) return false;
                }
                return false;
            }
            for (let index = 0; index<lines.length; index++) {
                let seq = validSequence(index)
                if (seq) {
                    console.log('Valid sequence at ', index, 'to', seq['end'], '= '+lines[seq.start]+' to '+lines[seq.end] );
                    let sequence = lines.slice(seq.start, seq.end+1);
                    console.log(sequence, Math.min(...sequence), Math.max(...sequence));
                    setSolution2(Math.min(...sequence) + Math.max(...sequence))
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
                    <b>Day 9</b>
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