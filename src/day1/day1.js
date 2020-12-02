import inputData from './input.txt'
import React, {useState, useEffect} from 'react'


export default function Day1(props) {
    function solve1(expenses) {
        for (let expense1 of expenses) {
            for (let expense2 of expenses) {
                if (parseInt(expense1) + parseInt(expense2) === 2020) {
                    setSolution1(parseInt(expense1) * parseInt(expense2));
                    return expenses;
                }
            }
        }
        setSolution1('Not found');
        return expenses;
    }
    
    function solve2(expenses) {
        for (let expense1 of expenses) {
            for (let expense2 of expenses) {
                for (let expense3 of expenses) {
    
                    if (parseInt(expense1) + parseInt(expense2) + parseInt(expense3) === 2020) {
                        setSolution2(parseInt(expense1) * parseInt(expense2) * parseInt(expense3));
                        return expenses;
                    }
                }
            }
        }
        setSolution2('Not found');
        return expenses;
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
            <b>Day1</b><br/>
            Part 1: {solution1}
            <br/>
            Part 2: {solution2}
        </div>
    )
}