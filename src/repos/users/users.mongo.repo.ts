import createDebug from 'debug';
import { Repository } from '../repo.js';
import { Auth } from '../../services/auth.js';
import { UserModel } from './users.mongo.model.js';
import { LoginUser, User } from '../../entities/user.js';
import { HttpError } from '../../types/http.error.js';

const debug = createDebug('W7E:users:mongo:repo');

export class UsersMongoRepo implements Repository<User> {
  constructor() {
    debug('Instantiated');
  }

  async create(newItem: Omit<User, 'id'>): Promise<User> {
    newItem.passwd = await Auth.hash(newItem.passwd);
    const result: User = await UserModel.create(newItem);
    return result;
  }

  async login(loginUser: LoginUser): Promise<User> {
    const result = await UserModel.findOne({ email: loginUser.email }).exec();
    if (!result || !(await Auth.compare(loginUser.passwd, result.passwd)))
      throw new HttpError(401, 'Unauthorized');
    return result;
  }

  async getAll(): Promise<User[]> {
    const result = await UserModel.find().exec();
    return result;
  }

  async getById(id: string): Promise<User> {
    const result = await UserModel.findById(id).exec();
    if (!result) throw new HttpError(404, 'Not Found', 'GetByid not possible');
    return result;
  }

  async search({
    key,
    value,
  }: {
    key:
      | 'id'
      | 'name'
      | keyof LoginUser
      | 'surname'
      | 'age'
      | 'friends'
      | 'enemies';
    value: unknown;
  }): Promise<User[]> {
    const result = await UserModel.find({ [key]: value }).exec();
    return result;
  }

  async update(id: string, updatedItem: Partial<User>): Promise<User> {
    if (id === updatedItem.id)
      throw new HttpError(406, 'Not Acceptable', 'You can´t add yourself');
    const result = await UserModel.findByIdAndUpdate(id, updatedItem, {
      new: true,
    }).exec();
    if (!result) throw new HttpError(404, 'Not Found', 'Update not possible');
    return result;
  }

  async addFriend(friendId: User['id'], userId: User['id']): Promise<User> {
    if (friendId === userId)
      throw new HttpError(406, 'Not Acceptable', 'You can´t add yourself');
    const user = await UserModel.findById(userId).exec();
    if (!user) {
      throw new HttpError(404, 'Not Found', 'User not found');
    }

    if (user.friends.includes(friendId as unknown as User)) {
      return user;
    }

    if (user.enemies.includes(friendId as unknown as User)) {
      const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        { $pull: { enemies: friendId } },
        {
          new: true,
        }
      ).exec();

      if (!updatedUser) {
        throw new HttpError(404, 'Not Found', 'Update not possible');
      }
    }

    // Actualizar la lista de amigos
    const result = await UserModel.findByIdAndUpdate(
      userId,
      { $push: { friends: friendId } },
      {
        new: true,
      }
    ).exec();

    if (!result) {
      throw new HttpError(404, 'Not Found', 'Update not possible');
    }

    return result;
  }

  async addEnemy(enemyId: User['id'], userId: User['id']): Promise<User> {
    if (enemyId === userId)
      throw new HttpError(406, 'Not Acceptable', 'You can´t add yourself');
    const user = await UserModel.findById(userId).exec();
    if (!user) {
      throw new HttpError(404, 'Not Found', 'User not found');
    }

    if (user.enemies.includes(enemyId as unknown as User)) {
      return user;
    }

    if (user.friends.includes(enemyId as unknown as User)) {
      const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        { $pull: { friends: enemyId } },
        {
          new: true,
        }
      ).exec();

      if (!updatedUser) {
        throw new HttpError(404, 'Not Found', 'Update not possible');
      }
    }

    const result = await UserModel.findByIdAndUpdate(
      userId,
      { $push: { enemies: enemyId } },
      {
        new: true,
      }
    ).exec();

    if (!result) {
      throw new HttpError(404, 'Not Found', 'Update not possible');
    }

    return result;
  }

  async delete(id: string): Promise<void> {
    const result = await UserModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new HttpError(404, 'Not Found', 'Delete not possible');
    }
  }

  async removeEnemy(
    enemyIdToRemove: User['id'],
    userId: User['id']
  ): Promise<User> {
    // eslint-disable-next-line no-useless-catch
    try {
      const user = await UserModel.findById(userId).exec();

      if (!user) {
        throw new HttpError(404, 'Not Found', 'User not found');
      }

      if (!user.enemies.includes(enemyIdToRemove as unknown as User)) {
        // El enemigo no está presente, no es necesario hacer cambios
        return user;
      }

      const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        { $pull: { enemies: enemyIdToRemove } },
        { new: true }
      ).exec();

      if (!updatedUser) {
        throw new HttpError(404, 'Not Found', 'Update not possible');
      }

      return updatedUser;
    } catch (error) {
      // Puedes manejar el error según tus necesidades
      throw error;
    }
  }

  async removeFriend(
    friendIdToRemove: User['id'],
    userId: User['id']
  ): Promise<User> {
    // eslint-disable-next-line no-useless-catch
    try {
      const user = await UserModel.findById(userId).exec();

      if (!user) {
        throw new HttpError(404, 'Not Found', 'User not found');
      }

      if (!user.friends.includes(friendIdToRemove as unknown as User)) {
        // El amigo no está presente, no es necesario hacer cambios
        return user;
      }

      const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        { $pull: { friends: friendIdToRemove } },
        { new: true }
      ).exec();

      if (!updatedUser) {
        throw new HttpError(404, 'Not Found', 'Update not possible');
      }

      return updatedUser;
    } catch (error) {
      throw error;
    }
  }
}
