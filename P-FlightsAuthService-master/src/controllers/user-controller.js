const UserService = require("../services/user-service");

const userService = new UserService();

const create = async (req, res) => {
  try {
    const response = await userService.create({
      email: req.body.email,
      password: req.body.password,
      isVerified: 0,
    });
    return res.status(201).json({
      success: true,
      message: "Successfully created a new user",
      data: response,
      err: {},
    });
  } catch (error) {
    return res.status(error.statusCode).json({
      message: error.message,
      data: error.data,
      success: false,
      err: error.explaination,
    });
  }
};

const signIn = async (req, res) => {
  try {
    const response = await userService.signIn(
      req.body.email,
      req.body.password
    );
    return res.status(200).json({
      success: true,
      data: response,
      err: {},
      message: "Successfully Signed in",
    });
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode).json({
      message: error.message,
      data: {},
      success: false,
      err: error.explaination,
    });
  }
};

const isAuthenticated = async (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    const response = await userService.isAuthenticated(token);
    return res.status(200).json({
      success: true,
      err: {},
      data: response,
      message: "User is authenticated and token is valid",
    });
  } catch (error) {
    return res.status(401).json({
      message: "Unauthenticated Token",
      data: {},
      success: false,
      err: error,
    });
  }
};

const validateEmail = async (req, res) => {
  try {
    const response = await userService.validateEmail(req.params.token);
    return res.status(200).json({
      message: "Email verified successfully",
      success: true,
      err: {},
      data: response,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
      data: {},
      success: false,
      err: error,
    });
  }
};

const isAdmin = async (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    const response = await userService.isAdmin(token);
    return res.status(200).json({
      message: "Successfully fetched wheather user is admin or not",
      success: true,
      err: {},
      data: response,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
      data: {},
      success: false,
      err: error,
    });
  }
};

module.exports = {
  create,
  signIn,
  isAuthenticated,
  validateEmail,
  isAdmin,
};
