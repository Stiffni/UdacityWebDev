// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;

	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

function showCard(card) {
	card.classList.add('open', 'show');
}

function hideCard(card) {
	card.classList.remove('open', 'show');
}

function animateNoMatch(unmatchedCards) {
	unmatchedCards.forEach(function(openCard) {
		openCard.classList.add('animated', 'shake', 'different');
	});

	setTimeout(function() {
		unmatchedCards.forEach(function(openCard) {
			openCard.classList.remove('animated', 'shake', 'open', 'show', 'different');
		});
	}, 1000, unmatchedCards);
}

function animateMatch(matchedCards) {
	matchedCards.forEach(function(openCard) {
		openCard.classList.add('animated', 'pulse', 'match');
		openCard.removeEventListener('click', gamePlay);
	});

	setTimeout(function() {
		matchedCards.forEach(function(openCard) {
			openCard.classList.remove('animated', 'pulse', 'match');
		});
	}, 1000, matchedCards);
}

function showWinnerModal() {
	let winStatsElement = document.getElementsByClassName('stats')[0];
	winStatsElement.getElementsByClassName('total-moves')[0].innerText = movesElement.innerText;
	winStatsElement.getElementsByClassName('total-stars')[0].innerHTML = starsElement.innerHTML;
	winStatsElement.getElementsByClassName('total-time')[0].innerHTML = timerElement.innerText;
	winModalElement.style.display = 'block';
}

function endGame() {
	showWinnerModal();
	endTime();
}

function startTime() {
	//Creates the timer and increments seconds/minutes/hours
	if(seconds === 59 && minutes === 59) {
		seconds = 0;
		minutes = 0;
		hours++;
	} else if(seconds === 59) {
		seconds = 0;
		minutes++;
	} else {
		seconds++;
	}

	timerElement.innerHTML = checkTime(hours) + ":" + checkTime(minutes) + ":" + checkTime(seconds)
	timerFunction = setTimeout(function() { startTime() }, 1000);
}

function endTime() {
	clearTimeout(timerFunction);
}

function checkTime(i) {
	/* https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_win_settimeout_clock
	*  Adds a 0 to the hours/minutes/seconds if it is less than 10
	*/

	if(i < 10) {
		i = "0" + i;
	}
	return i;
}

function checkCard(card) {
	//This function checks if cards match or not, and if the game was won
	if(openCards.length < matchesRequired) {
		return;
	}

	for(let i = 1; i < matchesRequired; i++) {
		if(openCards[0].firstElementChild.className != openCards[i].firstElementChild.className) {
			animateNoMatch(openCards);
			openCards = [];
			return;
		}
	}

	matchesFound += matchesRequired;
	animateMatch(openCards);

	if(matchesFound === totalCardTypes.length) {
		endGame();
	}
	openCards = [];
}

function updateMoves() {
	moves++;
	if(moves === 1) {
		movesElement.innerText = `${moves} Move`;
	} else {
		movesElement.innerText = `${moves} Moves`
	}
}

function updateStars() {
	let firstStar = starsElement.children[0];
	if(moves === 25) {
		firstStar.style.display = 'none';
	} else if(moves === 40) {
		firstStar.nextElementSibling.style.display = 'none';
	} else if(moves === 0) {
		firstStar.style.display = '';
		firstStar.nextElementSibling.style.display = '';
	}
}

function gamePlay(e) {
	if(timerElement.innerText == '00:00:00') {
		startTime();
	}
	const clickedCard = e.target;
	if(openCards.includes(clickedCard)) { //User clicked same card
		return
	}
	openCards.push(clickedCard);
	updateMoves();
	updateStars();
	showCard(clickedCard);
	checkCard(clickedCard);
}

function resetBoard() {
	seconds = 0;
	minutes = 0;
	hours = 0;
	openCards = [];
	moves = 0;
	matchesFound = 0;
	movesElement.innerText = `${moves} Moves`
	updateStars();
	let shuffledCardTypes = shuffle(totalCardTypes);
	for(let i = 0; i < numCards; i++) {
		cards[i].addEventListener('click', gamePlay);
		cards[i].firstElementChild.classList = `fa ${shuffledCardTypes[i]}`;
		hideCard(cards[i]);
	}
	winModalElement.style.display = 'none';
	timerElement.innerText = '00:00:00';
}

const deckElement = document.getElementsByClassName('deck')[0];
const cards = deckElement.children;
const numCards = cards.length;
const restartElement = document.getElementsByClassName('restart')[0];
const replayElement = document.getElementsByClassName('play-again')[0];
const movesElement = document.getElementsByClassName('moves')[0];
const starsElement = document.getElementsByClassName('stars')[0];
const timerElement = document.getElementsByClassName('timer')[0];
const winModalElement = document.getElementsByClassName('winner-modal')[0];
const matchesRequired = 2;
let seconds = 0;
let minutes = 0;
let hours = 0;
let timerFunction;

const uniqueCardTypes = ['fa-paper-plane-o','fa-anchor','fa-bolt','fa-cube','fa-leaf','fa-bicycle','fa-bomb','fa-diamond'];
let totalCardTypes = uniqueCardTypes;
let moves = 0;
let matchesFound = 0;
let openCards = [];

restartElement.addEventListener('click', resetBoard);
replayElement.addEventListener('click', resetBoard);
//Populate a list of all card symbol types that will appear on the board
for(let i = 0; i < matchesRequired - 1; i++) {
	totalCardTypes = totalCardTypes.concat(uniqueCardTypes);
}

resetBoard();