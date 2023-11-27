import { Request, Response } from 'express';
import { UsersController } from './users.controller';
import { UsersMongoRepo } from '../repos/users/users.mongo.repo';

describe('Given UsersController class', () => {
  let controller: UsersController;
  let mockRequest: Request;
  let mockResponse: Response;
  let mockNext: jest.Mock;
  beforeEach(() => {
    mockRequest = {
      body: {},
      params: {},
      query: { key: 'value' },
    } as unknown as Request;
    mockResponse = {
      json: jest.fn(),
      status: jest.fn(),
    } as unknown as Response;
    mockNext = jest.fn();
  });
  describe('When we instantiate it without errors', () => {
    beforeEach(() => {
      const mockRepo = {
        getAll: jest.fn().mockResolvedValue([{}]),
        getById: jest.fn().mockResolvedValue({}),
        search: jest.fn().mockResolvedValue([{}]),
        create: jest.fn().mockResolvedValue({}),
        update: jest.fn().mockResolvedValue({}),
        delete: jest.fn().mockResolvedValue(undefined),
      } as unknown as UsersMongoRepo;

      controller = new UsersController(mockRepo);
    });

    test('Then getAll should ...', async () => {
      await controller.getAll(mockRequest, mockResponse, mockNext);
      expect(mockResponse.json).toHaveBeenCalledWith([{}]);
    });

    test('Then getById should ...', async () => {
      await controller.getById(mockRequest, mockResponse, mockNext);
      expect(mockResponse.json).toHaveBeenCalledWith({});
    });

    // T test('Then search should ...', async () => {
    //   await controller.search(mockRequest, mockResponse, mockNext);
    //   expect(mockResponse.json).toHaveBeenCalledWith([{}]);
    // });

    test('Then create should ...', async () => {
      await controller.create(mockRequest, mockResponse, mockNext);
      expect(mockResponse.json).toHaveBeenCalledWith({});
    });

    test('Then update should ...', async () => {
      await controller.update(mockRequest, mockResponse, mockNext);
      expect(mockResponse.json).toHaveBeenCalledWith({});
    });

    test('Then delete should ...', async () => {
      await controller.delete(mockRequest, mockResponse, mockNext);
      expect(mockResponse.json).toHaveBeenCalledWith({});
    });
  });

  describe('When we instantiate it WITH errors', () => {
    let mockError: Error;
    beforeEach(() => {
      mockError = new Error('Mock error');
      const mockRepo = {
        getAll: jest.fn().mockRejectedValue(mockError),
        getById: jest.fn().mockRejectedValue(mockError),
        search: jest.fn().mockRejectedValue(mockError),
        create: jest.fn().mockRejectedValue(mockError),
        update: jest.fn().mockRejectedValue(mockError),
        delete: jest.fn().mockRejectedValue(mockError),
      } as unknown as UsersMongoRepo;

      controller = new UsersController(mockRepo);
    });

    test('Then getAll should ...', async () => {
      await controller.getAll(mockRequest, mockResponse, mockNext);
      expect(mockNext).toHaveBeenLastCalledWith(mockError);
    });

    test('Then getById should ...', async () => {
      await controller.getById(mockRequest, mockResponse, mockNext);
      expect(mockNext).toHaveBeenLastCalledWith(mockError);
    });

    test('Then create should ...', async () => {
      await controller.create(mockRequest, mockResponse, mockNext);
      expect(mockNext).toHaveBeenLastCalledWith(mockError);
    });

    test('Then update should ...', async () => {
      await controller.update(mockRequest, mockResponse, mockNext);
      expect(mockNext).toHaveBeenLastCalledWith(mockError);
    });

    test('Then delete should ...', async () => {
      await controller.delete(mockRequest, mockResponse, mockNext);
      expect(mockNext).toHaveBeenLastCalledWith(mockError);
    });

    test('Then login should...', async () => {
      const mockUserId = 'mockUserId';
      const mockLoginResult = { id: 'mockUserId', email: 'mock@example.com' };

      // Mocking the request with a userId
      const mockRequest = {
        body: { userId: mockUserId },
      } as unknown as Request;

      // Mocking the repo methods for both cases
      const mockRepo = {
        getById: jest.fn().mockResolvedValue(mockLoginResult),
        login: jest.fn().mockResolvedValue(mockLoginResult),
      } as unknown as UsersMongoRepo;

      // Creating two instances of the controller
      const controller = new UsersController(mockRepo);

      // Testing with userId
      await controller.login(mockRequest, mockResponse, mockNext);
      expect(mockRepo.getById).toHaveBeenCalledWith(mockUserId);
      expect(mockResponse.status).toHaveBeenCalledWith(202);
      expect(mockResponse.statusMessage).toBe('Accepted');
      expect(mockResponse.json).toHaveBeenCalledWith({
        user: mockLoginResult,
        token: expect.any(String),
      });
    });
  });
});
