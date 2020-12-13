
const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'

const cellElements = document.querySelectorAll('[data-cell]')
let circlesTurn

// startGame()
//
// function startGame() {
//     circlesTurn = false
cellElements.forEach(cell => {
        cell.addEventListener('click', afterClick, {once: true})
    })
// }

function afterClick(e) {
    const cell = e.target
    const currentClass = circlesTurn ? CIRCLE_CLASS : X_CLASS
    putMark(cell, currentClass)
    // swapTurn()

}
function putMark(cell, currentClass) {
    cell.classList.add(currentClass)
}
//
// function swapTurn() {
//     circlesTurn = !circlesTurn
// }