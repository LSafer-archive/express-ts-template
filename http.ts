import http from 'http';
import dotenv from 'dotenv'
import debug from "debug";
import app from './src/app'

dotenv.config()

const PORT = process.env.PORT

app.set('port', PORT)

const server = http.createServer(app)

// Error
server.on('error', error => {
    // @ts-ignore
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof PORT === 'string'
        ? 'Pipe ' + PORT
        : 'Port ' + PORT;

    // handle specific listen errors with friendly messages
    // @ts-ignore
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
})
// Startup
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string'
        ? 'pipe ' + address
        : 'port ' + address?.port;
    debug('Listening on ' + bind);
});

server.listen(PORT)
