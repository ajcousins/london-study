import pixelDimToLatLng from './pixelDimToLatLng';

const initCells = (
  pixelSize: number,
  canvasSize: number[],
  originLatLng: number[]
) => {
  const squaresPerRow = Math.ceil(canvasSize[0] / pixelSize);
  const squaresPerCol = Math.ceil(canvasSize[1] / pixelSize);
  const squareDimLatLng = [
    pixelDimToLatLng(pixelSize, 'h'),
    pixelDimToLatLng(pixelSize, 'w'),
  ]; // HEIGHT / WIDTH
  const centerYOrigin = originLatLng[0] - squareDimLatLng[0] / 2;
  const centerXOrigin = originLatLng[1] + squareDimLatLng[1] / 2;

  const cellsArr = [];
  for (let y = 0; y < squaresPerCol; y++) {
    for (let x = 0; x < squaresPerRow; x++) {
      cellsArr.push({
        pxCoord: [y * pixelSize, x * pixelSize],
        centerLatLng: [
          centerYOrigin - y * squareDimLatLng[0],
          centerXOrigin + x * squareDimLatLng[1],
        ],
        journeyTime: 10000,
      });
    }
  }
  return cellsArr;
};

export default initCells;