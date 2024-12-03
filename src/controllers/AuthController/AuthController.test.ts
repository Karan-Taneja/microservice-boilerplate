import { createRequest, createResponse } from 'node-mocks-http';

import UnauthorizedError from '../../errors/UnauthorizedError';
import AuthService from '../../services/AuthService';
import AuthController from './AuthController';

jest.mock('../../services/AuthService');

const mockLoginResult = { username: 'john.doe', password: '1234' };
const req = createRequest();
const res = createResponse();
res.status = jest.fn();
res.json = jest.fn();
const mockedService = jest.mocked(AuthService, { shallow: true });

describe('AuthController', (): void => {
  afterEach((): void => {
    jest.clearAllMocks();
  });

  test('adds the login result to the response payload', async () => {
    const authController: AuthController = new AuthController();
    const serviceInstance = mockedService.mock.instances[0];

    serviceInstance.login = jest
      .fn()
      .mockImplementationOnce(() => mockLoginResult);

    req.body = {
      username: mockLoginResult.username,
      password: mockLoginResult.password,
    };

    await authController.login(req, res);

    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(mockLoginResult);
  });

  test('throws an error if credentials are invalid', async () => {
    const authController: AuthController = new AuthController();
    const serviceInstance = mockedService.mock.instances[0];

    serviceInstance.login = jest.fn().mockImplementationOnce(() => {
      throw new UnauthorizedError('Incorrect username or password');
    });

    req.body = {
      username: 'wrong.username',
      password: 'wrongpassword',
    };

    expect(authController.login(req, res)).rejects.toThrow(UnauthorizedError);
  });
});
