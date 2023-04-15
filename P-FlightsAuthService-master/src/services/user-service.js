const UserRepository = require("../repository/user-repository");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { JWT_KEY } = require("../config/serverConfig");

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async create(data) {
    try {
      const user = await this.userRepository.create(data);
      return user;
    } catch (error) {
      if (error.name == "SequelizeValidationError") {
        throw error;
      }
      console.log("Something went wrong in the service layer");
      throw error;
    }
  }

  async signIn(email, plainPassword) {
    try {
      //step 1- Fetch the user by email
      const user = await this.userRepository.getByEmail(email);
      if (user.isVerified === false) {
        console.log("Email is not Verified, Please Verify it first");
        throw { error: "Email not Verified" };
      }
      //step 2- Incoming Plane password with strong encrypted password
      const passwordMatch = this.checkPassword(plainPassword, user.password);
      if (!passwordMatch) {
        console.log(`Password doesn't match`);
        throw { error: "Incorrect Password" };
      }
      //step 3- If password match then create a token and send it to the user
      const newJWT = this.createToken({ email: user.email, id: user.id });
      return newJWT;
    } catch (error) {
      if (error.name == "AttributeNotFound") {
        throw error;
      }
      console.log("Something went wrong in the SignIn Process");
      throw error;
    }
  }

  async isAuthenticated(token) {
    try {
      const response = await jwt.verify(token, JWT_KEY);
      if (!response) {
        throw { error: "Invalid token" };
      }
      const user = await this.userRepository.getById(response.id);
      if (!user) {
        throw { error: "No user with the corresponding token exists" };
      }
      if (user.isVerified === false) {
        throw { error: "Email is not Verified" };
      }
      return response;
    } catch (error) {
      throw error;
    }
  }
  async validateEmail(token) {
    // Verifying the JWT token
    const response = jwt.verify(token, "ourSecretKey");
    if (!response) {
      throw {
        error:
          "Email verification failed, possibly the link is invalid or expired",
      };
    }
    const result = await this.userRepository.verifyEmail(response.email, {
      isVerified: 1,
    });
    return result;
  }

  createToken(user) {
    try {
      const result = jwt.sign(user, JWT_KEY, { expiresIn: "1d" });
      return result;
    } catch (error) {
      console.log("Something went wrong in token creation");
      throw error;
    }
  }

  verifyToken(token) {
    try {
      const response = jwt.verify(token, JWT_KEY);
      return response;
    } catch (error) {
      console.log("Something went wrong in token validation", error);
      throw error;
    }
  }

  checkPassword(userInputPlainPassword, encryptedPassword) {
    try {
      return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
    } catch (error) {
      console.log("Something went wrong in password comparison");
      throw error;
    }
  }

  async isAdmin(token) {
    try {
      const response = await jwt.verify(token, JWT_KEY);
      if (!response) {
        throw { error: "Invalid token" };
      }
      return this.userRepository.isAdmin(response.id);
    } catch (error) {
      console.log("Something went wrong in the service layer");
      throw error;
    }
  }
}

module.exports = UserService;
