import Random from "./Helpers/Random"
import { Board, Cell, Orientation, Line, Point } from "./types"

export default class Desk {
  private board: Board = []
  readonly boardSize = 10
  private boatCellsLeft = 0
  private readonly boatTypes = [
    {
      decks: 4,
      numberOfBoats: 1
    },
    {
      decks: 3,
      numberOfBoats: 2
    },
    {
      decks: 2,
      numberOfBoats: 3
    },
    {
      decks: 1,
      numberOfBoats: 4
    }
  ]

  constructor() {
    this.generateBoard()
    this.generateBoats()
  }

  private generateBoats() {
    // Для каждого типа корабля генерируем нужное количество кораблей
    // нужного количества палуб
    for (let boatType of this.boatTypes) {
      for (let i = 0; i < boatType.numberOfBoats; i++) {
        let isPlaced = false
        while (!isPlaced) {
          isPlaced = this.generateBoat(boatType.decks)
        }
        // Считаем количество оставшихся клеток с кораблями
        this.boatCellsLeft += boatType.decks
      }
    }
  }

  private generateBoat(decks: number) {
    const direction: Orientation = Random.int() ? "vertical" : "horizontal"
    // Продольная координата
    const linearCoordinate = Random.int(this.boardSize - decks)
    // Поперечная координата
    const crossCoordinate = Random.int(this.boardSize - 1)
    // В зависимости от направления корабля мы меняем местами продольную
    // и поперечную координаты и получаем верные x и y в зависимости от направления
    const startPosition: Point = {
      x: direction === "horizontal" ? linearCoordinate : crossCoordinate,
      y: direction === "horizontal" ? crossCoordinate : linearCoordinate
    }

    return this.placeBoat(decks, startPosition, direction)
  }

  // Пытаемся поставить корабль в данную позицию
  private placeBoat(decks: number, start: Point, direction: Orientation) {
    // Проверяем возможно ли поставить корабль в эту позицию
    if (this.checkBoatPosition(decks, start, direction)) {
      // Проставляем каждую клетку корабля на доске
      for (let i = 0; i < decks; i++) {
        if (direction === "horizontal") {
          this.board[start.y][start.x + i] = "boat"
        } else {
          this.board[start.y + i][start.x] = "boat"
        }
      }
      return true
    } else {
      return false
    }
  }

  private checkBoatPosition(decks: number, start: Point, direction: Orientation) {
    // Пробегаем вдоль корабля, за 1 клетку до и за 1 клетку после, чтобы проверить
    // все клетки корабля и по 1й клетке вокруг него
    if (direction === "horizontal") {
      for (let x = start.x - 1; x <= start.x + decks; x++) {
        if (!this.checkPoint({x: x, y: start.y}, direction)) return false
      }
    } else {
      for (let y = start.y - 1; y <= start.y + decks; y++) {
        if (!this.checkPoint({x: start.x, y: y}, direction)) return false
      }
    }
    return true
  }

  private checkPoint(point: Point, direction: Orientation) {
    // Проверяем указанную точку и на 1 клетку перпендикулярно оси
    // на наличие в них корабля
    for (let i = -1; i <= 1; i++) {
      if (direction === "horizontal") {
        if (!this.checkCell({x: point.x, y: point.y + i})) return false
      } else {
        if (!this.checkCell({x: point.x + i, y: point.y})) return false
      }
    }

    return true
  }

  private checkCell(point: Point) {
    // Проверяем находится ли эта клетка в пределах поля
    // и нет ли на этой клетки кораблей
    if (
      point.x >= 0 && point.x < this.boardSize
      && point.y >= 0 && point.y < this.boardSize
      && this.board[point.y][point.x] !== "empty"
    ) return false

    return true
  }

  private generateLine(): Line {
    const col: Line = []
    for (let x = 0; x < this.boardSize; x++) {
      col.push("empty")
    }
    return col
  }

  private generateBoard() {
    for (let y = 0; y < this.boardSize; y++) {
      const column = this.generateLine()
      this.board.push(column)
    }
  }

  // Применяем выстрел по доске
  public makeShot(point: Point) {
    // Если в указанной точке находится клетка корабля,
    // учитываем попадание по кораблю
    if (this.board[point.y][point.x] === "boat") {
      this.board[point.y][point.x] = "damaged"
      this.boatCellsLeft--
    }
    // Если клетка пустая, учитываем промах
    if (this.board[point.y][point.x] === "empty") {
      this.board[point.y][point.x] = "missed"
    }

    // Если не осталось клеток кораблей, то засчитываем проигрыш
    if (!this.boatCellsLeft) {
      return true
    }

    return false
  }

  // Вывод доски
  public print() {
    const symbols: {[key: string]: string} = {
      "empty": " ",
      "boat": "\u25A2",
      "missed": ".",
      "damaged": "x"
    }
    console.log("a b c d e f g h i j \n")
    for(let y = 0; y < this.boardSize; y++) {
      const line = this.board[y].reduce<string>((result, current) => {
        const symbol = symbols[current as string]
        return result + symbol + " "
      }, "")
      console.log(line, y + 1)
    }
  }
}