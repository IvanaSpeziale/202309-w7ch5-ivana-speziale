import { hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import createDebug from 'debug';
import { HttpError } from '../types/http.error.js';
import { TokenPayload } from '../types/token.payload.js';

const debug = createDebug('W7E:auth');
debug('Imported');

export abstract class Auth {
  static secret = process.env.JWT_SECRET;
  static hash(value: string): Promise<string> {
    const saltRound = 10;
    return hash(value, saltRound);
  }

  static compare(value: string, hash: string): Promise<boolean> {
    return compare(value, hash);
  }

  static signJWT(payload: TokenPayload) {
    return jwt.sign(payload, Auth.secret!); // Esto es el token. Ponemos ! para decirle que no va a valer null y no chille. Tb podríamos poner una guarda.
  }

  static verifyAndGetPayload(token: string) {
    try {
      const result = jwt.verify(token, Auth.secret!);
      if (typeof result === 'string')
        throw new HttpError(498, 'Invalid token', result);
      return result as TokenPayload;
    } catch (error) {
      throw new HttpError(498, 'Invalid token', (error as Error).message);
    }
  }
}
