const request = require('supertest');
const mongoose = require("mongoose");
const app = require('../../index');
const User = require('../../models/User');

beforeAll(async () => {
  await mongoose.connect('mongodb://db/testing', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
})

afterAll(async () => {
  await User.drop()
  console.log(mongoose.connection);
  await mongoose.connection.close()
})


describe('POST /users', function() {
  it('persist data', async () => {
    const data = {
      name: "gestrude do teste",
      email: "gestrude@teste.com",
      password: "1234"
    };
    const response = await request(app)
        .post('/api/v1/users')
        .send(data)
        .set('Accept', 'application/json')
        .expect(201, {
          status: 201,
          message: "User created sucessfully"
        })
  })
})
