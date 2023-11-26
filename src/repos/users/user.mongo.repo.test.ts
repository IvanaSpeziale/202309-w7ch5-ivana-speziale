import { User } from '../../entities/user';
import { UserModel } from './users.mongo.model';
import { UsersMongoRepo } from './users.mongo.repo';

jest.mock('./users.mongo.model');

describe('Given the class UsersMongoRepo', () => {
  let repo: UsersMongoRepo;
  beforeEach(() => {
    repo = new UsersMongoRepo();
  });

  describe('When it is instantiated', () => {
    test('Then, when we use the getAll() method', async () => {
      const mockExec = jest.fn().mockResolvedValueOnce([]);
      UserModel.find = jest.fn().mockReturnValueOnce({
        exec: mockExec,
      });
      const result = await repo.getAll();
      expect(mockExec).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
    test('Then, when we use the getById() method', async () => {
      const mockExec = jest.fn().mockResolvedValueOnce([]);
      UserModel.findById = jest.fn().mockReturnValueOnce({
        exec: mockExec,
      });
      const result = await repo.getById('');
      expect(mockExec).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
    test('Then, when data isnt found with the getById() method', () => {
      const mockExec = jest.fn().mockResolvedValueOnce(null);
      UserModel.findById = jest.fn().mockReturnValueOnce({
        exec: mockExec,
      });
      expect(repo.getById('')).rejects.toThrow();
    });
    test('Then, when we use the create() method', async () => {
      const mockUser = {
        userName: 'Kubo',
        password: '1234',
        firstName: 'llaalla',
        lastName: 'lalalala',
        email: 'lalala@gmail.com',
        friends: [],
        enemies: [],
      } as unknown as User;
      UserModel.create = jest.fn().mockReturnValueOnce(mockUser);
      const result = await repo.create(mockUser);
      expect(result).toEqual(mockUser);
    });
    test('Then, when we use the search() method', async () => {
      const key = 'userName';
      const value = 'Kubo';
      const mockExec = jest.fn().mockResolvedValueOnce([{}]);
      UserModel.find = jest.fn().mockReturnValueOnce({
        exec: mockExec,
      });
      const result = await repo.search({ key, value });
      expect(mockExec).toHaveBeenCalled();
      expect(result).toHaveLength(1);
    });
    test('Then, when we use the update() method', async () => {
      const mockExec = jest.fn().mockReturnValueOnce([]);
      UserModel.findByIdAndUpdate = jest.fn().mockReturnValueOnce({
        exec: mockExec,
      });
      const mockUser = {
        id: '1',
        userName: 'Kubo',
      };
      const result = await repo.update('1', mockUser);
      expect(result).toEqual([]);
      expect(mockExec).toHaveBeenCalled();
    });
    test('Then, when data isnt found with the update() method', () => {
      const mockExec = jest.fn().mockResolvedValueOnce(null);
      UserModel.findByIdAndUpdate = jest.fn().mockReturnValueOnce({
        exec: mockExec,
      });
      expect(repo.update('', {})).rejects.toThrow();
    });
    test('Then, when we use the delete() method', async () => {
      const mockExec = jest.fn().mockReturnValueOnce({});
      UserModel.findByIdAndDelete = jest.fn().mockReturnValueOnce({
        exec: mockExec,
      });
      const mockUser = {
        id: '0',
      };
      const result = await repo.delete(mockUser.id);
      expect(result).toBe(undefined);
    });
    test('Then, when data isnt found with the delete() method', () => {
      const mockExec = jest.fn().mockReturnValueOnce(null);
      UserModel.findByIdAndDelete = jest.fn().mockReturnValueOnce({
        exec: mockExec,
      });
      expect(repo.delete('')).rejects.toThrow();
    });
  });
});
