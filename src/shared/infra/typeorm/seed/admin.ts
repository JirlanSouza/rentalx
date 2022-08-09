import { getConnection } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { hash } from "bcrypt";

import { Logger } from "@shared/logger";
import createConnection from "..";

export async function create(): Promise<void> {
  await createConnection();
  const connection = getConnection();

  const id = uuidv4();
  const password = await hash("admin", 8);

  await connection.query(
    `INSERT INTO USERS(id, name, email, password, "isAdmin", driver_license, created_at)
      values('${id}', 'admin', 'admin@rentalx.com', '${password}', ${true}, 'XXXXXX', 'now()')
    `
  );

  await connection.close();
}

create().then(() => Logger.info("User admin created"));
