import { createRequest, createResponse } from 'node-mocks-http';

import ValidatorMiddleware from './ValidatorMiddleware';
import loginSchema from '../../schemas/login';

const req = createRequest();
const res = createResponse();

describe('ValidatorMiddleware', (): void => {
  const validatorMiddleware = new ValidatorMiddleware();

  afterAll((): void => {
    jest.resetAllMocks();
  });

  test('invokes a callback function when request is valid', (): void => {
    const mockFn: jest.Mock = jest.fn();

    req.body = {
      username: 'john.doe',
      password: 'secretpassword',
    };

    validatorMiddleware.validate(loginSchema)(req, res, mockFn);

    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  test('throws an error when request is invalid', (): void => {
    const mockFn: jest.Mock = jest.fn();

    req.body = {
      username: 'john.doe',
    };

    expect(() => {
      validatorMiddleware.validate(loginSchema)(req, res, mockFn);
    }).toThrow();
  });
});
