const eventName = 'ontouchend' in document ? 'touchend' : 'click'
const game = document.querySelector('#game')
const buttons = game.querySelector('.game__buttons')
const turn = game.querySelector('.game__turn')
const turnCross = game.querySelector('.game__turn .game__icon-cross')
const turnCircle = game.querySelector('.game__turn .game__icon-circle')
const result = game.querySelector('.game__result')
let isCross = true // false is Circle
let counter = 0

function setVictory(msg, mark) {
  const icon = document.createElement('span')
  icon.className = `game__icon-${mark}`

  const text = document.createElement('span')
  text.className = `game__result-text game__result-text--${mark}`
  text.textContent = msg

  result.appendChild(icon)
  result.appendChild(text)

  turn.style.display = 'none'
  buttons.style.display = 'block'
  game.querySelector('.game__button-reset').addEventListener(eventName, reset, false)
  game.removeEventListener(eventName, handler, false)
}

function toggleTurn() {
  turnCross.classList.toggle('game__icon--on')
  turnCircle.classList.toggle('game__icon--on')
}

function checkVictory(element, mark) {
  const lines = game.querySelectorAll(`[data-line="${element.dataset.line}"]`)
  const columns = game.querySelectorAll(`[data-column="${element.dataset.column}"]`)

  let counterLines = 0
  let counterColumns = 0

  let victoryMessage = ''
  let victory = false

  counter += 1

  // Linhas
  lines.forEach((line) => {
    if (line.dataset.mark === mark) counterLines += 1

    if (counterLines === 3) {
      victoryMessage = `ganhou na linha ${(lines[0].dataset.line * 1) + 1}`
      victory = true
    }
  })

  // Colunas
  columns.forEach((column) => {
    if (column.dataset.mark === mark) counterColumns += 1
    if (counterColumns === 3) {
      victoryMessage = `ganhou na coluna ${(columns[0].dataset.column * 1) + 1}`
      victory = true
    }
  })

  // Diagonal 1
  if (game.querySelector('[data-line="0"][data-column="0"]').dataset.mark === mark
    && game.querySelector('[data-line="1"][data-column="1"]').dataset.mark === mark
    && game.querySelector('[data-line="2"][data-column="2"]').dataset.mark === mark) {
    victoryMessage = 'ganhou na diagonal 1'
    victory = true
  }

  // Diagonal 2
  if (game.querySelector('[data-line="0"][data-column="2"]').dataset.mark === mark
    && game.querySelector('[data-line="1"][data-column="1"]').dataset.mark === mark
    && game.querySelector('[data-line="2"][data-column="0"]').dataset.mark === mark) {
    victoryMessage = 'ganhou na diagonal 2'
    victory = true
  }

  if (victory) setVictory(victoryMessage, mark)

  if (!victory && counter === 9) setVictory('Não houve vencedor')
}

function handler(e) {
  const element = e.target
  const dataValues = element.dataset

  if (dataValues.mark || element.classList.value.indexOf('game__slot') === -1) return false

  const mark = isCross ? 'cross' : 'circle'

  element.setAttribute('data-mark', mark)
  element.classList.add(`game__icon-${mark}`)

  isCross = !isCross

  checkVictory(element, mark)
  toggleTurn()

  return true
}

function reset() {
  counter = 0
  turn.style.display = 'flex'
  buttons.style.display = 'none'
  result.innerHTML = ''
  turnCross.classList.remove('game__icon--on')
  turnCircle.classList.remove('game__icon--on')

  game.querySelectorAll('.game__slot').forEach((slot) => {
    slot.removeAttribute('data-mark')
    slot.classList.remove('game__icon-cross', 'game__icon-circle')
  })

  init()
}

function init() {
  turnCross.classList.add('game__icon--on')
  game.addEventListener(eventName, handler, false)
}

init()
