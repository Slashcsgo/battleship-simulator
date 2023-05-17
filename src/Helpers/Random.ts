export default class Random {
  public static int(): number;
  public static int(max: number): number;
  public static int(max: number, min: number): number;
  public static int(max?: number, min?: number): number {
    let result = Math.random()
    if (max) result = result * max
    if (min) result = result + min
    return Math.round(result)
  }
}