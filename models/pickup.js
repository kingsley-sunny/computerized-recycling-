const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const User = require("./user");

const Pickup = sequelize.define("Pickup", {
  lga: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("failed", "pending", "success"),
    defaultValue: "pending",
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Pickup.User = Pickup.belongsTo(User, {  foreignKey: "user_id" });

module.exports = Pickup;
