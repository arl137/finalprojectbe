const request = require("supertest");
const app = require("../index"); // Import your Express app

describe("POST /register", () => {
  it("should register a new user", async () => {
    const response = await request(app).post("/register").send({
      name: "Test User",
      username: "testuser",
      email: "testuser@gmail.com",
      password: "testpassword",
      phoneNumber: "0811223344",
      address: "123 Test St",
    });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty(
      "message",
      "Success creating new user",
    );
  });

  it("should return error if user already exists", async () => {
    const response = await request(app).post("/register").send({
      name: "Test User",
      username: "testuser",
      email: "testuser@gmail.com", // Same email to check conflict
      password: "testpassword",
      phoneNumber: "0811223344",
      address: "123 Test St",
    });

    expect(response.statusCode).toBe(409);
    expect(response.body).toHaveProperty("error", "Conflict");
  });
});
