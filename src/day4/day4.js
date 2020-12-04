import inputData from './input.txt'
import React, {useState, useEffect} from 'react'


export default function Day4(props) {
    const [solution1, setSolution1] = useState('Unsolved');
    const [solution2, setSolution2] = useState('Unsolved');
    
    useEffect( () => {
        // function log(...message) {
        //     sidePanelText = sidePanelText.concat('\n', ...message);
        //     setSidePanel(sidePanelText);
        // }

        function solve1(lines) {
            console.log('Solve 1');
            let passport = [];
            let count = 0;
            for(let line of lines) {
                let re = /(?<fld>\w+):(.+)/;
                let fields = line.split(' ').map(f => f.match(re)?.groups["fld"]).filter(f=> !!f);
                // console.log('Line: ', line, 'Fields: ', fields);
                if (fields && fields.length>0) {
                    passport = passport.concat(fields);
                } else {
                    let myPassport = passport;
                    let requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
                    if (requiredFields.every(f => myPassport.includes(f))) {
                        count ++;
                    }
                    passport=[];
                }
            }
            setSolution1(count);
        }

        function solve2(lines) {
            console.log('Solve 2');
            let passport = [];
            let count = 0;
            for(let line of lines) {
                let re = /(?<fld>\w+):(?<value>.+)/;
                let fields = line.split(' ')
                    .map(f => f.match(re)?.groups).filter(f=> f && f['fld']);
                // console.log('Line: ', line, 'Fields: ', fields);
                if (fields && fields.length>0) {
                    passport = passport.concat(fields);
                } else {
                    if (isValid(passport)) {
                        // console.log('OK');
                        count++;
                    } else {
                        // console.log('Not OK');
                    }
                    passport=[];
                }
            }
            setSolution2(count);

            function isValid(passport) {
                // console.log('Checking passport: ', passport);
                let requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
                if (!requiredFields.every(rf => passport.find(f => f['fld'] && f['fld'] === rf))) {
                    return false;
                }
                for (let field of passport) {
                    let value = field['value'];
                    switch (field['fld']) {
                        case 'byr':
                            if (value.length !== 4) return false;
                            if (!parseInt(value) || parseInt(value) < 1920 || parseInt(value) > 2002) {
                                return false;
                            }
                            break;
                        case 'iyr':
                            if (value.length !== 4) return false;
                            if (!parseInt(value) || parseInt(value) < 2010 || parseInt(value) > 2020) {
                                return false;
                            }
                            break;
                        case 'eyr':
                            if (value.length !== 4) return false;
                            if (!parseInt(value) || parseInt(value) < 2020 || parseInt(value) > 2030) {
                                return false;
                            }
                            break;
                        case 'hgt':
                            let m = value.match(/(\d+)(in|cm)/);
                            if (!m || !m[1] || !parseInt(m[1]) ) return false;
                            if (m[2] === 'in' && (parseInt(m[1]) < 59 || parseInt(m[1]) > 76) ) return false; 
                            if (m[2] === 'cm' && (parseInt(m[1]) < 150 || parseInt(m[1]) > 193) ) return false; 
                            break;
                        case 'hcl':
                            if (!value.match(/#[0-9a-f]{6}/) ) return false;
                            break;
                        case 'ecl':
                            if (value.length !== 3 || !['amb','blu','brn','gry','grn','hzl','oth'].includes(value)) return false;
                            break;
                        case 'pid':
                            if (!value.match(/^[0-9]{9}$/) ) return false;
                            break;
                        case 'cid':
                            break;
                        default:
                            console.log('Missing case', field['fld']);
                    }
                }
                return true;
            }
        }

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
                    <b>Day 4</b>
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