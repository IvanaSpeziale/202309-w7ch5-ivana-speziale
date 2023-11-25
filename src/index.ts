import { createServer } from 'http';
import { app } from './app.js';
import createDebug from 'debug';
import { dbConnect } from './services/db.connect.js';

const debug = createDebug('w7E:index');
const PORT = process.env.PORT || 3030;
const server = createServer(app);
debug('Starting server');

dbConnect()
  .then((mongoose) => {
    server.listen(PORT);
    debug('Connected to DB:', mongoose.connection.db.databaseName);
  })
  .catch((error) => server.emit('error', error));

server.on('listening', () => {
  debug('Listening on port', PORT);
});

/* Server.on('error', (error) => {
  debug(`Error ${error.message}`);
}); */
