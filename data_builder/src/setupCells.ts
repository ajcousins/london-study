import fs from 'fs';
import initCells from './helpers/initCells';

const PIXEL_SIZE = 25; // in pixels
const CANVAS_SIZE = [1425, 1085]; // in pixels
const ORIGIN_LATLNG = [51.71968, -0.57052]; // Top left of canvas (y / x)

const cells = initCells(PIXEL_SIZE, CANVAS_SIZE, ORIGIN_LATLNG);
const data = JSON.stringify(cells, null, 2);

fs.writeFileSync(`./output/coords.json`, data);
