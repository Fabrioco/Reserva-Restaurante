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

module.exports = routerTables;
