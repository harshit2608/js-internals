const curry = require('../src/currying');

describe('CURRY', () => {
  function sum(a, b, c) {
    return a + b + c;
  }

  let curriedSum;

  beforeEach(() => {
    curriedSum = curry(sum);
  });

  test('should be defined', () => {
    expect(curry).toBeDefined();
  });

  test('should return a function when not enough arguments are provided', () => {
    expect(typeof curriedSum(1)).toBe('function');
  });

  test('should return the correct sum when all arguments are provided separately', () => {
    expect(curriedSum(1)(2)(3)).toBe(6);
  });

  test('should return the correct sum when some arguments are provided together', () => {
    expect(curriedSum(1, 2)(3)).toBe(6);
    expect(curriedSum(1)(2, 3)).toBe(6);
  });

  test('should return the correct sum when all arguments are provided at once', () => {
    expect(curriedSum(1, 2, 3)).toBe(6);
  });

  test('should handle different types of inputs', () => {
    function concatStrings(a, b, c) {
      return a + b + c;
    }
    const curriedConcat = curry(concatStrings);
    expect(curriedConcat('Hello, ')('World')('!')).toBe('Hello, World!');
  });

  test('should correctly curry a function with more than 3 arguments', () => {
    function multiply(a, b, c, d) {
      return a * b * c * d;
    }
    const curriedMultiply = curry(multiply);
    expect(curriedMultiply(2)(3)(4)(5)).toBe(120);
    expect(curriedMultiply(2, 3)(4, 5)).toBe(120);
    expect(curriedMultiply(2, 3, 4)(5)).toBe(120);
  });

  test('should handle zero arguments correctly', () => {
    function returnZero() {
      return 0;
    }
    const curriedZero = curry(returnZero);
    expect(curriedZero()).toBe(0);
  });

  test('should handle multiple calls with different argument counts correctly', () => {
    function complexSum(a, b, c, d, e) {
      return a + b + c + d + e;
    }
    const curriedComplexSum = curry(complexSum);
    expect(curriedComplexSum(1)(2)(3)(4)(5)).toBe(15);
    expect(curriedComplexSum(1, 2)(3)(4, 5)).toBe(15);
    expect(curriedComplexSum(1, 2, 3)(4, 5)).toBe(15);
    expect(curriedComplexSum(1)(2, 3, 4, 5)).toBe(15);
  });
});
