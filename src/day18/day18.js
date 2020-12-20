import inputData from './input.txt'
import React, {useState, useEffect} from 'react'



export default function Day17(props) {
    const [solution1, setSolution1] = useState('Solving...');
    const [solution2, setSolution2] = useState('Solving...');

    function operate(arg1, arg2, op) {
        if (arg1 === undefined) return arg2;
        switch(op) {
            case '+':
                return arg1 + arg2;
            case '-':
                return arg1 - arg2;
            case '*':
                return arg1 * arg2;
            case '/':
                return arg1 / arg2;
            default:
                console.log('Invalid operator', op);
        }
    }

    useEffect( () => {
        function solve1(lines) {
            console.log('Solve 1');

            function evaluate(tokens) {
                let result;
                let operator;
                for (let i=0; i<tokens.length; i++) {
                    let token = tokens[i][0];
                    if (token.match(/\d+/)) {
                        result = operate(result, parseInt(token), operator);
                    } else if (token.match(/[*+-/]/)) {
                        operator = token;
                    } else if (token ==='(') {
                        let lparams = 1;
                        let j = i+1
                        while (lparams > 0) {
                            if (tokens[j][0] === '(') lparams++;
                            if (tokens[j][0] === ')') lparams--;
                            j++;
                        }
                        result = operate(result, evaluate(tokens.slice(i+1, j-1)), operator);
                        i=j;
                    } else if (token && token !==' ') {
                        console.log('Invalid token', token);
                    }
                }
                return result;
            }

            let sum = 0;
            for (let line of lines) {
                let tokens = [...line.matchAll(/(\d+|[()*+-/ ]?)/g)];
                let result = evaluate(tokens);
                sum += result;
                console.log (line + ' = '+ result);
            }
            setSolution1(sum);
        }

        function solve2(lines) {
            console.log('Solve 2');

            function evaluate(tokens) {
                let result;
                let operator;
                for (let i=0; i<tokens.length; i++) {
                    let token = tokens[i][0];
                    if (token.match(/\d+/)) {
                        result = operate(result, parseInt(token), operator);
                    } else if (token.match(/[*+-/]/)) {
                        operator = token;
                    } else if (token ==='(') {
                        let lparams = 1;
                        let j = i+1
                        while (lparams > 0) {
                            if (tokens[j][0] === '(') lparams++;
                            if (tokens[j][0] === ')') lparams--;
                            j++;
                        }
                        result = operate(result, evaluate(tokens.slice(i+1, j-1)), operator);
                        i=j;
                    } else if (token && token !==' ') {
                        console.log('Invalid token', token);
                    }
                }
                return result;
            }

            let sum = 0;
            for (let line of lines) {
                let tokens = [...line.matchAll(/(\d+|[()*+-/ ]?)/g)];
                let result = evaluate(tokens);
                sum += result;
                console.log (line + ' = '+ result);
            }
            setSolution2(sum);
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
                    <b>Day 18</b>
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