const { handleLogin, getLoggedInUser } = require("../controllers/AuthController");
const AuthService = require("../services/authService");
const User = require("../Model/User");

jest.mock("../services/authService");
jest.mock("../Model/User");

describe("AuthController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("handleLogin retourne un token si succès", async () => {
    const req = { body: { email: "test@test.com", password: "password123" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    AuthService.logUser.mockResolvedValue("fakeToken");

    await handleLogin(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ token: "fakeToken" });
  });

  it("handleLogin retourne une erreur si AuthService échoue", async () => {
    const req = { body: { email: "test@test.com", password: "wrongpass" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    AuthService.logUser.mockRejectedValue(new Error("Authentication failed"));

    await handleLogin(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ "Error message": "Authentication failed" });
  });

  it("getLoggedInUser retourne les infos utilisateur", async () => {
    const req = { user: { id: "123" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    User.findById.mockResolvedValue({ _id: "123", email: "test@test.com" });

    await getLoggedInUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ id: "123", email: "test@test.com" });
  });
});
