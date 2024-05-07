import { Sequelize } from "sequelize";
import sequelize from "../database/db.js";

const Tickets = sequelize.define(
  "Tickets",
  {
    TicketID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    CustomerName: { type: Sequelize.STRING, allowNull: false },
    Contact: { type: Sequelize.STRING, allowNull: false },
    Email: { type: Sequelize.STRING, allowNull: false, unique: true },
    JourneyDate: { type: Sequelize.DATEONLY, allowNull: false },
    JourneyTime: { type: Sequelize.TIME, allowNull: false },
    SourceCity: { type: Sequelize.STRING, allowNull: false },
    DestinationCity: { type: Sequelize.STRING, allowNull: false },
  },
  {
    tableName: "tickets",
    timestamps: true,
  }
);

export default Tickets;
