import { valToColorHex } from ".";

const testArr = [
  '#1', '#2', '#3', '#4'
]

it('should return first hex string', () => {
  expect(valToColorHex(0, 100, testArr)).toBe('#1');
  expect(valToColorHex(33, 100, testArr)).toBe('#1');
})

it('should return second hex string', () => {
  expect(valToColorHex(34, 100, testArr)).toBe('#2');
  expect(valToColorHex(66, 100, testArr)).toBe('#2');
})

it('should return third hex string', () => {
  expect(valToColorHex(67, 100, testArr)).toBe('#3');
  expect(valToColorHex(99, 100, testArr)).toBe('#3');
})

it('should return last hex string', () => {
  expect(valToColorHex(100, 100, testArr)).toBe('#4');
  expect(valToColorHex(105, 100, testArr)).toBe('#4');
  expect(valToColorHex(200, 100, testArr)).toBe('#4');
})
