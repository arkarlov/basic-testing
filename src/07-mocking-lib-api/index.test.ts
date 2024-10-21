import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.unmock('axios');
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    const baseUrl = 'https://jsonplaceholder.typicode.com';
    const relativePath = 'mock/path';
    const mockData = 'mock data';

    axios.create = jest.fn().mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: mockData }),
    });

    await throttledGetDataFromApi(relativePath);
    jest.runAllTimers();
    expect(axios.create).toHaveBeenCalledWith({ baseURL: baseUrl });
  });

  test('should perform request to correct provided url', async () => {
    const baseUrl = 'https://jsonplaceholder.typicode.com';
    const relativePath = 'mock/path';
    const mockData = 'mock data';

    axios.create = jest.fn().mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: mockData }),
    });
    const mockInstance = axios.create({ baseURL: baseUrl });

    await throttledGetDataFromApi(relativePath);
    jest.runAllTimers();
    expect(mockInstance.get).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const relativePath = 'mock/path';
    const mockData = 'mock data';

    axios.create = jest.fn().mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: mockData }),
    });

    const result = await throttledGetDataFromApi(relativePath);
    jest.runAllTimers();
    expect(result).toBe(mockData);
  });
});
