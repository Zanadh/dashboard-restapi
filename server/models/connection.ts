import { Sequelize } from "sequelize-typescript";
import { User } from "./user.model"; 
import dbConfig from "../config/db.config";

const connection = new Sequelize({
  dialect: 'mysql',
  host: dbConfig.HOST,
  username: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  logging: false,
  models: [User],
});

export default connection;