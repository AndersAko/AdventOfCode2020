import inputData from './input.txt'
import React, {useState, useEffect} from 'react'



export default function Day25(props) {
    const [solution1, setSolution1] = useState('Solving...');

    
    useEffect( () => {
        function solve1and2(lines) {
            console.log('Solve 1');

            let publicCard = parseInt(lines[0]);
            let publicDoor = parseInt(lines[1]);
            console.log('Public card: '+publicCard+' , public door: '+publicDoor);
            let valueCard = 1;
            let valueDoor = 1;
            let loopCard, loopDoor;
            for (let i=1; i< 10000000; i++) {
                if (!loopCard) {
                    valueCard = valueCard * 7 % 20201227;
                    if (valueCard === publicCard) loopCard = i;
                }
                if (!loopDoor) {
                    valueDoor = valueDoor * 7 % 20201227;
                    if (valueDoor === publicDoor) loopDoor = i;
                }
            }
            console.log('Card: ', loopCard, 'Door: ', loopDoor);
            let key = 1;
            for (let i=0; i<loopDoor; i++) key = key * publicCard % 20201227;
            let key2 = 1;
            for (let i=0; i<loopCard; i++) key2 = key2 * publicDoor % 20201227;
            console.log(key, key2);
            setSolution1(key);
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
                    <b>Day 25</b>
                    <br/>
                    Part 1: {solution1}
                </div>
            </div>
            {props.state ==='expanded' && (
                <div className='sidepanel' value={''} readOnly={true} />
            )}
        </div>
    )
}