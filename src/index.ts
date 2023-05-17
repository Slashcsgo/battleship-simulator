import AI1 from "./AI1"
import AI2 from "./AI2"

const gamesToSimulate = 1000
const roundLimit = 1000

simulateGames()

// Запускием 1 игру возвращаем победившего игрока
function runGame() {
  const ai2 = new AI2
  const ai1 = new AI1

  const rounds = 0

  while (rounds < roundLimit) {
    const ai1Move = ai1.makeMove()
    const ai2Result = ai2.shoot(ai1Move)

    if (ai2Result) {
      return "ai1"
    }

    const ai2Move = ai2.makeMove()
    const ai1Result = ai1.shoot(ai2Move)

    if (ai1Result) {
      return "ai2"
    }
  }
}

// Запускаем нужное количество симуляций и считаем победы
function simulateGames() {
  let ai1Wins = 0
  let ai2Wins = 0
  for (let i = 0; i < gamesToSimulate; i++) {
    const result = runGame()
    if (result === "ai1") {
      ai1Wins++
    } else {
      ai2Wins++
    }
  }
  console.log(`${ai1Wins}/${ai2Wins}`)
}