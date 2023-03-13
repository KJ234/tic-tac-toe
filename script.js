
const gridItem = document.querySelectorAll('[data-cell]')
const playerTurn = document.querySelector('.player-turn')
const reset = document.querySelector('.reset')
const winningMessageElement = document.getElementById('winningMessage')
const winningMessageTextElement = document.querySelector('[data-player-turn-text]')

const x_class = 'X'
const circle = 'O'
let circleTurn;

const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

function start() {
    gridItem.forEach(cell => {
        cell.addEventListener('click', handleClick, { once: true })
    })
    winningMessageElement.classList.remove('show')

}
function handleClick(e) {

    const cell = e.target
    const currentCell = cell.innerText = circleTurn ? circle : x_class
    placeMark(cell, currentCell)
    if (checkWin(currentCell)) {
        endGame(false)
    }
    SwapTurns()
}

function endGame(draw) {
    if (draw) {
      winningMessageTextElement.innerText = 'Draw!'
    } else {
      winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
    }
    winningMessageElement.classList.add('show')
  }

function placeMark(cell, currentCell) {
    cell.classList.add(currentCell)
}

function SwapTurns() {
    circleTurn = !circleTurn
}

function checkWin(currentCell) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return gridItem[index].classList.contains(currentCell)
        })
    })
}


reset.addEventListener('click', () => {
    location.reload()
})


start()