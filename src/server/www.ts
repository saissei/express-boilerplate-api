#!/usr/bin/env node

/**
 * Module dependencies.
 */

import app from './App';
import Debug from 'debug';
import logger from '../logger/LoggerBase';
const debug: Debug.Debugger = Debug('express-debug');
import * as http from 'http';
import { AddressInfo } from 'net';

/**
 * Normalize a port into a number, string, or false.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizePort(val: any): any {
  const _port: number = parseInt(val, 10);

  if (isNaN(_port)) {
    // named pipe
    return val;
  }

  if (_port >= 0) {
    // port number
    return _port;
  }

  return false;
}

/**
 * Get port from environment and store in Express.
 */
// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
const port: number = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

const server: http.Server = http.createServer(app);

/**
 * Event listener for HTTP server "error" event.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function onError(error: any): any {
  if (error.syscall !== 'listen') {
    throw error;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const bind: any = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':{
      logger.systemError(`${bind} requires elevated privileges`);
      return process.exit(1);
    }
    case 'EADDRINUSE':{
      logger.systemError(`${bind} is already in use`);
      return process.exit(1);
    }
    default:{
      throw error;
    }
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening(): void {
  const addr: string | AddressInfo | null = server.address();
  const bind: string = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr}`;
  debug(`Listening on ${bind}`);
}

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
