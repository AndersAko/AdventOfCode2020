import inputData from './input.txt'
import React, {useState, useEffect} from 'react'



export default function Day21(props) {
    const [solution1, setSolution1] = useState('Solving...');
    const [solution2, setSolution2] = useState('Solving...');
    
    useEffect( () => {
        function solve1and2(lines) {
            console.log('Solve 1');
            
            let possibleIngredients = {};
            let allIngredients = [];
            for (let line of lines) {
                let p = line.match(/([\w ]+)\(contains ([\w+, ]+)/);
                if (!p) continue;
                allIngredients.push(...(p[1].trim().split(' ')));
                for (let allergen of p[2].split(',').map(x => x.trim())) {
                    if (possibleIngredients[allergen]) {
                        let ingredients = [];
                        for (let ingr of p[1].trim().split(' ')) {
                            if (possibleIngredients[allergen].includes(ingr)) {
                                ingredients.push(ingr);
                            }
                        }
                        possibleIngredients[allergen] = ingredients;
                    } else {
                        possibleIngredients[allergen] = p[1].trim().split(' ');
                    }
                }
            }
            let allergenics = Object.entries(possibleIngredients).map(x => x[1]).flat();
            let nonAllergenics = allIngredients.filter(x => !allergenics.includes(x));

            console.log('Possible ingredients: ', possibleIngredients);
            console.log ('All ingredients: ', allIngredients);
            console.log ('Allergencis ', allergenics);
            console.log('Non allergenics: ', nonAllergenics);
            setSolution1(nonAllergenics.length);


            let ingredientsList = Object.entries(possibleIngredients);

            let removedOne = true;
            while (removedOne) {
                removedOne = false;
                ingredientsList = ingredientsList.sort((a,b) => a[1].length - b[1].length);
                for (let i = 0; i< ingredientsList.length; i++ ) {
                    if (ingredientsList[i][1].length !== 1) {
                        console.log('Problem detected', ingredientsList[i])
                    } else {
                        for (let j = i+1; j< ingredientsList.length; j++) {
                            let indexToRemove = ingredientsList[j][1].indexOf(ingredientsList[i][1][0]);
                            if (indexToRemove !== -1) {
                                ingredientsList[j][1].splice(indexToRemove,1);
                                removedOne = true;
                            }
                        }
                    }
                }
            }
            console.log ('Actual ingredients/allergens ', ingredientsList);
            let answer = ingredientsList.sort( (a,b) => a[0].localeCompare(b[0])).map(x => x[1][0]).join(',');
            console.log ('Canonical ingredients list: '+answer);
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
                    <b>Day 21</b>
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