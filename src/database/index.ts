import { DataSource, DataSourceOptions } from "typeorm";
import { Logger } from "../shared/logger/index";

const options = {
  type: process.env.DATABASE_TYPE,
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER_NAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
} as DataSourceOptions;

const dataSource = new DataSource(options);
dataSource
  .initialize()
  .then(() => {
    Logger.info("Database has connected!");
  })
  .catch((err) => {
    Logger.error("Error in database initialize : ", err);
  });
