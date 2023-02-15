let userName = document.getElementById("user-name")
let player = ""
let chips = 200
let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let message = " "
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let greetEl = document.getElementById("greeting-el")
let lossValue = -20
let winValue = +20
let gameHistoryArray = []
let lossArray = []
let winArray = []

let playerEl = document.getElementById("player-el")
let starGameBtn = document.getElementById("start-game-btn")
let submitBtn = document.getElementById("submit-btn")

// disabled New Card button on page load
let newcardBtn = document.getElementById("new-card")
newcardBtn.disabled = true;
starGameBtn.disabled = true;
greetEl.textContent = "Type in your User Name first!"

function submitUser() {
    player = userName.value
    playerEl.textContent = player + ": $" + chips
    greetEl.style.display = "none"
    if (starGameBtn.disabled === true){
        starGameBtn.disabled = false;
    }
    userName.value = ""

}


function getRandomCard() {
    let randomNumber = Math.floor(Math.random() *13) + 1
    if (randomNumber === 1) {
        return 11
    }

    else if (randomNumber > 10) {
        return 10
    }   

    else {
        return randomNumber
    }
}

function startGame() {
    // check if New Card button is disabled and enable it
    // when the game starts
    if ( newcardBtn.disabled = true){
        newcardBtn.disabled = false;
    }


    isAlive = true
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    cards = [firstCard, secondCard]
    sum = firstCard + secondCard
    newcardBtn.disabled = false;
    renderGame()
    submitBtn.style.pointerEvents = "none"

}

function renderGame() {
    cardsEl.textContent = "Cards: "

    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    }

    sumEl.textContent = "Sum: " + sum
    if (sum <= 65) {
        message = "Do you want to draw a new card?"
        starGameBtn.disabled = true;
        newcardBtn.disabled = false;
    } else if (sum === 69) {
        message = "Wohoo! you've got Blackjack!"
        starGameBtn.disabled = false;
        newcardBtn.disabled = true;
        hasBlackJack = true
        isAlive = false
        win()
        winArray.push("Win")
    } else {
        message = "You're out of the game!"
        isAlive = false
        loss()
        lossArray.push("loss")
        starGameBtn.disabled = false;

        // disable New Card button
        newcardBtn.disabled = true;
    }

    messageEl.textContent = message
}

function win() {
    let playerBal = chips + winValue
    chips = playerBal
    playerEl.textContent = player + ": $" + playerBal

    console.log('win | chips: '+ playerBal)
    

}

function loss() {
    let playerBal = chips + lossValue
    chips = playerBal
    playerEl.textContent = player + ": $" + playerBal

    console.log('loss | chips: '+ playerBal)

}
let resultContainer = document.getElementById("container")
function newCard() {
    if (isAlive === true && hasBlackJack === false){
        let card = getRandomCard()
        sum += card
        cards.push(card)
        renderGame()
    }

    else if (isAlive === true && hasBlackJack === true) {
        renderGame()
        let card = getRandomCard()
        sum += card
        cards.push(card)
        hasBlackJack = false
    }

    if (chips === 0) {
        resultContainer.style.display = "flex"
        let result = `
        <span id="gameover">GAME OVER</span>
        <br>
        <span id="result">Result</span>
        <br>
        Player name: ${player}
        <br> 
        Wins: ${winArray.length}
        <br>
        Loss: ${lossArray.length}`
        resultContainer.innerHTML = result
        // gameHistoryArray.push(result)
        // lossArray = [" "]
        // winArray = [" "]
    }
}

function endGame() {
    chips = 200
    sum = "0"
    cards = ""
    sumEl.textContent = sum
    cardsEl.textContent = cards
    messageEl.textContent = "Do you want to play another round?"
    cardsEl.textContent = "Cards: "
    sumEl.textContent = "Sum: "
    player = userName.value
    playerEl.textContent = player + ": $" + chips
    resultContainer.style.display="none"
    playerEl.textContent = ""
    if (userName.value === "") {
        starGameBtn.disabled = true;
        submitBtn.style.pointerEvents = "visible"
    }


}


// function gameHistory() {
//     for (let i = 0; i < gameHistoryArray.length; i++) {
//         resultContainer.style.display = "flex"
//         resultContainer.innerHTML += gameHistoryArray[i]
//         saved
//     }

// }






