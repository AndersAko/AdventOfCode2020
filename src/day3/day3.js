import inputData from './input.txt'
import React, {useState, useEffect} from 'react'


export default function Day3(props) {
    const [solution1, setSolution1] = useState('Unsolved');
    const [solution2, setSolution2] = useState('Unsolved');
    const [sidePanel, setSidePanel] = useState('');

    useEffect( () => {
        function treecount(trees, right, down) {
            let x = 0;
            let count = 0;
            for (let rowcount = 0; rowcount<trees.length; rowcount+=down) {
                let row = trees[rowcount];
                let treeRow = Array(row.length * Math.floor(x/row.length)).fill('_').concat(Array.from(row));
                if (row[x % row.length] === '#') {
                    treeRow.splice(x, 1,'X');
                    count++;
                } else {
                    treeRow.splice(x, 1,'O');
                }
                // log(rowcount, treeRow.join(''));
                x +=right;
            }
            return count;
        }
      
        // function log(...message) {
        //     sidePanelText = sidePanelText.concat('\n', ...message);
        //     setSidePanel(sidePanelText);
        // }

        function solve1(trees) {
            console.log('Solve 1');
            let count = treecount(trees, 3, 1);
            setSolution1(count);
        }

        function solve2(trees) {
            console.log('Solve 2');
            let answer = treecount(trees, 1, 1) * treecount(trees, 3, 1) * treecount(trees, 5, 1) *
                treecount(trees, 7, 1) * treecount(trees, 1, 2);
            setSolution2(answer);
        }

        let sidePanelText = '';

        fetch(inputData)
        .then(r => r.text())
        .then(t => String(t).split('\n').map(r => r.trim())) 
        .then(t => solve1(t));

        fetch(inputData)
        .then(r => r.text())
        .then(t => String(t).split('\n').map(r => r.trim())) 
        .then(t => solve2(t) );
    }, []);
    
    return (
        <div>
            <div className='solution' >
                <div>
                    <b>Day 3</b><br/>
                    Part 1: {solution1}
                    <br/>
                    Part 2: {solution2}
                </div>
            </div>
            {props.state ==='expanded' && (
                <textarea className='sidepanel' value={sidePanel} readOnly={true} />
            )}
        </div>
    )
}