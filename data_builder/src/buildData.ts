import dotenv from 'dotenv';
import axios from 'axios';
import fs from 'fs';
import { Cell } from './types';

dotenv.config();

// console.log('dotenv', process.env.REACT_APP_TFL_API_KEY);
const TARGET = "se280nj";

const getJourneyTime = async (cellCoords: string, target: string) => {
  const params = {
    app_key: `${process.env.REACT_APP_TFL_API_KEY}`,
    time: '1400',
    timeIs: 'Departing',
  };
  try {
    const res = await axios.get(
      `https://api.tfl.gov.uk/Journey/JourneyResults/${cellCoords}/to/${target}`,
      { params }
    );
    return res.data.journeys.reduce(
      (prev: number, cur: any) => (cur.duration < prev ? cur.duration : prev),
      Infinity
    );
  } catch {
    return null;
  }
};

getJourneyTime('e63bq', 'se280nj');

const jsonData = JSON.parse(fs.readFileSync('./output/coords.json', 'utf8'));
// console.log('jsonData:', jsonData);

const putTimes = async (cellArray: Cell[], target: string, limit: number) => {
  /*
  - Take the first 20 entries where journeyTime > 9999 and save them into a batch array
  - Process those 20 entries
  - Put those entries back into the main array and save as json.
  */

  let count = limit;
  const batch = [];

  for (let i = 0; i < cellArray.length; i++) {
    if (count === 0) break;
    if (cellArray[i].journeyTime > 9999 && cellArray[i].journeyTime < 10004) {
      // if there have been 3 attempts
      batch.push(cellArray[i])
      count--;
    }
  }

  console.log("batch:", batch);

  if (batch.length) {
    const result = await updateCells(batch);
    console.log("result:", result);
    if (result) {
      updateJsonArr(cellArray, result);
    }
  }
 
  /*
  const promiseArr = cellArray.map(cell => {
    return getJourneyTime(`${cell.centerLatLng}`, target)
  })
  const resolvedArr = await Promise.all(promiseArr)
  console.log("promiseArr:", promiseArr);
  console.log("resolvedArr:", resolvedArr);
  return resolvedArr
  */
  
};

const updateCells = async (cellsBatch: Cell[]): Promise<Cell[]> => {
  return await Promise.all(
    cellsBatch.map(async (cell) => {
      const result = await getJourneyTime(`${cell.centerLatLng}`, TARGET);
      if (!result) {
        return {
          ...cell,
        journeyTime: cell.journeyTime + 1,
        }
      }
      else return {
        ...cell,
        journeyTime: result
      }
    })
  )
}

const updateJsonArr = (cellArray:Cell[], result:Cell[]) => {
  const cells = [...cellArray];

  if (!result.length) {
    console.log("No cells were updated");
    return;
  }

  // For each cell result, replace updated cell back into main array.
  result.forEach((updated) => {
    const idx = cells.findIndex((cell: Cell) => {
      if (updated.centerLatLng[0] === cell.centerLatLng[0] &&
        updated.centerLatLng[1] === cell.centerLatLng[1]) {
          return true;
        }
        else return false;

    })
    cells.splice(idx, 1, updated)
  })
  const newCells = JSON.stringify(cells, null, 2);
  fs.writeFileSync('./output/coords.json', newCells);
}



putTimes(jsonData, 'e63bq', 100);
