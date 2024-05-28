// lib/db.ts
import mongoose from 'mongoose';

let isConnected = false; // Track the connection

export const dbConnect = async (): Promise<void> => {
  mongoose.set('strictQuery', true);

  if (isConnected) {
    console.log('Database is already connected.');
    return;
  }

  if (!process.env.MONGO_URI) {
    throw new Error('Please define the MONGO_URI environment variable inside .env.local');
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: 'omegle_clone',
    });

    isConnected = true;
    console.log('MongoDB connected successfully.');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    throw new Error('Database connection failed');
  }
};
