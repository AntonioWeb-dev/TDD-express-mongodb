import mongoose from 'mongoose';

const { DB_URI } = process.env;
mongoose.connect(`${DB_URI}`);
