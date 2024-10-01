const request = require("supertest");
const app = require("../index"); // Import your Express app

describe("POST /register", () => {
  it("should register a new user", async () => {
    const response = await request(app).post("/register").send({
      name: "Test User 1",
      username: "testuser1",
      email: "testuser1@gmail.com",
      password: "testpassword1",
      phoneNumber: "08112233441",
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
      name: "Test User 2",
      username: "testuser2",
      email: "testuser2@gmail.com", // Same email to check conflict
      password: "testpassword2",
      phoneNumber: "08112233442",
      address: "123 Test St",
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("error", "Conflict");
  });
});
