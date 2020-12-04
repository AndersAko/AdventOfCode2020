import inputData from './input.txt'
import React, {useState, useEffect} from 'react'


export default function Day2(props) {
    function solve1(passwords) {
        console.log('Solve 1');
        
        let count = 0;
        for (let word of passwords) {
            let re = /(\d+)-(\d+) (\w): (\w+)/g
            let match = re.exec(word);
            //
            let min = parseInt(match[1]);
            let max = parseInt(match[2]);
            let letter = match[3];
            let password = match[4];
            let lettercount = 0;
            for (let char of password) {
                if (char ===letter) {
                    lettercount++;
                }
            }
            if (lettercount >= min && lettercount <= max) {
                count++;
            } else {
            }
        }
        setSolution1(count);
        return passwords;
    }
    
    function solve2(passwords) {
        console.log('Solve 2');
        
        let count = 0;
        for (let word of passwords) {
            let re = /(\d+)-(\d+) (\w): (\w+)/g
            let match = re.exec(word);
            let first = parseInt(match[1]);
            let second = parseInt(match[2]);
            let letter = match[3];
            let password = match[4];
            if ( (password[first-1]===letter) !== (password[second-1]===letter)) {
                count++;
            }
        }
        setSolution2(count);
        return passwords;
    }
    const [solution1, setSolution1] = useState('Unsolved');
    const [solution2, setSolution2] = useState('Unsolved');

    useEffect( () => {
        fetch(inputData)
        .then(r => r.text())
        .then(t => String(t).split('\n')) 
        .then(t => solve1(t) )
        .then(t => solve2(t) );
    }, [solution1, solution2]);
    
    return (
        <div>
            <b>Day 2</b><br/>
            Part 1: {solution1}
            {props.state ==='expanded' && (<><br/> </>) }
            <br/>
            Part 2: {solution2}
        </div>
    )
}