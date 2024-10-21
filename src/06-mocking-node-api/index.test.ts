import fs from 'fs';
import fs_promises from 'fs/promises';
import path from 'path';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const timeout = 1000;
    const callback = jest.fn();
    const spySetTimeout = jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(callback, timeout);

    expect(spySetTimeout).toHaveBeenCalledWith(callback, timeout);
  });

  test('should call callback only after timeout', () => {
    const timeout = 1000;
    const callback = jest.fn();

    doStuffByTimeout(callback, timeout);

    expect(callback).not.toHaveBeenCalled();
    jest.runAllTimers();
    expect(callback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const interval = 1000;
    const callback = jest.fn();
    const spySetInterval = jest.spyOn(global, 'setInterval');

    doStuffByInterval(callback, interval);

    expect(spySetInterval).toHaveBeenCalledWith(callback, interval);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const interval = 1000;
    const callback = jest.fn();

    doStuffByInterval(callback, interval);

    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(5000);
    expect(callback).toHaveBeenCalledTimes(5);
  });
});

describe('readFileAsynchronously', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should call join with pathToFile', async () => {
    const pathToFile = 'mockFile.txt';

    jest.spyOn(fs, 'existsSync').mockReturnValueOnce(false);
    const spyJoin = jest
      .spyOn(path, 'join')
      .mockImplementation((...paths) =>
        paths.includes(pathToFile) ? 'Yes' : 'No',
      );

    await readFileAsynchronously(pathToFile);
    expect(spyJoin).toReturnWith('Yes');
  });

  test('should return null if file does not exist', async () => {
    const pathToFile = 'mockFile.txt';

    jest.spyOn(fs, 'existsSync').mockReturnValueOnce(false);

    const result = await readFileAsynchronously(pathToFile);
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const pathToFile = 'mockFile.txt';
    const fileContent = 'mock content';

    jest.spyOn(fs, 'existsSync').mockReturnValueOnce(true);
    jest.spyOn(fs_promises, 'readFile').mockReturnValueOnce(
      new Promise((res) => {
        res(fileContent);
      }),
    );

    const result = await readFileAsynchronously(pathToFile);
    expect(result).toBe(fileContent);
  });
});
