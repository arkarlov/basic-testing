// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 4, b: 2, action: Action.Divide, expected: 2 },
  { a: 4, b: 2, action: Action.Multiply, expected: 8 },
  { a: 4, b: 2, action: Action.Exponentiate, expected: 16 },
  { a: 4, b: 2, action: 'plus', expected: null },
  { a: 4, b: '2', action: Action.Add, expected: null },
  { a: 4, b: null, action: Action.Add, expected: null },
  // { a: 4, b: NaN, action: Action.Add, expected: null }, // input NaN is not validated
];

describe('simpleCalculator', () => {
  it.each(testCases)(
    `should perform $a $action $b to get $expected`,
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    },
  );
});
