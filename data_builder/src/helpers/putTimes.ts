import dotenv from 'dotenv';
import { Cell } from '../types';
import getJourneyTime from './getJourneyTime';
import fs from 'fs';
dotenv.config();

const putTimes = async (cellArray: Cell[], target: string, limit: number):Promise<Cell[]> => {
  let count = limit;
  const batch = [];

  for (let i = 0; i < cellArray.length; i++) {
    if (count === 0) break;
    if (cellArray[i].journeyTime > 9999 && cellArray[i].journeyTime < 10001) {
      batch.push(cellArray[i]);
      count--;
    }
  }

    const result = await updateCells(batch, target);
    return result;
};

const updateCells = async (
  cellsBatch: Cell[],
  target: string
): Promise<Cell[]> => {
  return await Promise.all(
    cellsBatch.map(async (cell) => {
      const result = await getJourneyTime(`${cell.centerLatLng}`, target);
      if (!result) {
        return {
          ...cell,
          journeyTime: cell.journeyTime + 1,
        };
      } else
        return {
          ...cell,
          journeyTime: result,
        };
    })
  );
};

export const updateJsonArr = (cellArray: Cell[], result: Cell[]):Cell[] => {
  const cells = [...cellArray];

  if (!result.length) {
    console.log('No cells were updated');
    return cells;
  }

  // For each cell result, replace updated cell back into main array.
  result.forEach((updated) => {
    const idx = cells.findIndex((cell: Cell) => {
      if (
        updated.centerLatLng[0] === cell.centerLatLng[0] &&
        updated.centerLatLng[1] === cell.centerLatLng[1]
      ) {
        return true;
      } else return false;
    });
    cells.splice(idx, 1, updated);
  });
  const newCells = JSON.stringify(cells, null, 2);
  fs.writeFileSync('./output/coords.json', newCells);
  return cells;
};

export default putTimes;
