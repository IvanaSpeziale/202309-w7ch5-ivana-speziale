import { ImgData } from '../types/img.data';

export type LoginUser = {
  email: string;
  passwd: string;
};

export type User = LoginUser & {
  id: string;
  name: string;
  surname: string;
  age: number;
  avatar: ImgData;
  friends: User[];
  enemies: User[];
};
