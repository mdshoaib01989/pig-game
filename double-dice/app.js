/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
init ();

var roundScore, activePlayer, scores, gamePlaying, scoreSetting;


document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        var dice0 = Math.floor(Math.random() * 6 ) + 1;
        var dice1 = Math.floor(Math.random() * 6 ) + 1;

        document.querySelector('#dice-1').src = 'dice-' + dice0 + '.png';
        document.querySelector('#dice-2').src = 'dice-' + dice1 + '.png';
        
        document.querySelector('#dice-1').style.display = 'block';
        document.querySelector('#dice-2').style.display = 'block';

        if (dice0 !== 1 && dice1 !== 1 ) {
            //current score of active player untill 1 appeared
            roundScore += dice0 + dice1;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;

        }else {
        //next player
            alert('Oops! You Rolled 1, Dice Passed to Next Player')
            roundScore = 0;
            activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; 

            document.getElementById('current-0').textContent = '0';
            document.getElementById('current-1').textContent = '0';
            // change the active class according to change of activePlayer
            document.querySelector('.player-0-panel').classList.toggle('active');
            document.querySelector('.player-1-panel').classList.toggle('active');
        }
    }

});

document.querySelector('.btn-hold').addEventListener('click', function(){
    if (gamePlaying) {
        // add round score to the global score
        scores[activePlayer] += roundScore;
        //update the UI
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
        //Get the value from user
        scoreSetting = document.querySelector('.final-score').value;

        // undefined, null, 0 or '' are COERCED to False
        // and anything else is true so now i i have to find out if the scoreSeting is true or false
        var finalScore;

        if (scoreSetting) {
            finalScore = scoreSetting;
        } else {
            scoreSetting = 50;
        }

        //check if anyone win the game
        if (scores[activePlayer] >= scoreSetting) {
            document.getElementById('name-' + activePlayer).textContent = 'WINNER!!';
            document.querySelector('.player-'+ activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-'+ activePlayer + '-panel').classList.remove('active');
            document.querySelector('#current-' + activePlayer).textContent = '0';
            document.querySelector('#dice-1').style.display = 'none';
            document.querySelector('#dice-2').style.display = 'none';
            gamePlaying = false;

        }else{
            alert('Dice Passed To The Next Player')
            nextPlayer ();
        }
    }

});

document.querySelector('.btn-new').addEventListener('click', function(){

    init ();

});


function nextPlayer (){
    roundScore = 0;
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; 

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
     // change the active class according to change of activePlayer
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');  
};

function init (){
    document.querySelector('#current-0').textContent = '0';
    document.querySelector('#current-1').textContent = '0';
    document.querySelector('#score-0').textContent = '0';
    document.querySelector('#score-1').textContent = '0';

    document.querySelector('#name-0').textContent = 'PLAYER 1';
    document.querySelector('#name-1').textContent = 'PLAYER 2';

    document.querySelector('#dice-1').style.display = 'block';
    document.querySelector('#dice-2').style.display = 'block';


    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');


    roundScore = 0;
    activePlayer = 0;
    scores = [0, 0];
    gamePlaying = true;
};

