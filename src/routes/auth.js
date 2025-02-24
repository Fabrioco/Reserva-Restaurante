const Express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const routerAuth = Express.Router();
const jwt = require("jsonwebtoken");

routerAuth.post("/register", async (req, res) => {
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

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: 300,
    });
    res.status(201).json({ message: "Registro feito com sucesso", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

routerAuth.post("/login", async (req, res) => {
  try {
    const { email, senha, role } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "Email não encontrado" });
    }
    const passwordVerify = await bcrypt.compare(senha, user.senha);
    if (!passwordVerify) {
      return res.status(400).json({ error: "Senha incorreta" });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: 300,
    });

    return res.status(200).json({ message: "Login feito com sucesso", token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = routerAuth;
