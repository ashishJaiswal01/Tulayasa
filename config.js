import dotenv from 'dotenv';
dotenv.config();

export const serverConfig = {
  port: process.env.SERVER_PORT || 3001
};
