
// -----------------   TIC TAC TOE Game implemented with Node.js using HTML, CSS and JAVASCRIPT  -------------------------------//
// -----------------   It is played by 2-players choosing between 'X' or 'O'

// creating variables to contain the class we are currently working with
const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'

// All the possible winning combinations that a player can chose
// 2-dimensional array to store the marks chosen by both the players
const WINNING_COMBINATIONS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
//  selecting all our cell elements on the grid of 3x3 grid, and placing their list in the variable cellElements
const cellElements = document.querySelectorAll('[data-cell]')

// get the element with the id 'winning-message' on the index.html page to use for dimming the screen to show the win message
const winningMessageElement = document.getElementById('winning-message')

// getting the element 'data-winning-message-text' to display the winning message when a player wins
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')

// getting the button displaying 'REPLY ??' on the screen
const restartButton = document.getElementById('Restart-Button')

// the variable to keep track of whose turn is it
let circlesTurn

// calling startGame() function to start the game
startGame()

// adding and eventListener to the 'REPLAY ??' button to listen for any clicks, which calls the startGame() function
restartButton.addEventListener('click', startGame)

// ----------------------------------------------------------------------------------------------------------------------
// function startGame() definition
function startGame() {

    // start the game with 'X's turn
    circlesTurn = false

    // loop through all the cells to listen for any 'click' events firing on any of the 9 cells.
    // this event listener fires ONLY ONCE for each cell element
    cellElements.forEach(cell => {

        // clear all the 9 cells with 'X's and 'O's to start a new game
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)

        // remove the eventListener from the cells if it is added
        cell.removeEventListener('click',afterClick)

        // add a new eventListener to the cells to listen for clicks, which calls the afterClick() function
        cell.addEventListener('click', afterClick, {once: true})
    })
    // remove the win message dark screen and the win message from the element by removing the 'show' class
    winningMessageElement.classList.remove('show')
}
// ------------------------------------------------------------------------------------------------------------------------
// function to execute when a cell is clicked
function afterClick(e) {
    // setting the cell variable as the target to place the mark
    const cell = e.target

    // check whose turn it is using circlesTurn variable's value and setting the currentClass variable accordingly
    const currentClass = circlesTurn ? CIRCLE_CLASS : X_CLASS

    // calling putMark() function to put the mark on the target cell, according to the currentClass i.e. 'O' or 'X'
    putMark(cell, currentClass)

    // calling the checkforWin() function to check if the currentClass won
    if (checkforWin(currentClass)) {
        // if won, call endGame() with Draw as FALSE
        endGame(false)
        // if did not win, check for Draw by calling isDraw() function
    }
    else if(isDraw()) {
        // if Draw, then call endGame() with draw as TRUE
        endGame(true)
    }
    else {
        // if did not win yet, swap the turn by calling swapTurn() function
        swapTurn()
    }
}
// ------------------------------------------------------------------------------------------------------------------------
// function endGame() definition
function endGame(draw) {
    if(draw) {
        winningMessageTextElement.innerText = "Draw!"
    } else {
        winningMessageTextElement.innerText = `${circlesTurn ? "O's" :"X's "} Wins!`
}
    winningMessageElement.classList.add('show')
}
// ------------------------------------------------------------------------------------------------------------------------
// function isDraw() definition
function isDraw(){
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}
// ------------------------------------------------------------------------------------------------------------------------
// function putMark() definition
function putMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

// ------------------------------------------------------------------------------------------------------------------------
// function swapTurn() definition
function swapTurn() {
    circlesTurn = !circlesTurn
}
// ------------------------------------------------------------------------------------------------------------------------
// function checkforWin() definition
function checkforWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every((index => {
            return cellElements[index].classList.contains(currentClass)
        }))
    })
}