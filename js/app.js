/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, maxScore;

init();

document.querySelector(".btn-roll").addEventListener("click", function() {
    if (gamePlaying) {
        var dice = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        var diceDOM = document.querySelector(".dice");
        var dice2DOM = document.querySelector(".dice2");
        diceDOM.style.display = "block";
        dice2DOM.style.display = "block";
        diceDOM.src = "img/dice-" + dice + ".png";
        dice2DOM.src = "img/dice-" + dice2 + ".png";

        if (dice == 6 && dice2 == 6) {
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = 0;
            nextPlayer();
        }else if (dice == 1 && dice2 == 1) {
            nextPlayer();
        } else {
            roundScore += dice + dice2;
            document.querySelector("#current-" + activePlayer).textContent = roundScore;
        }
    }
});

document.querySelector(".btn-hold").addEventListener("click", function() {
    if (gamePlaying) {
        scores[activePlayer] += roundScore;

        document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];

        if (scores[activePlayer] >= maxScore) {
            document.querySelector("#name-" + activePlayer).textContent = "WINNER!";
            document.querySelector(".dice").style.display = "none";
            document.querySelector(".dice2").style.display = "none";
            document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
            document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
});

function nextPlayer() {
    activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
    roundScore = 0;

    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";

    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");

    setTimeout(function() {
        document.querySelector(".dice").style.display = "none";
        document.querySelector(".dice2").style.display = "none";
    }, 1000);
}

document.querySelector(".btn-new").addEventListener("click", init);

function setMaxScore() {
    maxScore = document.getElementById("maxScore").value;
    document.getElementById("finalScore").textContent = maxScore;
}

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    maxScore = 100;

    document.querySelector(".dice").style.display = "none";
    document.querySelector(".dice2").style.display = "none";


    document.getElementById("finalScore").textContent = "100";
    document.getElementById("maxScore").value = "";
    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";
    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.add("active");
}
