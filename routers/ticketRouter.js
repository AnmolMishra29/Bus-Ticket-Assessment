import express from "express";
import {
  createTicket,
  deleteTicket,
  getAllTickets,
  getTicketbyID,
  updateTicket,
} from "../controllers/ticketController.js";
import { ticketDataValidate } from "../middlewares/validation.js";

const router = express.Router();

router.post("/createticket", ticketDataValidate, createTicket);
router.get("/getalltickets", getAllTickets);
router.get("/getticketbyid/:id", getTicketbyID);

router.put("/updateticket/:id", updateTicket);
router.delete("/deleteticket/:id", deleteTicket);

export default router;
