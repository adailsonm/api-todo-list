const User = require("../../models/User")
const UserService = require("../../service/UserService")
jest.mock("../../service/UserService", () => {
  return {
    findExists: jest.fn()
  }
});

describe('unit test service user', () => {
  it('findExists with not exists', async () => {
    UserService
    .findExists
    .mockResolvedValue(false);

    const result = await UserService.findExists('adailson.moreira16@gmail.com');
    expect(result).toBeFalsy()
  });

  it('findExists with exists', async () => {
    UserService
    .findExists
    .mockImplementation(() => {
      throw new Error('E-mail already exists');
    })

    try {
      const result = await UserService.findExists('adailso2n.moreira16@gmail.com');
      console.log(result)
    } catch(error) {
      expect(error.message).toBe('E-mail already exists');

    }

  })

})
