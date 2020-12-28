import inputData from './input.txt'
import React, {useState, useEffect} from 'react'



export default function Day22(props) {
    const [solution1, setSolution1] = useState('Solving...');
    const [solution2, setSolution2] = useState('Solving...');

    
    useEffect( () => {
        function readDeck(lines) {
            let deck = [];
            for (let line of lines) {
                let card = parseInt(line);
                if (card) deck.push(card);
            }
            return deck;
        }
        function play(deck1, deck2, recursive) {
            console.log('Play', deck1, deck2);
            let deckHistory = new Set();
            deckHistory.addDecks = function (deck1, deck2) { 
                let decks = deck1.join(',')+':'+deck2.join(','); 
                if (deckHistory.has(decks)) return true;
                this.add(decks);
                return false;
            }
            let round = 1;
            while (deck1.length && deck2.length) {
                // console.log('---'+round+'---', deck1, deck2);
                if (deckHistory.addDecks(deck1, deck2)) {
                    console.log('Repeat scenario detected');
                    return 1;
                }
                let card1 = deck1.shift();
                let card2 = deck2.shift();
                let winner;
                if (recursive && deck1.length >= card1 && deck2.length >= card2) {
                    winner = play (deck1.slice(0,card1), deck2.slice(0,card2));
                } else {
                    winner = card1 > card2 ? 1 : 2;
                }
                if (winner === 1) {
                    deck1.push(card1, card2);
                } else {
                    deck2.push(card2, card1);
                }
                round++;
            }
            console.log ('---> winner: '+(deck1.length?1:2))
            return deck1.length?1:2;
        }
        function score (deck) {
            let score = 0;
            for (let i=0; i< deck.length; i++) {
                score += (deck.length-i)*deck[i];
            }
            return score;
        }

        function solve1(lines) {
            console.log('Solve 1');

            let player1Deck = readDeck(lines.slice(1,lines.indexOf('')));
            let player2Deck = readDeck(lines.slice(lines.indexOf('')+1));
            console.log(player1Deck, player2Deck);

            play(player1Deck, player2Deck);
            let s = score(player1Deck) + score(player2Deck);
            console.log(s);
            setSolution1(s);
        }

        function solve2(lines) {

            console.log('Solve 2');

            let player1Deck = readDeck(lines.slice(1,lines.indexOf('')));
            let player2Deck = readDeck(lines.slice(lines.indexOf('')+1));
            let winner = play(player1Deck, player2Deck, true);
            let s = score(player1Deck) + score(player2Deck);
            console.log('The winner is, no'+winner+' with score: '+s);
            setSolution2(s);
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
                    <b>Day 22</b>
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