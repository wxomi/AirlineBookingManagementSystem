const { default: axios } = require("axios");

const checkIsAdmin = async (req, res, next) => {
  try {
    const response = await axios.get(
      "http://localhost:3005/authservice/api/v1/isAdmin",
      {
        headers: {
          "x-access-token": req.headers["x-access-token"],
        },
      }
    );
    if (response.data.success) {
      next();
    } else {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "Something went wrong",
    });
  }
};

module.exports = {
  checkIsAdmin,
};
