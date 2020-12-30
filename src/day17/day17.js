import inputData from './input.txt'
import React, {useState, useEffect} from 'react'

class ConwayCubes {
    constructor(dimensions) {
        this.cubes = {};
        this.min = {};
        this.max = {};
        this.dimensions = dimensions;
    }

    makeId(coord) { return (coord.w??'')+','+coord.z+','+coord.y+','+coord.x; }
    updateMinMax(x,y,z,w) {
        this.min.x = Math.min(this.min.x??x,x);
        this.min.y = Math.min(this.min.y??y,y);
        this.min.z = Math.min(this.min.z??z,z);
        this.max.x = Math.max(this.max.x??x,x);
        this.max.y = Math.max(this.max.y??y,y);
        this.max.z = Math.max(this.max.z??z,z);
        this.min.w = Math.min(this.min.w??w,w);
        this.max.w = Math.max(this.max.w??w,w);
    }

    setState (coord, state) {
        this.cubes[this.makeId(coord)] = {state};
        if (state) this.updateMinMax(coord.x, coord.y, coord.z, coord.w);
    }

    setNext (coord, state) {
        this.cubes[this.makeId(coord)] = {...this.cubes[this.makeId(coord)], next: state};
        if (state) this.updateMinMax(coord.x, coord.y, coord.z, coord.w);
    }

    
    isActive (coord) {
        return this.cubes[this.makeId(coord)] && this.cubes[this.makeId(coord)].state;
    }

    countActive() {
        let count = 0;
        for (let c in this.cubes) {
            if (this.cubes[c] && this.cubes[c].state) count++;
        }
        return count;
    }

    neighbours(coord) {
        let count = 0;
        for (let dx=-1; dx<=1; dx++) {
            for (let dy=-1; dy<=1; dy++) {
                for (let dz=-1; dz<=1; dz++) {
                    if (this.dimensions ===4) {
                        for (let dw=-1; dw<=1; dw++) {
                            if (dx !==0 || dy !==0 || dz !== 0 || dw !== 0) {
                                let c = {x:coord.x+dx, y: coord.y+dy, z: coord.z+dz, w: coord.w+dw };
                                if (this.isActive(c)) count++;
                            }
                        }
                    } else {
                        if (dx !==0 || dy !==0 || dz !== 0) {
                            let c = {x:coord.x+dx, y: coord.y+dy, z: coord.z+dz};
                            if (this.isActive(c)) count++;
                        }
                    }
                }
            }
        }
        return count;
    }
    step () {
        for (let x=this.min.x-1; x<=this.max.x+1; x++) {
            for (let y=this.min.y-1; y<=this.max.y+1; y++) {
                for (let z=this.min.z-1; z<=this.max.z+1; z++) {
                    if (this.dimensions ===4) {
                        for (let w=this.min.w-1; w<=this.max.w+1; w++) {
                            let n = this.neighbours({x,y,z,w});
                            this.setNext({x,y,z,w}, n===3 || (this.isActive({x,y,z,w}) && n===2)); 
                        }
                    } else {
                        let n = this.neighbours({x,y,z});
                        this.setNext({x,y,z}, n===3 || (this.isActive({x,y,z}) && n===2)); 
                    }
                }
            }
        }

        for (let c in this.cubes) {
            if (this.cubes[c]) this.cubes[c].state = this.cubes[c].next;
        }
    }

    print() {
        for (let z=this.min.z; z<=this.max.z; z++) {
            console.log('z='+z);
            for (let y=this.min.y; y<=this.max.y; y++) {
                let s = '';
                for (let x=this.min.x; x<=this.max.x; x++) {
                    s += this.isActive({x,y,z}) ? '#':'.';
                }
                console.log(s);
            }
        }
    }
}


export default function Day17(props) {
    const [solution1, setSolution1] = useState('Solving...');
    const [solution2, setSolution2] = useState('Solving...');
    
    useEffect( () => {
        function solve1and2(lines) {
            console.log('Solve 1');
            let cubes = new ConwayCubes(3);
            for (let row in lines) {
                let line = lines[row].split('');
                for (let col in line) {
                    let x = +col;
                    let y = +row;
                    let z = 0;
                    cubes.setState({x, y, z}, line[col]==='#');
                }
            }
            console.log('Initial')
            cubes.print();

            for (let i = 1; i<=6; i++) {
                console.log(i + ' cycles');
                cubes.step();
                cubes.print();
                console.log(cubes.countActive());
            }
            setSolution1(cubes.countActive());

            let cubes4 = new ConwayCubes(4);
            for (let row in lines) {
                let line = lines[row].split('');
                for (let col in line) {
                    let x = +col;
                    let y = +row;
                    cubes4.setState({x, y, z:0 ,w:0}, line[col]==='#');
                }
            }
            for (let i = 1; i<=6; i++) {
                console.log(i + ' cycles');
                cubes4.step();
                // cubes4.print();
                console.log(cubes4.countActive());
            }
            setSolution2(cubes4.countActive());

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
                    <b>Day 17</b>
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