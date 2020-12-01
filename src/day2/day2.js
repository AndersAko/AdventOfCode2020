import inputData from './input.txt'
import React, {useState} from 'react'

function solve1(expenses) {
    return 'Not found';
}

function solve2(expenses) {
    return 'Not found';
}

export default function Day1(props) {
    const [solution1, setSolution1] = useState('Unsolved');
    const [solution2, setSolution2] = useState('Unsolved');

    fetch(inputData)
        .then(r => r.text())
        .then(t => String(t).split('\n')) 
        .then(t => setSolution1(solve1(t)));

    fetch(inputData)
        .then(r => r.text())
        .then(t => String(t).split('\n')) 
        .then(t => setSolution2(solve2(t)));

    return (
        <div>
            <b>Day 2</b><br/>
            Part 1: {solution1}
            <br/>
            Part 2: {solution2}
        </div>
    )
}