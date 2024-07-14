const throttling = require('../src/throttling');

const mockFn = jest.fn();

describe('THROTTLING', () => {

  beforeEach(() => {
    mockFn.mockClear();
  });

  test('should call the function at most once per interval', done => {
    const throttledFn = throttling(mockFn, 100);

    throttledFn();
    throttledFn();
    throttledFn();

    setTimeout(() => {
      expect(mockFn).toHaveBeenCalledTimes(1);
      done();
    }, 150);
  });

  test('should allow multiple calls after the interval', done => {
    const throttledFn = throttling(mockFn, 100);

    throttledFn();
    setTimeout(() => { throttledFn(); }, 150);

    setTimeout(() => {
      expect(mockFn).toHaveBeenCalledTimes(2);
      done();
    }, 200);
  });

  test('should call the function with the correct arguments', done => {
    const throttledFn = throttling(mockFn, 100);

    throttledFn(1, 2);
    setTimeout(() => { throttledFn(3, 4); }, 150);

    setTimeout(() => {
      expect(mockFn).toHaveBeenCalledWith(1, 2);
      done();
    }, 200);
  });

  test('should call the function with the correct `this` context', done => {
    const obj = {
      value: 42,
      throttledFn: throttling(function () {
        expect(this.value).toBe(42);
      }, 100)
    };

    obj.throttledFn();
    setTimeout(() => { obj.throttledFn(); }, 150);

    setTimeout(done, 200);
  });

  test('should not call the function within the interval if throttled', done => {
    const throttledFn = throttling(mockFn, 100);

    throttledFn();
    throttledFn();
    throttledFn();

    setTimeout(() => {
      expect(mockFn).toHaveBeenCalledTimes(1);
      throttledFn();
      expect(mockFn).toHaveBeenCalledTimes(2);
      done();
    }, 200);
  });

  test('should call the function at most once per interval during continuous calls', done => {
    const throttledFn = throttling(mockFn, 100);
    const intervalId = setInterval(() => { throttledFn(); }, 50);

    setTimeout(() => {
      clearInterval(intervalId);
      expect(mockFn).toHaveBeenCalledTimes(2);
      done();
    }, 200);
  });

  test('should respect different intervals', done => {
    const throttledFn1 = throttling(mockFn, 50);
    const throttledFn2 = throttling(mockFn, 100);

    throttledFn1();
    throttledFn2();

    setTimeout(() => {
      expect(mockFn).toHaveBeenCalledTimes(2);
      done();
    }, 150);
  });
});
