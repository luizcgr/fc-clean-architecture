import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const response = await request(app).post("/product").send({
      name: "Banana",
      price: 123,
      type: "a",
    });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Banana");
    expect(response.body.price).toBe(123);
  });

  it("should not create a product", async () => {
    const response = await request(app).post("/product").send({
      price: 123,
      type: "a",
    });
    expect(response.status).toBe(500);
  });

  it("should list all product", async () => {
    const response1 = await request(app).post("/product").send({
      name: "Banana",
      price: 100,
      type: "a",
    });
    expect(response1.statusCode).toBe(200);
    const response2 = await request(app).post("/product").send({
      name: "Ice Cream",
      price: 200,
      type: "a",
    });
    expect(response2.statusCode).toBe(200);

    const listResponse = await request(app).get("/product").send();

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.products.length).toBe(2);
    const banana = listResponse.body.products[0];
    expect(banana.name).toBe("Banana");
    expect(banana.price).toBe(100);
    const iceCream = listResponse.body.products[1];
    expect(iceCream.name).toBe("Ice Cream");
    expect(iceCream.price).toBe(200);
  });
});
