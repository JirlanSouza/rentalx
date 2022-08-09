import { createConnection } from "typeorm";

import { Logger } from "@shared/logger/index";

createConnection().then(() => {
  Logger.info("Connection to database is started!");
});
