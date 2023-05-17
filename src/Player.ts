import Desk from "./Desk";
import { Point } from "./types";

export default abstract class Player {
  protected desk: Desk

  constructor() {
    this.desk = new Desk()
  }

  // Выводим доску игрока
  public showDesk() {
    this.desk.print()
  }

  // Учитываем выстрел по доске игрока
  public shoot(point: Point) {
    return this.desk.makeShot(point)
  }

  // Определяем логику выполнения хода игрока
  abstract makeMove(): Point;
}