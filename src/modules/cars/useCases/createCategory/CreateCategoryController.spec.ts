/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import { Connection } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { hash } from "bcrypt";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm/";
import request from "supertest";

let connection: Connection;

describe("Create Category Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuidv4();
    const password = await hash("admin", 8);

    await connection.query(`
      INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
      values('${id}', 'admin', 'admin@rentalx.com', '${password}', true, 'now()', 'XXXXXX')
    `);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("Should be able cerate a new category", async () => {
    const responseAuthentication = await request(app).post("/sessions").send({
      email: "admin@rentalx.com",
      password: "admin",
    });

    const { token } = responseAuthentication.body;

    const response = await request(app)
      .post("/categories")
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({ name: "new category", description: "A new category" });

    expect(response.status).toBe(201);
  });

  it("Should not be able cerate a new category with name exists", async () => {
    const responseAuthentication = await request(app).post("/sessions").send({
      email: "admin@rentalx.com",
      password: "admin",
    });

    const { token } = responseAuthentication.body;

    const response = await request(app)
      .post("/categories")
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({ name: "new category", description: "A new category" });

    expect(response.status).toBe(400);
  });
});
