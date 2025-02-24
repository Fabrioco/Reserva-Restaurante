const Express = require("express");
const { middleware } = require("../middleware/authentication");
const Table = require("../models/table");
const Reserve = require("../models/reserve");

const routerReserve = Express.Router();

routerReserve.post("/", middleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { tableName, quantityPeople, time } = req.body;
    const table = await Table.findOne({ where: { nome: tableName } });
    
    if (!table) {
      return res.status(404).json({ message: "Essa mesa não existe" });
    }

    if (table.capacidade < quantityPeople) {
      return res.status(500).json({
        message: "Infelizmente a mesa não atende a capacidade necessária!",
      });
    }

    const dataReservada = new Date(time);

    const reserve = await Reserve.create({
      usuario_id: userId,
      mesa_id: table.id,
      data_reserva: dataReservada,
      status: "Ativo",
    });
    res.json({ reserve });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = routerReserve;
