export type Point = {
  x: number,
  y: number
}

export type Board = Line[]

export type Line = Cell[]

export type Cell = "empty" | "boat" | "missed" | "damaged"

export type Orientation = "horizontal" | "vertical"

export type Direction = "left" | "right" | "up" | "down"