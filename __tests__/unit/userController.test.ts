import { UserController } from '../../src/controllers/UserController';
import CustomError from '../../src/utils/CustomError';
import { NextFunction, Request, Response } from 'express';
import { IS3Service } from '../../src/interfaces/s3.interface';


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
      age: "12",
      password: "12345678"
    },
    file: null
  } as any as Request;
  const next = jest.fn() as NextFunction;
  const s3ClientMock = { send: jest.fn() } as any as IS3Service;

  const userServiceMock = {
    create: jest.fn(),
    show: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    index: jest.fn(),
    findByEmail: jest.fn(),

  }
  test("Should return a error with status 500", () => {
    jest.spyOn(userServiceMock, 'index')
      .mockImplementation(() => {
        throw internalError
      })

    const userController = new UserController(userServiceMock, s3ClientMock)
    userController.index(request, response, next);
    expect(next).toHaveBeenCalledWith(internalError)
  })

  test("Should return a error with status 400", async () => {
    const requestFormData = {
      params: "mock",
      body: {
        "body": JSON.stringify({
          name: "antonio",
          email: "example@gmail.com",
          age: "12345678",
          password: "12345678"
        })
      },
      file: null
    } as any as Request;

    jest.spyOn(userServiceMock, 'create')
      .mockImplementation(() => {
        throw badRequestError
      })

    const userController = new UserController(userServiceMock, s3ClientMock)
    await userController.create(requestFormData, response, next);
    expect(next).toHaveBeenCalledWith(badRequestError)
  })
  test("Should return a error with status 404", () => {
    jest.spyOn(userServiceMock, 'show')
      .mockImplementation(() => {
        throw badRequestError
      })

    const userController = new UserController(userServiceMock, s3ClientMock)
    userController.show(request, response, next);
    expect(next).toHaveBeenCalledWith(notFoundError)
  })
})
