import app from './app';
import https from 'https';
import fs from 'fs';
const privateKey = fs.readFileSync('./certificates/locahost-key.pem', 'utf8');
const certificateKey = fs.readFileSync('./certificates/locahost.pem', 'utf8');

const credentials = { key: privateKey, cert: certificateKey };
const server = https.createServer(credentials, app);
server.listen(3000);
