import inputData from './input.txt'
import React, {useState, useEffect} from 'react'


export default function Day12(props) {
    const [solution1, setSolution1] = useState('Unsolved');
    const [solution2, setSolution2] = useState('Unsolved');
    
    useEffect( () => {
        function solve1(lines) {
            console.log('Solve 1');
            let pos = {x: 0, y:0};  // x east, y north
            let dir = {x: 1, y:0};
            for (let line of lines) {
                let re = /(?<action>\w)(?<val>\d+)/;
                let match = line.match(re);
                // if (match) console.log(match.groups['action'], match.groups['val']);
                // else console.log('no match on ', line)
                let val = +match.groups['val'];
                switch (match.groups['action']) {
                    case 'N':
                        pos.y += val;
                        break;
                    case 'S':
                        pos.y -= val;
                        break;
                    case 'E':
                        pos.x += val;
                        break;
                    case 'W':
                        pos.x -= val;
                        break;
                    case 'F':
                        pos.x += dir.x * val;
                        pos.y += dir.y * val;
                        break;
                    case 'R':
                        val = -val;
                        // fallthrough
                    case 'L':
                        const toRad = (deg) => deg*Math.PI/180;
                        let ang = toRad(val);
                        let newDir = { 
                            x: dir.x*Math.cos(ang)-dir.y*Math.sin(ang),
                            y: dir.x*Math.sin(ang)+dir.y*Math.cos(ang)
                        }
                        dir = newDir;
                        break;
                    default:
                        console.log('Unknown action', match.groups['action']);
                }
                // console.log('Position: ', pos, 'facing', dir);
            }
            setSolution1(Math.round(Math.abs(pos.x) + Math.abs(pos.y)));
        }

        function solve2(lines) {
            console.log('Solve 2');
            let pos = {x: 0, y:0};  // x east, y north
            let dir = {x: 10, y:1}; // waypoint
            for (let line of lines) {
                let re = /(?<action>\w)(?<val>\d+)/;
                let match = line.match(re);
                if (match) console.log(match.groups['action'], match.groups['val']);
                else console.log('no match on ', line)
                let val = +match.groups['val'];
                switch (match.groups['action']) {
                    case 'N':
                        dir.y += val;
                        break;
                    case 'S':
                        dir.y -= val;
                        break;
                    case 'E':
                        dir.x += val;
                        break;
                    case 'W':
                        dir.x -= val;
                        break;
                    case 'F':
                        pos.x += dir.x * val;
                        pos.y += dir.y * val;
                        break;
                    case 'R':
                        val = -val;
                        // fallthrough
                    case 'L':
                        const toRad = (deg) => deg*Math.PI/180;
                        let ang = toRad(val);
                        let newDir = { 
                            x: dir.x*Math.cos(ang)-dir.y*Math.sin(ang),
                            y: dir.x*Math.sin(ang)+dir.y*Math.cos(ang)
                        }
                        dir = newDir;
                        break;
                    default:
                        console.log('Unknown action', match.groups['action']);
                }
                // console.log('Position: ', pos, 'waypoint', dir);
            }
            setSolution2(Math.round(Math.abs(pos.x) + Math.abs(pos.y)));
        }

        fetch(inputData)
        .then(r => r.text())
        .then(t => String(t).split('\n').map(r => r.trim())) 
        .then(t => solve1(t));

        fetch(inputData)
        .then(r => r.text())
        .then(t => String(t).split('\n').map(r => r.trim())) 
        .then(t => solve2(t));
    }, []);
    
    return (
        <div>
            <div className='solution' >
                <div>
                    <b>Day 12</b>
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