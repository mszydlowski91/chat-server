
import { WebSocket } from './src/WebSocket';
import * as app from 'express';

import * as User from './src/User';

const port = 3000;

const httpServer = require('http').Server(app);

(new WebSocket(httpServer)).createWSServer();

httpServer.listen(port, '0.0.0.0', () => console.log('Server running on: ' + port));




