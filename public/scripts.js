
const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
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
const cellElements = document.querySelectorAll('[data-cell]')
const winningMessageElement = document.getElementById('winning-message')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let circlesTurn

startGame()

function startGame() {
    circlesTurn = false
cellElements.forEach(cell => {
        cell.addEventListener('click', afterClick, {once: true})
    })
}

function afterClick(e) {
    const cell = e.target
    const currentClass = circlesTurn ? CIRCLE_CLASS : X_CLASS
    putMark(cell, currentClass)
    if (checkforWin(currentClass)) {
        endGame(false)
    } else if(isDraw()) {
        endGame(true)
    } else {
        swapTurn()
    }
}

function endGame(draw) {
    if(draw) {
        winningMessageElement.innerText = "Draw!"
    } else {
        winningMessageTextElement.innerText = `${circlesTurn ? "O's" :"X's "} Wins!`
}
    winningMessageElement.classList.add('show')
}

function isDraw(){
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}

function putMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurn() {
    circlesTurn = !circlesTurn
}

function checkforWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every((index => {
            return cellElements[index].classList.contains(currentClass)
        }))
    })

}