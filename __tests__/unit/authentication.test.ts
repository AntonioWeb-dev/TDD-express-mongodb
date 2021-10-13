import { AuthenticationService } from "../../src/service/AuthenticationService";
import argon from "argon2";


describe("#Test Authentication service", () => {
  const userServiceMock = {
    create: jest.fn(),
    show: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    index: jest.fn(),
    findByEmail: jest.fn(),
  };
  const authenticationService = new AuthenticationService(userServiceMock)

  test("#Should return a valid token", async () => {

    jest.spyOn(userServiceMock, "findByEmail")
      .mockResolvedValue({ _id: "61561b51ef29d3146c1a068b", email: "test", name: "test", password: "12345678" })
    jest.spyOn(argon, "verify")
      .mockResolvedValue(true)

    const token = await authenticationService.login("test@gmail.com", "12345678");
    expect(token).toBeTruthy()
  });

  test("#Should verify a jsonwebtoken", () => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNTYxYjUxZWYyOWQzMTQ2YzFhMDY4YiIsImVtYWlsIjoidGVzdCIsIm5hbWUiOiJ0ZXN0In0.0Ia5UylkoTVeMG7BpLU7Jm9EQAq6ME7nJiwr6FdW9fQ"
    const tokenVerifed = AuthenticationService.verifyToken(token);
    expect(tokenVerifed).toBe("61561b51ef29d3146c1a068b")

  });
})
