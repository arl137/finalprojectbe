const request = require("supertest");
const app = require("../index");
const { sequelize, User } = require("../models");


let token;
let todos;

beforeAll(async () => {
  try {
    // create user & get token
    const user = await User.create({
      email: "test@mail.com",
      password: "rahasia",
    });

    token = user.generateToken();

    todos = await Todo.bulkCreate([
      { task: "Belajar nodejs", UserId: user.id },
      { task: "Belajar react", UserId: user.id },
    ]);
  } catch (error) {
    console.log(error);
  }
});

afterAll(async () => {
  await Todo.destroy({ truncate: true });
  await User.destroy({ truncate: true, cascade: true });
  await sequelize.close();
});