import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator({ a: 3, b: 4, action: Action.Add });
    expect(result).toBe(7);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({ a: 3, b: 4, action: Action.Subtract });
    expect(result).toBe(-1);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({ a: 3, b: 4, action: Action.Multiply });
    expect(result).toBe(12);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({ a: 3, b: 4, action: Action.Divide });
    expect(result).toBe(0.75);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({
      a: 3,
      b: 4,
      action: Action.Exponentiate,
    });
    expect(result).toBe(81);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({
      a: 3,
      b: 4,
      action: 'plus',
    });
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({
      a: '3',
      b: 4,
      action: Action.Add,
    });
    expect(result).toBeNull();
  });

  // test('should return null for invalid arguments', () => {
  //   const result = simpleCalculator({
  //     a: NaN,
  //     b: 4,
  //     action: Action.Add,
  //   });
  //   expect(result).toBeNull();
  // });
});
