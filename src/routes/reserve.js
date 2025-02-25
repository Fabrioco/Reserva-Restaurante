const Express = require("express");
const { middleware } = require("../middleware/authentication");
const Table = require("../models/table");
const Reserve = require("../models/reserve");

const routerReserve = Express.Router();

routerReserve.post("/", middleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { tableNumber, quantityPeople, time } = req.body;
    if (!tableNumber || !quantityPeople|| !time) {
      return res.status(401).json({message: 'Preencha todos os campos'})
    }
    const table = await Table.findOne({ where: { numero: tableNumber } });

    if (!table) {
      return res.status(404).json({ message: "Essa mesa não existe" });
    }

    if (table.status === "Reservada") {
      return res.status(400).json({ message: "Essa mesa já foi reservada" });
    } else if (table.status === "Inativa") {
      return res.status(400).json({ message: "Essa mesa está inativa" });
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
    if (reserve) {
      table.status = "Reservada";
      await table.save();
    }
    res.status(201).json(reserve);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

routerReserve.get("/", middleware, async (req, res) => {
  try {
    const reserves = await Reserve.findAll();
    const reservesFiltered = reserves.filter(
      (reserve) => reserve.usuario_id === req.user.id
    );
    res.status(200).json(reservesFiltered);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

routerReserve.delete("/:id/cancelar", middleware, async (req, res) => {
  const { id } = req.params;

  try {
    const reserve = await Reserve.findOne({ where: { id } });
  
    if (!reserve) {
      return res.status(404).json({ message: "Reserva não encontrada" });
    }
    const table = await Table.findOne({ where: { id: reserve.mesa_id } });
    if (table) {
      table.status = "Disponível";
      await table.save();
    
    }
    await reserve.destroy();

    res.status(200).json({ message: "Reserva cancelada" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = routerReserve;
