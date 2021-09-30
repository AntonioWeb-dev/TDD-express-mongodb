import App from './app';
import https from 'https';
import http from 'http';
import fs from 'fs';
const privateKey = fs.readFileSync('./certificates/locahost-key.pem', 'utf8');
const certificateKey = fs.readFileSync('./certificates/locahost.pem', 'utf8');

// WARNING Should be https
const credentials = { key: privateKey, cert: certificateKey };
const server = http.createServer(App.app);
App.webSockets(server)

server.listen(3000);
