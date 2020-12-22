import inputData from './input2.txt'
import React, {useState, useEffect} from 'react'



export default function Day19(props) {
    const [solution1, setSolution1] = useState('Solving...');
    const [solution2, setSolution2] = useState('Solving...');

    
    useEffect( () => {
        function readRules(lines) {
            // read rules
            let allRules = new Map();
            let line=0;
            for (; line<lines.length; line++) {
                if (!lines[line]) break;
                let m = lines[line].match(/(\d+): (.*)/);
                if (!m || !m[1] || !m[2]) console.log ('No match for '+lines[line]+' ', m);
                let ruleSets = [];
                for (let ruleSet of m[2].split('|')) {
                    ruleSets.push(ruleSet.trim().split(' ').map(x => isNaN(parseInt(x))?x.replaceAll('"',''):parseInt(x)));
                }
                allRules.set(parseInt(m[1]), ruleSets);
            }
            return [allRules, line];
        }
        
        function solve(lines, allRules, line) {
            // allRules = Map(number, [rules, rules])   matches either of the 'rules' sequences
            // rules = [ruleNo, ruleNo, ruleNo]
            // return characters matched
            function doesMatchSequence(string, rules) {
                // console.log('doesMatchSequence: ', string, rules);
                let i=0;
                for (let subrule of rules) {
                    let remaining = string.substr(i);
                    if (typeof (subrule) === 'string') {
                        if (remaining.startsWith(subrule)) {
                            i += subrule.length;
                            continue;
                        }
                    } else {
                        let ruleOptions = allRules.get(subrule);
                        let found;
                        for (let r of ruleOptions) {
                            found = doesMatchSequence(remaining, r);
                            if (found) {
                                i += found;
                                break;    
                            }
                        }
                        if (found) continue;
                    }
                    return 0;
                }
                console.log('doesMatchSequence: ', string, rules, ' = ', i);
                return i;
            }

            let count = 0;
            for (line += 1; line < lines.length; line++) {
                let matchedChars = doesMatchSequence(lines[line], allRules.get(0)[0])
                if (matchedChars === lines[line].length) {
                    console.log(lines[line] + ' matches rule 0: '+allRules.get(0)[0]);
                    count++;
                } else {
                    console.log(lines[line] + ' DOES NOT match rule 0 '+allRules.get(0)[0]);
                }
            }
            return count;
        }

        function solve1(lines) {
            console.log('Solve 1');
            let [allRules, line] = readRules(lines);
            setSolution1(solve(lines, allRules, line));
        }

        function solve2(lines) {
            console.log('Solve 2');
            let [allRules, line] = readRules(lines);
            allRules.set(8, [[42], [42, 8]]);
            allRules.set(11, [[42, 31], [42, 11, 31]]); 

            setSolution2(solve(lines, allRules, line));
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
                    <b>Day 19</b>
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