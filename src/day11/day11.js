import inputData from './input1.txt'
import React, {useState, useEffect} from 'react'


export default function Day11(props) {
    const [solution1, setSolution1] = useState('Unsolved');
    const [solution2, setSolution2] = useState('Unsolved');
    
    useEffect( () => {
        function solve1and2(lines) {
            console.log('Solve 1');
            function neighbours(row, col) {
                let result = [];
                for (let r = row-1; r<=row+1; r++) {
                    for (let c=col-1; c<=col+1; c++) {
                        if (r>=0 && r<lines.length && c>=0 && c<lines[0].length) {
                            result.push({r,c});
                        }
                    }
                }
                return result;
            }

            for (let r in lines) {
                for (let c in r) {
                    let occupied = neighbours(r,c).filter(p => lines[p.r][p.c] ==='#');
                    
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
                    <b>Day 11</b>
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