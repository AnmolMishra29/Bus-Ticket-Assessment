import express from "express";
import ticketRouter from "./routers/ticketRouter.js";
import sequelize from "./database/db.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/ticket", ticketRouter);

try {
  sequelize.authenticate();
  console.log("Database connected Successfully");
} catch (error) {
  console.log("Error connecting with the database", error);
}

app.listen(8070, () => {
  console.log("Server is running on PORT 8070");
});
