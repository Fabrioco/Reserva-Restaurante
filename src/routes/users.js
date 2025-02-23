const Express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const routerUser = Express.Router();

routerUser.post("/register", async (req, res) => {
  try {
    const { nome, email, senha, role } = req.body;
    const emailExists = await User.findOne({ where: { email } });

    if (emailExists) {
      return res.status(400).json({ error: "Email já cadastrado" });
    }

    const hashedPassword = await bcrypt.hash(senha, 10);
    const user = await User.create({
      nome,
      email,
      senha: hashedPassword,
      role,
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = routerUser;
