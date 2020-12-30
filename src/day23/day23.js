import inputData from './input.txt'
import React, {useState, useEffect} from 'react'



export default function Day23(props) {
    const [solution1, setSolution1] = useState('Solving...');
    const [solution2, setSolution2] = useState('Solving...');

    
    useEffect( () => {
        function * getCups(cups, cup, num) {
            let starting = cup;
            let n = num;
            do {
                yield(cup);
                cup = cups[cup];
            } while(cup !== starting && (n===undefined || --n) )
        }

        function print(cups, header, cup, num) {
            let output = header;
            let gen = getCups(cups, cup, num);
            let result = gen.next();
            while (!result.done) {
                output  += `${result.value} `;
                result = gen.next();
            }
            console.log(output);
        }

        function solve1(lines) {
            console.log('Solve 1');
            let cupInput = lines[0].split('');
            let cups = [];

            // cups[i] pekar på nästa kopp
            for (let i=0; i<cupInput.length; i++) {
                cups[+cupInput[i]] = +(cupInput[i+1]??cupInput[0]);
            }
            let maxCup = cups.length-1;
            let current = +cupInput[0];

            print(cups, 'cups: ', current);

            function move() {
                let picked = cups[current];
                cups[current] = cups[cups[cups[picked]]];
                let dest = (current-1) || maxCup;
                while (dest === picked || dest === cups[picked] || dest === cups[cups[picked]]) {
                    dest = dest - 1 || maxCup;
                }
                cups[cups[cups[picked]]] = cups[dest];
                cups[dest] = picked;
                current = cups[current];
           }
           for (let i=1; i<=100; i++) {
            //    console.log('Move '+i);
               move();
            }

            print(cups, 'cups: ', current);

            let answer = '';
            for (let c of getCups(cups, 1)) answer+=c;
            console.log('Answer: ', answer.substr(1));
            setSolution1(answer.substr(1));
        }

        function solve2(lines) {
            console.log('Solve 2');
            let cupInput = lines[0].split('');
            let cups = [];

            // cups[i] pekar på nästa kopp
            for (let i=0; i<cupInput.length; i++) {
                cups[+cupInput[i]] = +(cupInput[i+1]??10);
            }
            for (let i=10; i<1000000; i++) {
                cups[i]=i+1;
            }
            cups[1000000]=+cupInput[0];

            let maxCup = cups.length-1;
            let current = +cupInput[0];

            print(cups, 'cups: ', current);

            function move() {
                let picked = cups[current];
                cups[current] = cups[cups[cups[picked]]];
                let dest = (current-1) || maxCup;
                while (dest === picked || dest === cups[picked] || dest === cups[cups[picked]]) {
                    dest = dest - 1 || maxCup;
                }
                cups[cups[cups[picked]]] = cups[dest];
                cups[dest] = picked;
                current = cups[current];
           }
           for (let i=1; i<=10000000; i++) {
               if (i%1000000 === 0) console.log('Move '+i);
               move();
            }

            print(cups, 'cups: ', current, 100);
            print(cups, 'Cups 1 to 3: ', 1, 3);
            setSolution2(cups[1]*cups[cups[1]]);
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
                    <b>Day 23</b>
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