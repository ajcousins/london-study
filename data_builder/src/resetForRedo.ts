import fs from 'fs';
import { Cell } from './types';

let jsonData = JSON.parse(fs.readFileSync('./output/coords.json', 'utf8'));

const resetedArr = jsonData.map((cell: Cell) => {
  if (cell.journeyTime === 10001) {
    return {
      ...cell,
      journeyTime: 10000,
    };
  } else return cell;
});

const newCells = JSON.stringify(resetedArr, null, 2);
fs.writeFileSync('./output/coords.json', newCells);
