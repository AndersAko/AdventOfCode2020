import inputData from './input.txt'
import React, {useState, useEffect} from 'react'


export default function Day7(props) {
    const [solution1, setSolution1] = useState('Unsolved');
    const [solution2, setSolution2] = useState('Unsolved');
    
    useEffect( () => {
        // function log(...message) {
        //     sidePanelText = sidePanelText.concat('\n', ...message);
        //     setSidePanel(sidePanelText);
        // }

        function solve1and2(lines) {
            console.log('Solve 1 & 2');
            let outerBagRules = {};     // { bag:  [outerbag1, outerbag2]}
            let InnerBagRules = {};     // bag: [{descr: innerbag1, num: <count>}]  
           for (let rule of lines ) {
                let reOuterBag = /(?<otherbag>\w+ \w+) bags contain (?<innerbags>.*)/; 
                let reInnerBag = /(?<num>\d+) (?<innerbag>\w+ \w+)/; 
                let outerbagDescr = rule.match(reOuterBag).groups['otherbag'];
                
                for (let innerBagText of rule.match(reOuterBag).groups['innerbags']?.split(',')) {
                    let innerBagMatch = innerBagText.match(reInnerBag);
                    if (!innerBagMatch) {
                        console.log("Innerbag description didn't match, skipped", innerBagText);
                        continue;
                    }
                    let innerBagNum = innerBagMatch.groups['num'];
                    let innerBagDescr = innerBagMatch.groups['innerbag'];
                    if (outerBagRules[innerBagDescr]) {
                        outerBagRules[innerBagDescr].push(outerbagDescr);
                    } else {
                        outerBagRules[innerBagDescr] = [outerbagDescr];
                    }
                    if (InnerBagRules[outerbagDescr]) {
                        InnerBagRules[outerbagDescr].push({descr: innerBagDescr, num: innerBagNum});
                    } else {
                        InnerBagRules[outerbagDescr] = [{descr: innerBagDescr, num: innerBagNum}];
                    }
                    
                    console.log("RULE: " + outerbagDescr + " contains " + innerBagNum, innerBagDescr);
                }
            }
            // Until no parents: Get outer bags of "shiny gold"; Get outer bags of these
            function listOuterBags(bag) {
                let bagsFound = [bag];
                for (let outerBag of outerBagRules[bag]||[]) {
                    bagsFound = bagsFound.concat(listOuterBags(outerBag));
                } 
                return bagsFound;
            }
            let possibleBags = listOuterBags('shiny gold');
            console.log ("Possible outer bags", possibleBags, "reduced to", new Set(possibleBags))
            setSolution1(new Set(possibleBags).size -1);

            function countInnerBags(bag) {
                let count = 1; // This bag
                for (let innerbag of InnerBagRules[bag]||[]) {
                    count += innerbag.num * countInnerBags(innerbag.descr);
                }
                return count;
            }
            setSolution2(countInnerBags('shiny gold')-1);
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
                    <b>Day 7</b>
                    <br/>
                    Part 1: {solution1}
                    <br/>
                    Part 2: {solution2}
                </div>
            </div>
            {props.state ==='expanded' && (
                <textarea className='sidepanel' value={''} readOnly={true} />
            )}
        </div>
    )
}