import inputData from './input.txt'
import React, {useState, useEffect} from 'react'

export default function Day16(props) {
    const [solution1, setSolution1] = useState('Unsolved');
    const [solution2, setSolution2] = useState('Solving...');
    
    useEffect( () => {
        function solve1and2(lines) {
            console.log('Solve 1');

            // Parse
            let lineNo = 0;
            let rules =[];
            while (lines[lineNo]) {
                let fieldName = lines[lineNo].split(':')[0];
                for (let rule of lines[lineNo].split(' ')) {
                    let m = rule.match(/(\d+)-(\d+)/);
                    if (m) {
                        rules.push({fieldName, min: +m[1], max: +m[2]});
                    }
                }
                lineNo++;
            }
            lineNo++;
            console.log('---'+lines[lineNo]);
            lineNo++;
            let myTicket = lines[lineNo].split(',');
            lineNo++;
            lineNo++;
            console.log('---'+lines[lineNo]);
            lineNo++;

            let nearbyTickets = [];
            while (lines[lineNo]) {
                nearbyTickets.push(lines[lineNo].split(','));
                lineNo++;
            }
            console.log(nearbyTickets.length)

            // Check invalid
            function isPossiblyValid(value) {
                for (let rule of rules) {
                    if (value >= rule.min && value <= rule.max) return true;
                }
                return false;
            }

            let scanningRate = 0;
            for (let ticketNo in nearbyTickets) {
                for (let slot in nearbyTickets[ticketNo]) {
                    let value = +nearbyTickets[ticketNo][slot];
                    if (!isPossiblyValid(value)) {
                        scanningRate += value;
                        delete nearbyTickets[ticketNo];
                        break;
                    }
                }
            }
            setSolution1(scanningRate);
            nearbyTickets = nearbyTickets.filter(x => x);
            console.log(nearbyTickets.length)

            console.log('Solve 2');
            function possibleFields(value, includeRules) {
                if (!value) console.log('possibleRules('+value+', '+includeRules);

                let result = [];
                for (let rule of rules) {
                    if (!includeRules || includeRules.includes(rule.fieldName)) {
                        if (value >= rule.min && value <=rule.max) result.push(rule.fieldName);
                    }
                }
                if (!result.length) console.log('possibleRules('+value+', '+includeRules+' returns []');
                return result;
            }

            let rulesPerSlot = [];
            for (let i in myTicket) {
                console.log('Ticket slot: '+i);
                let fields;
                for (let ticket of nearbyTickets) {
                    if (ticket) fields = possibleFields(+ticket[i], fields);
                }
                rulesPerSlot[i] = {i, fields};
            }

            rulesPerSlot = rulesPerSlot.sort((a,b) => a.fields.length - b.fields.length);
            for (let i in myTicket) {
                console.log(i, rulesPerSlot[i]);
            }

            let configs = possibleConfigurations([], 0);

            function possibleConfigurations(fieldsSoFar, nextSlotIndex) {
                if (nextSlotIndex >= rulesPerSlot.length) return [fieldsSoFar];

                let configs=[];
                for (let slotField of rulesPerSlot[nextSlotIndex].fields) {
                    if (!fieldsSoFar.some(x => x.slotField === slotField)) {
                        configs = configs.concat( 
                            possibleConfigurations( 
                                fieldsSoFar.concat({ slot: rulesPerSlot[nextSlotIndex].i, slotField } ), nextSlotIndex+1) 
                        );
                    }
                }
                return configs
            }

            console.log(configs); 
            
            let answer = 1;
            for (let f of configs[0]) {
                if (f.slotField.startsWith('departure') ) {
                    console.log(f.slotField + ': ' + myTicket[f.slot]);
                    answer *= +myTicket[f.slot];
                }
                console.log()
            }
            setSolution2(answer);

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
                    <b>Day 16</b>
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