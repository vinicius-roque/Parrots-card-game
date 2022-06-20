function comparador() { 
	return Math.random() - 0.5; 
}

const game = document.querySelector(".game");
let numberOfCards;
let clicks = 0;
let time = 0;
let stopTimer = 0;

function start() {
    numberOfCards = prompt("Insira aqui o número de cartas");

    while (validNumber(numberOfCards) === false) {
        numberOfCards = prompt("Insira aqui o número de cartas");
    }
    
    let gifList = parrotsDistribution(numberOfCards/2);
    let meioDeck = [];

    for (let i = 0; i < numberOfCards/2; i++) {
        meioDeck.push(`
        <div class="card" data-identifier="card" onclick="selectedCard(this)">
            <div class="staticFace" data-identifier="back-face">
              <img src="imagens/imagens/front1.png" alt="">
            </div>
            <div class="gifFace" data-identifier="front-face">
                <img src="${gifList[i]}" alt="">
            </div>
        </div>
        `)
    }

    let deck = meioDeck.concat(meioDeck);
    deck = deck.sort(comparador);

    for (let i = 0; i < numberOfCards; i++){
        game.innerHTML += deck[i];
    }
}

start();

function selectedCard (card) {
    clicks += 1;
    if (card.classList.contains("turned")){

        } else {
        turnCard(card);
        
        turnedCards = document.querySelectorAll(".card.turned").length;
        
        if (turnedCards % 2 !== 0) {
            card.classList.add("inGame");
        } else {
            let firstCard = document.querySelector(".card.turned.inGame");
            
            let secondCard = card;

            if(itsEqual(firstCard,secondCard)){
                firstCard.classList.remove("inGame");
            } else {
                firstCard.classList.remove("inGame");
                setTimeout(turnCard, 1500, firstCard);
                setTimeout(turnCard, 1500, secondCard);
            }
        }
    }

    if (end()) {
        setTimeout(alert, 1000, `Você ganhou em ${clicks} jogadas!`);
    }
}

function turnCard(elemento) {

    elemento.classList.toggle("turned");
    
    let f1 = elemento.querySelector(".staticFace");
    let f2 = elemento.querySelector(".gifFace");

    f1.classList.toggle("turned");
    f2.classList.toggle("turned");

}

function itsEqual (firstCard,secondCard) {

    let cont1 = firstCard.innerHTML;
    let cont2 = secondCard.innerHTML;

    if (cont1 === cont2){
        return true;
    } else {
        return false;
    }

}

function end () {

    let turnedCards = document.querySelectorAll(".card.turned").length;

    if (turnedCards < numberOfCards) {
        return false;
    } else {
        return true;
    }

}

function parrotsDistribution (numberOfGifs) {

    let gifList = [
        "imagens/imagens/bobrossparrot.gif",
        "imagens/imagens/explodyparrot.gif",
        "imagens/imagens/fiestaparrot.gif",
        "imagens/imagens/metalparrot.gif",
        "imagens/imagens/revertitparrot.gif",
        "imagens/imagens/tripletsparrot.gif",
        "imagens/imagens/unicornparrot.gif"
    ]
    
    gifList = gifList.sort(comparador);

    let output = [];
    for (let i = 0; i < numberOfGifs; i++){
        output.push(gifList[i]);
    }
    return (output);
}

function validNumber(num) {

    if (num >= 4 && num <= 14){
        if (num % 2 === 0) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}