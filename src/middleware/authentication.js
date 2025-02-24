const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();

const middleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Token não fornecido" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findOne({ where: { id: decoded.id } });
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: "Token Inválido" });
  }
};

module.exports = { middleware };
