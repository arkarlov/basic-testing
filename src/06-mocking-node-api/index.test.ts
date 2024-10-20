import fs from 'fs';
import fs_promises from 'fs/promises';
import path from 'path';
import {
  readFileAsynchronously,
  // doStuffByTimeout,
  //  doStuffByInterval
} from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    // Write your test here
  });

  test('should call callback only after timeout', () => {
    // Write your test here
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    // Write your test here
  });

  test('should call callback multiple times after multiple intervals', () => {
    // Write your test here
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
