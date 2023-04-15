const { default: axios } = require("axios");

const checkAuthentication = async (req, res, next) => {
  try {
    const response = await axios.get(
      "https://pflightsauthservice.onrender.com/authservice/api/v1/isAuthenticated",
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
      message: "Invalid Token",
    });
  }
};

module.exports = {
  checkAuthentication,
};
