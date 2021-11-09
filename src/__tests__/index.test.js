import supertest from "supertest";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { app } from "../app.js";

dotenv.config();

const request = supertest(app);

describe("Testing the testing environment", () => {
  it("should test that true is true", () => {
    expect(true).toBe(true);
  });
});
//
describe("Testing the products endpoints", () => {
  beforeAll((done) => {
    mongoose.connect(process.env.MONGO_CONNECTION_TEST).then(() => {
      console.log("Connected to Mongo!");
      done();
    });
  });
  const validProduct = {
    name: "Test product",
    price: 10,
  };
  it("should test that with a valid product the POST /product endpoint is adding a new product", async () => {
    const response = await request.post("/products").send(validProduct);
    const respons2 = await request.post("/products").send(validProduct);
    expect(response.status).toBe(201);
  });
  it("When retrieving the /products/:id endpoint with a non existing id expect requests to be 404", async () => {
    const response = await request.get("/products/518a8715b0e660665c981723");
    expect(response.status).toBe(404);
  });
  it("When deleting the /products/:id endpoint: expect successful 204 response code", async () => {
    const response = await request.get("/products");
    const resDelete = await request.delete(`/products${response.body[0]._id}`);
    expect(resDelete.status).toBe(404);
  });
  it("When updating a /product/:id endpoint with new data: expect requests to be accepted.Expect the response.body.name to be changed Expect the typeof name in response.body to be “string", async () => {
    const response = await request.get("/products");
    const resDelete = await request.delete(`/products${response.body[0]._id}`);
    expect(resDelete.status).toBe(404);
  });
});
//
const updateProduct = {
  name: "Test",
  price: 13,
};
describe("When updating a /product/:id endpoint with new data:", () => {
  it("expect requests to be accepted", async () => {
    const response = await request.get("/products");
    const updateRes = await request
      .put(`/products/${response.body[0]._id}`)
      .send(updateProduct);
    expect(updateRes.status).toBe(201);
  });
  it("Expect the response.body.name to be changed", async () => {
    const response = await request.get("/products");
    const name = response.body[0].name;
    const updateRes = await request
      .put(`/products/${response.body[0]._id}`)
      .send({
        name: "NotTest",
        price: 13,
      });
    expect(updateRes.body.name).not.toBe(name);
  });
  it("Expect the typeof name in response.body to be “string", async () => {
    const response = await request.get("/products");
    expect(typeof response.body[0].name).toBe("string");
  });
});
//
afterAll((done) => {
  mongoose.connection
    .dropDatabase()
    .then(() => {
      return mongoose.connection.close();
    })
    .then(() => {
      console.log("Dropped database!");
      done();
    });
});
