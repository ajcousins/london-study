import { valToColorHexDefined } from ".";

const testArr = [
  '#1', '#2', '#3', '#4', '#5'
]

it('should return first hex string', () => {
  const options = {
    journeyTime: 8,
    colourRanges: [
      15, 30, 45, 60, 90, 120, 240
    ],
    colourPalette: testArr
  }
  expect(valToColorHexDefined(options)).toBe('#1');
  
  options.journeyTime = 15;
  expect(valToColorHexDefined(options)).toBe('#1');
})

it('should return second hex string', () => {
  const options = {
    journeyTime: 16,
    colourRanges: [
      15, 30, 45, 60, 90, 120, 240
    ],
    colourPalette: testArr
  }
  expect(valToColorHexDefined(options)).toBe('#2');
  
  options.journeyTime = 30;
  expect(valToColorHexDefined(options)).toBe('#2');
})

it('should return fifth hex string', () => {
  const options = {
    journeyTime: 85,
    colourRanges: [
      15, 30, 45, 60, 90, 120, 240
    ],
    colourPalette: testArr
  }
  expect(valToColorHexDefined(options)).toBe('#5');
  
  options.journeyTime = 90;
  expect(valToColorHexDefined(options)).toBe('#5');

  options.journeyTime = 95;
  expect(valToColorHexDefined(options)).toBe('#5');

  options.journeyTime = 240;
  expect(valToColorHexDefined(options)).toBe('#5');

  options.journeyTime = 245;
  expect(valToColorHexDefined(options)).toBe('#5');
})