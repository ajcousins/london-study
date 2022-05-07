import { Cell } from '../types';

export const checkCompletedCells = (arr:Cell[]):number => {
  return arr.reduce(
    (prev: number, cur: Cell) =>
      cur.journeyTime < 10000 || cur.journeyTime > 10000 ? prev + 1 : prev,
    0
  );
}