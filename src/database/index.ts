import mongoose from 'mongoose';

const { DB_URI } = process.env;
console.log(DB_URI)
mongoose.connect(`${DB_URI}`);

mongoose.connection.on('error', () => console.error('connection error'));
mongoose.connection.once('open', () => console.log('connected'));
