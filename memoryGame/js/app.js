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

function noMatch(unmatchedCards){
	unmatchedCards.forEach(function(openCard){
		openCard.classList.add('animated', 'shake', 'different');
	});

	setTimeout(function() {
		unmatchedCards.forEach(function(openCard) {
			openCard.classList.remove('animated', 'shake', 'open', 'show', 'different');
		});
	}, 1000, unmatchedCards);
}

function match(matchedCards){
	matchedCards.forEach(function(openCard){
		openCard.classList.add('animated', 'pulse', 'match');
	});

	setTimeout(function() {
		matchedCards.forEach(function(openCard) {
			openCard.classList.remove('animated', 'pulse', 'match');
		});
	}, 1000, matchedCards);
}

function checkCard(card) {
	if(openCards.length < matchesRequired) {
		return;
	}

	for(let i = 1; i < matchesRequired; i++) {
		if(openCards[0].firstElementChild.className != openCards[i].firstElementChild.className) {
			noMatch(openCards);
			openCards = [];
			return;
		}
	}

	matchesFound += matchesRequired;
	match(openCards);
	if(matchesFound === totalCardTypes.length){
		alert('you win');
	}
	openCards = [];
}

function cardInteraction(e) {
	const clickedCard = e.target;
	if(openCards.includes(clickedCard)){
		return
	}
	openCards.push(clickedCard);
	showCard(clickedCard);
	checkCard(clickedCard);
}

function resetBoard() {
	openCards = [];
	let shuffledCardTypes = shuffle(totalCardTypes);
	for(let i = 0; i < numCards; i++) {
		cards[i].firstElementChild.classList = `fa ${shuffledCardTypes[i]}`;
		hideCard(cards[i]);
	}
}

const deckElement = document.getElementsByClassName('deck')[0];
const cards = deckElement.children;
const restartElement = document.getElementsByClassName('restart')[0];
const numCards = cards.length;
const matchesRequired = 2;
const uniqueCardTypes = ['fa-paper-plane-o','fa-anchor','fa-bolt','fa-cube','fa-leaf','fa-bicycle','fa-bomb','fa-diamond'];
let totalCardTypes = uniqueCardTypes;
let matchesFound = 0;
let openCards = [];

restartElement.addEventListener('click', resetBoard);
//Populate a list of all card symbol types that will appear on the board
for(let i = 0; i < matchesRequired - 1; i++){
	totalCardTypes = totalCardTypes.concat(uniqueCardTypes);
}

resetBoard();
for(let i = 0; i < numCards; i++) {
	cards[i].addEventListener('click', cardInteraction);
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
