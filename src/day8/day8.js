import inputData from './input.txt'
import React, {useState, useEffect} from 'react'


export default function Day8(props) {
    const [solution1, setSolution1] = useState('Unsolved');
    const [solution2, setSolution2] = useState('Unsolved');
    
    useEffect( () => {
        function runProgram(statements) {
            function execute(statement) {
                let tokens = statement.split(' ');
                switch (tokens[0]) {
                    case 'acc':
                        acc += parseInt(tokens[1]);
                        break;
                    case 'jmp':
                        ip += parseInt(tokens[1]);
                        return;
                    case 'nop':
                        break;
                    default: 
                        console.log ("Illegal opcode", tokens[0], "in line", statement);
                }
                ip += 1;
            }

            let ip = 0, acc = 0;
            let executedLines = new Set();
            do {
                executedLines.add(ip);
                execute(statements[ip]);
                if (executedLines.has(ip)) {
                    console.log('Infinite loop detected in line ', ip);
                    return {status: 'InfiniteLoop', acc, ip };
                };
            } while (ip < statements.length);
            return {status: 'EndOK', acc, ip };
        }

        function solve1and2(lines) {
            console.log('Solve 1');

            let result = runProgram(lines);
            setSolution1(result.acc);

            for (let lineNo of lines.keys()) {
                let statements = [...lines];    // Copy program
                if (statements[lineNo].match(/^(nop) /)) {
                    statements[lineNo] = statements[lineNo].replace('nop', 'jmp');
                } else if (statements[lineNo].match(/^(jmp) /)) {
                    statements[lineNo] = statements[lineNo].replace('jmp', 'nop');
                }
                let result = runProgram(statements);
                if (result.status === 'EndOK') {
                    console.log('Program termnates by modiying line ', lineNo, lines[lineNo]);
                    setSolution2(result.acc);
                    break;
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
                    <b>Day 8</b>
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