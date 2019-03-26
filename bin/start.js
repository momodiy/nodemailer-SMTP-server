#!/usr/bin/env node

/**
 * Module dependencies.
 */
let app = require('../app')
let debug = require('debug')('express-email-server:server')
let http = require('http')

/**
 * Normalize a port into a number, string, or false.
 */

const normalizePort = val => {
  let port = parseInt(val, 10)

  /* istanbul ignore if */
  if (isNaN(port)) return val // named pipe

  /* istanbul ignore if */
  if (port >= 0) return port // port number

  return false
}

/**
 * Event listener for HTTP server "error" event.
 */

const onError = error => {
  /* istanbul ignore if */
  if (error.syscall !== 'listen') throw error

  let bind = typeof port === 'string'
    /* istanbul ignore next */ ? 'Pipe ' + port
    /* istanbul ignore next */ : 'Port ' + port

  // handle specific listen errors with friendly messages
  /* eslint no-console: ["warn", { allow: ["error"] }] */
  /* istanbul ignore if */
  if (error.code === 'EACCES') {
    console.error(bind + ' requires elevated privileges')
    process.exit(1)
  } else if (error.code === 'EADDRINUSE') {
    console.error(bind + ' is already in use')
    process.exit(1)
  } else {
    throw error
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

const onListening = () => {
  let addr = server.address()
  let bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port
  debug('Listening on ' + bind)
}

/**
 * Get port from environment and store in Express.
 */

let port = normalizePort(process.env.PORT || '8888')
app.set('port', port)

/**
 * Create HTTP server.
 */

let server = http.createServer(app)

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port)
server.on('error', onError)
server.on('listening', onListening)
exports = module.exports = server
