import inputData from './input.txt'
import React, {useState, useEffect} from 'react'
/* global BigInt */

export default function Day14(props) {
    const [solution1, setSolution1] = useState('Unsolved');
    const [solution2, setSolution2] = useState('Unsolved');
    
    useEffect( () => {
        function solve1(lines) {
            console.log('Solve 1');

            let memory=[];
            let maskAnd, maskSet;
            for (let line of lines) {
                let re = /(?<cmd>mask|mem)(\[(?<adr>\d+)\])? = (?<val>[\dX]+)/;
                let match = line.match(re);
                let val = match?.groups['val'];

                switch (match && val && match?.groups['cmd']) {
                    case 'mask':
                        maskAnd = val.replaceAll('1','0').replaceAll('X','1');
                        maskAnd = BigInt(parseInt(maskAnd,2));
                        maskSet = val.replaceAll('X','0');
                        maskSet = BigInt(parseInt(maskSet,2));
                        break;
                    case 'mem':
                        let adr = match?.groups['adr'];
                        if (!adr) console.log('No address found');
                        let setValue = (BigInt(parseInt(val,10)) & maskAnd) | maskSet;
                        memory[adr] = setValue;
                        break;
                    default:
                        console.log('Unknown command or value', match?.groups['cmd'], val, 'in', line);
                } 
            }
            let sum = 0n;
            for (let cell in memory) {
                if (cell) sum += memory[cell];
            }
            setSolution1(sum.toString(10));
        }

        function solve2(lines) {
            // Store <value> in the addresses defined by fixedBits and floatingBits
            function storeValue(fixedBits, floatingBits, value) {
                if (!floatingBits) {
                    memory[fixedBits] = value;
                }
                for (let bit = 1n; bit <= floatingBits; bit = bit<<1n) {
                    if (floatingBits & bit) {
                        storeValue(fixedBits | bit, floatingBits^bit, value);   // Clear floating bit, set for both 0 and 1 in that bit
                        storeValue( (fixedBits|bit) ^bit, floatingBits^bit, value);
                        break;
                    }
                }
            }
            console.log('Solve 2');

            let memory=[];
            let maskAnd, maskSet;
            for (let line of lines) {
                let re = /(?<cmd>mask|mem)(\[(?<adr>\d+)\])? = (?<val>[\dX]+)/;
                let match = line.match(re);
                let val = match?.groups['val'];

                switch (match && val && match?.groups['cmd']) {
                    case 'mask':
                        maskAnd = val.replaceAll('1','0').replaceAll('X','1');
                        maskAnd = BigInt(parseInt(maskAnd,2));
                        maskSet = val.replaceAll('X','0');
                        maskSet = BigInt(parseInt(maskSet,2));
                        break;
                    case 'mem':
                        let adr = match?.groups['adr'];
                        if (!adr) console.log('No address found');
                        storeValue(BigInt(adr) | maskSet, maskAnd, BigInt(parseInt(val,10)));
                        break;
                    default:
                        console.log('Unknown command or value', match?.groups['cmd'], val, 'in', line);
                } 
            }
            let sum = 0n;
            for (let cell in memory) {
                if (cell) sum += memory[cell];
            }
            setSolution2(sum.toString(10));
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
                    <b>Day 14</b>
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