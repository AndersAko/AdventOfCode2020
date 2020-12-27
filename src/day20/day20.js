import inputData from './input.txt'
import React, {useState, useEffect} from 'react'
/* global BigInt */


export default function Day20(props) {
    const [solution1, setSolution1] = useState('Solving...');
    const [solution2, setSolution2] = useState('Solving...');

    
    useEffect( () => {
                            // n e s w
        const rotatedSigs = [ [0,1,2,3], [1,6,3,4], [6,7,4,5], [7,0,5,2],   // Rotated left
                              [2,5,0,7], [5,4,7,6], [4,3,6,1], [3,2,1,0]];  // Flipped n/s and rotated left
        function solve1and2(lines) {
            // position = [ tile, tile, ..]
            // Find for next free spot, reading order
            function possibleTiles(position) {
                let spotX = position.length % squareSize;
                let spotY = position.length/squareSize|0;   // integer division 
                let result = [];
                for (let tile of tiles) {      // Look through all tiles to find match
                    if (position.some(x => x.tileNo === tile.tileNo )) continue;
                    let matchingRotations = [];
                    // Does it match east side of previous tile, with any rotation / flip ?
                    let leftTile = position[position.length-1];
                    let upTile = position[position.length-squareSize];
                    for (let rot=0; rot<rotatedSigs.length; rot++) {
                        if ((spotX === 0 ||             
                             // East side of leftTile should match with west side of tile with rotation=rot
                             tile.sigs[rotatedSigs[rot][3]] === leftTile.sigs[rotatedSigs[leftTile.rotation][1]]) &&
                            (spotY === 0 ||
                             // South side of upTile should match north side of 'tile' with rotation = rot
                             tile.sigs[rotatedSigs[rot][0]] === upTile.sigs[rotatedSigs[upTile.rotation][2]]) ) { 
                            matchingRotations.push(rot);
                        } 
                    }

                    for (let r of matchingRotations) {
                        result.push( {...tile, rotation:r, location: {x: spotX, y: spotY} });
                    }
                }
                // console.log('From position ', position, 'the possible tiles that fit in next spot are', result );
                return result;
            }
            function findMatch( position ) {
                if (position.length === tiles.length) {
                    return position;
                }
                for (let possibleNextTile of possibleTiles(position)) {
                    let match = findMatch(position.concat(possibleNextTile));
                    if (match) return match;
                }
                return null;
            }

            console.log('Solve 1');
            let line = 0;
            let tiles = [];
            for (; line < lines.length; line++) {
                let tileNo = lines[line].match(/\w+ (\d+):/)[1];
                let tile = [];
                line++;
                while (lines[line]) {
                    tile.push(lines[line]);
                    line++;
                }
                // north east south west rev.north rev.east rev.south rev.west
                let sigs = [tile[0], tile.map(l => l[tile[0].length-1]).join(''), 
                                 tile[tile.length-1], tile.map(l => l[0]).join('') ];
                sigs = sigs.concat(sigs.map(x => [...x].reverse().join('')));
                // console.log('Tile: ', tileNo, tile);
                tiles.push({t: tile, tileNo, sigs });
            }

            let squareSize = Math.sqrt(tiles.length);
            console.log('Tiles should form a square with side: '+squareSize);

            // position = [ tile, tile, ..]
            // tile = [row, row, row (unflipped) ], rotation: 0-7, sigs: [ 8 sigs ], neswSigs: [], tileNo: <no>
            // find next: [ possible tiles ] = possibleTiles([tile tile])
            let firstmatch = findMatch( [] );
            console.log('Found match', firstmatch);
            setSolution1(firstmatch[0].tileNo * firstmatch[squareSize-1].tileNo * 
                         firstmatch[tiles.length - squareSize].tileNo * firstmatch[tiles.length-1].tileNo);
        
                
            console.log('Solve 2');
            function getRow(tile, row, rotation) {
                switch(rotation) {
                    case 0:
                        return tile[row];
                    case 1: 
                        return tile.map(x => x[tile.length-row-1]).join('');
                    case 2:
                        return [...tile[tile.length-row-1]].reverse().join(''); 
                    case 3: 
                        return tile.map(x => x[row]).reverse().join('');
                    case 4:
                        return tile[tile.length-row-1];
                    case 5: 
                        return tile.map(x => x[tile.length-row-1]).reverse().join('');
                    case 6:
                        return [...tile[row]].reverse().join('');
                    case 7: 
                        return tile.map(x => x[row]).join('');
                    default:
                        return undefined; 
                }
            } 
            
            function getImage(solution) {
                let result = []; 
                for (let row = 0; row < squareSize; row++ ) {
                    for (let tilerow = 1; tilerow < 9; tilerow++ ) {
                        let out = ''
                        for (let col = 0; col < squareSize; col++) {
                            let tile = solution[row*squareSize + col];
                            out += getRow(tile.t, tilerow, tile.rotation).substr(1,8);
                        }
                        result.push(out);
                        console.log(out);
                    }
                }
                return result;
            }
            function rotate(image, rotation) {
                let result = [];
                for (let row = 0; row < image.length; row++ ) {
                    result.push(getRow(image, row, rotation));
                }
                return result;
            }
            // Generate image
            let image = getImage(firstmatch);
            console.log(image);
            const monster = ['                  # ',
                             '#    ##    ##    ###', 
                             ' #  #  #  #  #  #   ']
                             .map(x => BigInt('0b'+x.replaceAll('#', '1').replaceAll(' ','0')));
            // For all rotations
            for (let rot = 0; rot <8; rot++) {
                let rotImage = rotate(image, rot)
                               .map(x => BigInt('0b'+x.replaceAll('#', '1').replaceAll('.','0')));
                console.log('Rotated to '+rot,rotImage);
                // Count monsters
                let count = 0;
                let shiftLen = BigInt(image[0].length-20);
                for (let line = 0; line <rotImage.length-monster.length; line++) {
                    for (let shift=0n; shift < shiftLen; shift++) {
                        let found = true;
                        for (let i = 0; i<monster.length; i++) {
                            if ( (rotImage[line+i] & (monster[i] << shift)) !==  monster[i] << shift) {
                                found = false;
                                break;
                            }
                        }
                        if (found) {
                            count ++;
                            console.log('Removed monster at:')
                            for (let i=0; i<3; i++) {
                                rotImage[line+i] ^= monster[i] << shift;
                                console.log(rotImage[line+i].toString(2));
                            }
                        }
                    }
                }
                console.log('Total of '+count+' monsters at rotation '+rot);
                if (count > 0) {
                    let roughness = rotImage
                                    .reduce ( (a, l) => a + l.toString(2).split('').reduce((a,c) => a + +c, 0) , 0 );
                    setSolution2(roughness);
                }
                // Result = no of #:s - monsters * 15  

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
                    <b>Day 20</b>
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