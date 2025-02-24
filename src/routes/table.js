const Express = require("express");
const Table = require("../models/table");
const { middleware } = require("../middleware/authentication");

const routerTables = Express.Router();

routerTables.get("/", middleware, async (req, res) => {
  try {
    const tables = await Table.findAll();
    return res.status(500).json({ tables });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

routerTables.post("/", middleware, async (req, res) => {
  const role = req.user.role;
  if (role != "administrador")
    return res
      .status(500)
      .json({ message: "Você não tem permissão para adicionar uma mesa" });
  try {
    const { nome, capacidade, status } = req.body;
    const nomeExists = await Table.findOne({ where: { nome } });
    if (nomeExists) {
      return res.status(401).json({ message: "Essa mesa já existe" });
    }
    if (!capacidade) {
      return res.status(401).json({ message: "A mesa precisa de quantidade" });
    }
    const table = await Table.create({
      nome,
      capacidade,
      status: "Disponível",
    });
    return res.status(200).json({
      message: "Mesa criada com sucesso",
      table,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = routerTables;
