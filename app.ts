
import * as express from 'express';
import { WebSocket } from './src/WebSocket';
import * as app from 'express';

const port = 3000;

const http = require('http').Server(app);

(new WebSocket()).createWSServer(http);

http.listen(port, '0.0.0.0', () => console.log('Server running on: ' + port));





