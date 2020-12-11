import inputData from './input.txt'
import React, {useState, useEffect} from 'react'


export default function Day11(props) {
    const [solution1, setSolution1] = useState('Unsolved');
    const [solution2, setSolution2] = useState('Unsolved');
    
    useEffect( () => {
        function solve1and2(lines) {
            console.log('Solve 1');
            function neighbours(row, col) {
                row = +row; col = +col;
                let result = [];
                for (let r = row-1; r<=row+1; r++) {
                    for (let c=col-1; c<=col+1; c++) {
                        if (r>=0 && r<lines.length && c>=0 && c<lines[0].length && (r!==row || c!==col) ) {
                            result.push({r,c});
                        }
                    }
                }
                return result;
            }
            function occupiedInSight(row, col) {
                row = +row; col = +col;
                let occupiedCount = 0;
                for (let dr = -1; dr<=+1; dr++) {
                    for (let dc=-1; dc<=+1; dc++) {
                        if (dr===0 && dc===0) continue;
                        let occupied = false;
                        let dist = 1;
                        while (row+dr*dist>=0 && row+dr*dist<lines.length && col+dc*dist>=0 && col+dc*dist<lines[0].length) {
                            if (seats[row+dr*dist][col+dc*dist] ==='#') {
                                occupied=true;
                                break;
                            }
                            if (seats[row+dr*dist][col+dc*dist] ==='L') break;

                            dist++;
                        }
                        if (occupied) occupiedCount++;
                    }
                }
                return occupiedCount;
            }

            function checkConfigs( occupiedFunc, occupiedLimit) {
                let configurations = new Set();
                while (true) {
                    let next = seats.map(x => x.slice());
    
                    for (let r in seats) {
                        for (let c in seats[r]) {
                            let occupied = occupiedFunc(r,c);
                            if (seats[r][c] === 'L' && occupied===0) next[r][c]='#';
                            else if (seats[r][c] === '#' && occupied>=occupiedLimit) next[r][c]='L';
                        }
                        // console.log(next[r].join(''));
                    }
                    // console.log('');
                    let stringifiedNext = JSON.stringify(next);
                    if (configurations.has(stringifiedNext)) {
                        let seatsTaken = next.reduce((count, x) => count + x.reduce( (count,y) => count + (y==='#'?1:0), 0 ),0);
                        console.log('Same config seen before', seatsTaken);
                        return seatsTaken;
                    }
                    configurations.add(stringifiedNext);
                    seats = next;
                }
    
            }

            let seats = lines.map(x => Array.from(x));
            let seatsTaken = checkConfigs ( (r,c) => neighbours(r,c).filter(p => seats[p.r][p.c] ==='#').length, 4)
            setSolution1(seatsTaken);

            seats = lines.map(x => Array.from(x));
            seatsTaken = checkConfigs ( occupiedInSight, 5);
            setSolution2(seatsTaken);

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