import inputData from './input.txt'
import React, {useState, useEffect} from 'react'



export default function Day24(props) {
    const [solution1, setSolution1] = useState('Solving...');
    const [solution2, setSolution2] = useState('Solving...');

    
    useEffect( () => {
        function solve1and2(lines) {
            console.log('Solve 1');

            let tiles = {};
            let min = {}, max = {};
            for (let line of lines) {
                if (!line) continue;
                let [x,y] = [0,0];
                for (let dir of line.matchAll(/(e|se|sw|w|nw|ne)/g)) {
                    switch (dir[1]) {
                        case 'e':
                            x += 2;
                            break;
                        case 'se':
                            x += 1; y -= 1;
                            break;
                        case 'sw':
                            x -= 1; y-=1;
                            break;
                        case 'w':
                            x -= 2;
                            break;
                        case 'nw':
                            x -= 1; y += 1;
                            break;
                        case 'ne':
                            x += 1; y += 1;
                            break;
                        default:
                            ;
                    }
                }
                let coord = x+','+y;
                tiles[coord] = ((tiles[coord]??0) + 1)%2;
                min = {x: Math.min(min.x??x,x), y: Math.min(min.y??y,y)};
                max = {x: Math.max(max.x??x,x), y: Math.max(max.y??y,y)};
                // console.log('Instr: '+line+' leads to '+coord+' with '+tileFlips[coord]+' flips');
            }
            let count = 0;
            for (let flips in tiles) {
                count += tiles[flips];
            }
            console.log('Initial: ', count, 'tiles are black', min, max, 
                        Object.keys(tiles).reduce( (a,c) => a + (tiles[c]?1:0),0 ));
            setSolution1(count);
            function getBlackNeighbors(tiles, x0,y0) {
                let count = 0;
                let check = 0;
                for (let x = x0-2; x <= x0+2; x++) {
                    for (let y = y0-1; y <= y0+1; y++) {
                        if ( (x+y)%2 === 1 || (x+y)%2 === -1 || (x===x0 && y ===y0) ) continue;
                        if (tiles[x+','+y]) count++;
                        check++;
                    }
                }
                if (check !== 6) console.log('Neighbors of '+x0+','+y0+' = '+count, check);
                return count;
            }

            console.log('Solve 2');
            for (let day = 1; day <= 100; day++) {
                let next = {};
                for (let x = min.x-2; x <= max.x+2; x++) {
                    for (let y = min.y - 1; y <= max.y+1; y++) {
                        if ( (x+y)%2 === 1 || (x+y)%2 === -1) continue;
                        let neighbors = getBlackNeighbors(tiles,x,y);
                        if ((tiles[x+','+y] && neighbors === 1) || neighbors === 2) {
                            next[x+','+y] = 1;
                            min = {x: Math.min(min.x??x,x), y: Math.min(min.y??y,y)};
                            max = {x: Math.max(max.x??x,x), y: Math.max(max.y??y,y)};
                        }
                    }
                }
                tiles = next;
                console.log('Day '+day+' - Black tiles: '+Object.keys(next).reduce( (a,c) => a + next[c],0 ), next);
            }
            setSolution2(Object.keys(tiles).reduce( (a,c) => a + (tiles[c]?1:0),0 ))
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
                    <b>Day 24</b>
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