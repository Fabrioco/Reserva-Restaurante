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
  if (role != "Administrador")
    return res
      .status(500)
      .json({ message: "Você não tem permissão para adicionar uma mesa" });
  try {
    const { numero, capacidade, status } = req.body;
    const numeroExists = await Table.findOne({ where: { numero } });
    if (numeroExists) {
      return res.status(401).json({ message: "Essa mesa já existe" });
    }
    if (!capacidade) {
      return res.status(401).json({ message: "A mesa precisa de quantidade" });
    }
    const table = await Table.create({
      numero,
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

routerTables.patch("/:id", middleware, async (req, res) => {
  try {
    const updates = req.body;
    const { id } = req.params;

    const table = await Table.findOne({ id: id });
    if (!table) {
      return res.status(404).json({ error: "Mesa não encontrada" });
    }

    Object.keys(updates).forEach((key) => {
      if (table[key] !== undefined) {
        table[key] = updates[key];
      }
    });

    await table.save();

    res.json(table);
  } catch (error) {
    res.json({ error: error.message });
  }
});

routerTables.delete("/:id", middleware, async (req, res) => {
  const { id } = req.params;
  const role = req.user.role;
  if (role != "Administrador") {
    return res
      .status(500)
      .json({ message: "Você não tem permissão para excluir a mesa!" });
  }
  try {
    const table = await Table.findOne({ id: id });
    if (!table) {
      return res.status(404).json({ error: "Mesa não encontrada" });
    }
    table
      .destroy()
      .then(() =>
        res.status(200).json({ message: "Mesa excluída com sucesso", table })
      );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = routerTables;
