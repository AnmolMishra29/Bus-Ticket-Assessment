import express from "express";
//import cors from "cors";
import ticketRouter from "./routers/ticketRouter.js";
import sequelize from "./database/db.js";

const app = express();
//dotenv.config({ path: "./config/config.env" });

// app.use(
//   cors({
//     origin: [process.env.FRONTEND_URL],
//     methods: ["GET", "POST", "DELETE", "PUT"],
//     credentials: true,
//   })
// );

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
