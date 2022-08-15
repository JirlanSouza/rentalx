import { Connection, createConnection, getConnectionOptions } from "typeorm";

import { Logger } from "@shared/logger/index";

export default async (): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();
  const options = Object.assign(defaultOptions, {
    host: process.env.DATABASE_HOST,
    database:
      process.env.NODE_ENV === "test"
        ? "rentalx_test"
        : defaultOptions.database,
  });

  const connection = await createConnection(options).then((connection) => {
    Logger.info("Connection to database is started!");

    return connection;
  });

  return connection;
};
