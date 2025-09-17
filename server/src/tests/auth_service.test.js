const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Model/User");
const { createUser, logUser } = require("../services/authService");

jest.mock("../Model/User");

describe("AuthService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createUser", () => {
    it("crée un nouvel utilisateur si email n'existe pas", async () => {
      User.findOne.mockResolvedValue(null);
      User.create.mockResolvedValue({ email: "test@test.com", password: "hashedPwd" });

      const result = await createUser("test@test.com", "password123");

      expect(User.findOne).toHaveBeenCalledWith({ email: "test@test.com" });
      expect(User.create).toHaveBeenCalled();
      expect(result.email).toBe("test@test.com");
    });

    it("lève une erreur si utilisateur existe déjà", async () => {
      User.findOne.mockResolvedValue({ email: "test@test.com" });

      await expect(createUser("test@test.com", "password123"))
        .rejects
        .toThrow("User already exists");
    });
  });

  describe("logUser", () => {
    it("retourne un token si email et mot de passe corrects", async () => {
      const fakeUser = { _id: "123", email: "test@test.com", password: "hashedPwd" };

      User.findOne.mockResolvedValue(fakeUser);
      jest.spyOn(bcrypt, "compare").mockResolvedValue(true);
      jest.spyOn(jwt, "sign").mockReturnValue("fakeToken");

      const token = await logUser("test@test.com", "password123");

      expect(User.findOne).toHaveBeenCalledWith({ email: "test@test.com" });
      expect(token).toBe("fakeToken");
    });

    it("lève une erreur si email n'existe pas", async () => {
      User.findOne.mockResolvedValue(null);

      await expect(logUser("wrong@test.com", "password123"))
        .rejects
        .toThrow("Authentication failed");
    });

    it("lève une erreur si mot de passe incorrect", async () => {
      User.findOne.mockResolvedValue({ email: "test@test.com", password: "hashedPwd" });
      jest.spyOn(bcrypt, "compare").mockResolvedValue(false);

      await expect(logUser("test@test.com", "wrongpass"))
        .rejects
        .toThrow("Password don't match");
    });
  });
});
