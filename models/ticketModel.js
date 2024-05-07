import { Sequelize } from "sequelize";
import sequelize from "../database/db.js";

const Journey = sequelize.define(
  "Journey",
  {
    TicketID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    CustomerName: { type: Sequelize.STRING, allowNull: false },
    Contact: { type: Sequelize.STRING, allowNull: false },
    Email: { type: Sequelize.STRING, allowNull: false },
    JourneyDate: { type: Sequelize.DATEONLY, allowNull: false },
    JourneyTime: { type: Sequelize.TIME, allowNull: false },
    SourceCity: { type: Sequelize.STRING, allowNull: false },
    DestinationCity: { type: Sequelize.STRING, allowNull: false },
  },
  {
    tableName: "journey",
    timestamps: true,
  }
);

export default Journey;
