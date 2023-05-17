import Player from "./Player";
import { Direction, Point } from "./types";

export default class AI2 extends Player {
  private currentPosition: Point
  private moveDirection: Direction = "right"
  private movePerRotation = 1
  private movesCount = 0

  constructor() {
    super()
    // Находим центральную координату спирали
    const centerCoordinate = Math.floor((this.desk.boardSize - 1) / 2)
    // Сохраняем текущую позицию
    this.currentPosition = {x: centerCoordinate, y: centerCoordinate}
  }

  makeMove(): Point {
    const result  = {...this.currentPosition}

    this.movesCount++

    // Если направление горизонтальное, то меняем координату x иначе y
    if (this.moveDirection === "right" || this.moveDirection === "left") {
      let x = this.currentPosition.x
      this.moveDirection === "right" ? x++ : x--
      this.currentPosition = {
        x: x,
        y: this.currentPosition.y
      }
      // Если количество ходов в 1 направлении равно количеству ходов
      // на направление, то меняем направление и обнуляем счетчик ходов
      // в 1 направлении
      if (this.movesCount === this.movePerRotation) {
        this.moveDirection = this.moveDirection === "right"
          ? "down" : "up"
        this.movesCount = 0
      }
    } else if (this.moveDirection === "up" || this.moveDirection === "down") {
      let y = this.currentPosition.y
      this.moveDirection === "down" ? y++ : y--
      this.currentPosition = {
        x: this.currentPosition.x,
        y: y
      }
      if (this.movesCount === this.movePerRotation) {
        this.moveDirection = this.moveDirection === "down"
          ? "left" : "right"
        this.movesCount = 0
        // После каждого вертикального цикла количество ходов в 1 направлении
        // увеличивается на 1
        this.movePerRotation++
      }
    }
    
    return result
  }
}