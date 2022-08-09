import { createConnection, getConnectionOptions } from "typeorm";

import { Logger } from "@shared/logger/index";

export default async (): Promise<void> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, { host: process.env.DATABASE_HOST })
  ).then(() => {
    Logger.info("Connection to database is started!");
  });
};
