import fs from 'fs';

const initCells = () => {
  const SQUARE_DIM = 55.2904; // pixels
  const SQUARES_PER_ROW = 25; // no.
  const SQUARES_PER_COL = 20; // no.
  const ORIGIN_LATLNG = [51.71968, -0.57052]; // Top left of canvas (y / x)
  const SQUARE_DIM_LATLNG = [0.022944028, 0.036585772]; // HEIGHT / WIDTH

  const centerYOrigin = ORIGIN_LATLNG[0] - SQUARE_DIM_LATLNG[0] / 2;
  const centerXOrigin = ORIGIN_LATLNG[1] + SQUARE_DIM_LATLNG[1] / 2;

  const cellsArr = [];
  for (let y = 0; y < SQUARES_PER_COL; y++) {
    for (let x = 0; x < SQUARES_PER_ROW; x++) {
      cellsArr.push({
        pxCoord: [y * SQUARE_DIM, x * SQUARE_DIM],
        centerLatLng: [centerYOrigin - y * SQUARE_DIM_LATLNG[0], centerXOrigin + x * SQUARE_DIM_LATLNG[1]],
        journeyTime: 10000,
      });
    }
  }
  return cellsArr;
};

const cells = initCells()
const data = JSON.stringify(cells, null, 2);

fs.writeFileSync(`./output/coords.json`, data)