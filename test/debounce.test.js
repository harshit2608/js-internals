const debounce = require('../src/debounce');

describe('TEST_DEBOUNCE', () => {
  let mockFn;

  beforeEach(() => {
    mockFn = jest.fn();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  test('should be defined', () => {
    expect(debounce).toBeDefined();
  });

  test('should delay execution', () => {
    const debouncedFn = debounce(mockFn, 1000);
    debouncedFn();

    expect(mockFn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1000);

    expect(mockFn).toHaveBeenCalled();
  });

  test('should call the function only once within the delay period', () => {
    const debouncedFn = debounce(mockFn, 1000);
    debouncedFn();
    debouncedFn();
    debouncedFn();

    jest.advanceTimersByTime(1000);

    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  test('should not call the function if invoked repeatedly within the delay period', () => {
    const debouncedFn = debounce(mockFn, 1000);
    debouncedFn();
    jest.advanceTimersByTime(500);
    debouncedFn();
    jest.advanceTimersByTime(500);
    debouncedFn();
    jest.advanceTimersByTime(500);

    expect(mockFn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(500);

    expect(mockFn).toHaveBeenCalledTimes(1);
  });
})
