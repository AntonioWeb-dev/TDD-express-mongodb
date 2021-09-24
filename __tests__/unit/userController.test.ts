import { UserController } from '../../src/controllers/UserController';
import CustomError from '../../src/utils/CustomError';
import { NextFunction, Request, Response } from 'express';

describe("Testing errors handler", () => {
  const internalError = new CustomError('internal error', 500)
  const badRequestError = new CustomError('bad request', 400)
  const notFoundError = new CustomError('bad request', 404)
  const response = { json: jest.fn() } as any as Response;
  const request = {
    params: "mock",
    body: {
      name: "antonio",
      email: "example@gmail.com",
      age: "12345678"
    }
  } as any as Request;
  const next = jest.fn() as NextFunction;
  test("Should return a error with status 500", () => {
    const userServiceMock = {
      create: jest.fn(),
      show: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      index: jest.fn(),
    }
    jest.spyOn(userServiceMock, 'index')
      .mockImplementation(() => {
        throw internalError
      })

    const userController = new UserController(userServiceMock)
    userController.index(request, response, next);
    expect(next).toHaveBeenCalledWith(internalError)
  })
  test("Should return a error with status 400", () => {
    const userServiceMock = {
      create: jest.fn(),
      show: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      index: jest.fn(),
    }
    jest.spyOn(userServiceMock, 'create')
      .mockImplementation(() => {
        throw badRequestError
      })

    const userController = new UserController(userServiceMock)
    userController.create(request, response, next);
    expect(next).toHaveBeenCalledWith(badRequestError)
  })
  test("Should return a error with status 404", () => {
    const userServiceMock = {
      create: jest.fn(),
      show: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      index: jest.fn(),
    }
    jest.spyOn(userServiceMock, 'show')
      .mockImplementation(() => {
        throw badRequestError
      })

    const userController = new UserController(userServiceMock)
    userController.show(request, response, next);
    expect(next).toHaveBeenCalledWith(notFoundError)
  })
})
