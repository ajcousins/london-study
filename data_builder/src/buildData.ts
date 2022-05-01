import dotenv from 'dotenv';
import axios from 'axios';
import fs from 'fs';
import { Cell } from './types';

dotenv.config();

console.log('dotenv', process.env.REACT_APP_TFL_API_KEY);

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
    return 10001;
  }
};

getJourneyTime('e63bq', 'se280nj');

const data = JSON.parse(fs.readFileSync('./output/coords.json', 'utf8'));
console.log('data:', data);

const putTimes = async (cellArray: Cell[], target: string) => {
  const promiseArr = cellArray.map(cell => {
    return getJourneyTime(`${cell.centerLatLng}`, target)
  })
  const resolvedArr = await Promise.all(promiseArr)
  console.log("promiseArr:", promiseArr);
  console.log("resolvedArr:", resolvedArr);
  return resolvedArr
  
  
};

putTimes(data, 'e63bq');
