const { DataTypes } = require("sequelize");
const database = require("../config/database");

const Reserve = database.define("reservas", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  mesa_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  data_reserva: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Reserve.associate = (models) => {
  Reserve.belongsTo(models.User, { foreignKey: "usuario_id" });
  Reserve.belongsTo(models.Table, { foreignKey: "mesa_id" });
};

module.exports = Reserve;
