import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import connection from './models/connection'
import dbConfig from './config/db.config';
import mysql from 'mysql2/promise'
import router from './routes';
import cors from 'cors'

dotenv.config();

const app: Express = express();
const port = process.env.PORT;


app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(router)

const start = async (): Promise<void> => {
  try {
    await mysql.createConnection({
      user: dbConfig.USER,
      password: dbConfig.PASSWORD
    }).then((connection) => connection.query(`CREATE DATABASE IF NOT EXISTS ${dbConfig.DB};`))

    await connection.sync();
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();

