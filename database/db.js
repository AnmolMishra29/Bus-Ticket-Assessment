import mysql from "mysql2";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize("bustickets", "root", "admin", {
  dialect: "mysql",
  host: "localhost",
});

export default sequelize;
