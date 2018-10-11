/*/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


var scores, roundScore, activePlayer, gamePlaying;

initEvent();


document.querySelector('.btn-roll').addEventListener('click', function(){
	if (gamePlaying) {

		// 1. we need the random number first 
		var dice = Math.floor(Math.random() * 6) + 1;

		// 2. diplay the results
		document.getElementById('dice').style.opacity = '1';

		var diceDom = document.getElementById('dice');
		diceDom.src = 'dice-' + dice + '.png';

		// 3. need to update the global score if the rolled is NOT 1

		if ( dice !== 1 ){
			// add score
			roundScore += dice;
			document.getElementById('current-' + activePlayer).textContent = roundScore;
		}else {
			// next player
			nextPlayer();	
		}
	}
});

function nextPlayer (){
	//alert('sure! you wanna hold?')
	roundScore = 0;
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';

	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');
}


document.querySelector('.btn-hold').addEventListener('click' , function(){
	if (gamePlaying) {

		// update the CUREENT score to the GLOBAL score
		scores[activePlayer] += roundScore;
		// upDate the UI
		document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

		// check if the player is win 
		if (scores[activePlayer] >= 50) {
			document.getElementById('name-' + activePlayer).textContent = 'WINNER!!';
			document.getElementById('dice').style.opacity  = '0';
			document.getElementById('current-' + activePlayer).textContent = '0';
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
			gamePlaying = false;
			
		}else  {
			// next player
			nextPlayer();
		}

	}
});

document.querySelector('.btn-new').addEventListener('click', initEvent);


function initEvent(){

	gamePlaying = true;

	document.getElementById('dice').style.opacity  = '1';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';

	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');

	document.getElementById('name-0').textContent = 'PLAYER 1';
	document.getElementById('name-1').textContent = 'PLAYER 2';

	scores = [0 ,0];
	roundScore = 0;
	activePlayer = 0;

};



























