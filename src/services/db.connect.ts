import mongoose from 'mongoose';
import 'dotenv/config';

export const dbConnect = () => {
  const user = process.env.USER_DB;
  const passwd = process.env.PASSWD_DB;
  const cluster = 'cluster0.cbnokaf.mongodb.net';
  const dataBase = 'W7ch5';
  const uri = `mongodb+srv://${user}:${passwd}@${cluster}/${dataBase}?retryWrites=true&w=majority`;
  return mongoose.connect(uri);
};
