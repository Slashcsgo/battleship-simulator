import Random from "./Helpers/Random";
import Player from "./Player";
import { Point } from "./types";

export default class AI1 extends Player {
  protected movesDone: Point[] = []

  public makeMove(): Point {
    let point: Point | null = null;

    // Пока не найдена случайная уникальная точка,
    // продолжаем поиск
    while (!point) {
      const x = Random.int(this.desk.boardSize - 1)
      const y = Random.int(this.desk.boardSize - 1)
      // Если в сделанных ходах нет текущего хода, то сохраняем
      // и возвращаем ход
      if (!this.movesDone.find(e => e.x === x && e.y === y)) {
        point = { x, y }
        this.movesDone.push(point)
      }
    }

    return point
  }
}