import logger from "../utils/logger.js";
import Tickets from "../models/ticketModel.js";

export const createTicket = async (req, res, next) => {
  const {
    CustomerName,
    Contact,
    Email,
    JourneyDate,
    JourneyTime,
    SourceCity,
    DestinationCity,
  } = req.body;

  try {
    const newTicket = await Tickets.create({
      CustomerName: CustomerName,
      Contact: Contact,
      Email: Email,
      JourneyDate: JourneyDate,
      JourneyTime: JourneyTime,
      SourceCity: SourceCity,
      DestinationCity: DestinationCity,
    });
    logger.info("Ticket created successfully :", newTicket);
    res.status(200).json({
      success: true,
      message: "Ticket created successfully",
      newTicket,
    });
  } catch (error) {
    logger.error("Error in creating ticket :", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

export const getAllTickets = async (req, res, next) => {
  try {
    const allTickets = await Tickets.findAll();

    if (!allTickets) {
      logger.info("No Tickets found ");
      return res
        .status(404)
        .json({ success: false, error: "tickets not found" });
    }
    logger.info("All Tickets:", allTickets);
    res.status(200).json({ success: true, Tickets: allTickets });
  } catch (error) {
    logger.error("Error in fetching ticket :", error);
    res
      .status(500)
      .json({ success: false, error: "Error fetching tickets ", error });
  }
};

export const getTicketbyID = async (req, res, next) => {
  const ticketId = req.params.id;

  try {
    const ticket = await Tickets.findByPk(ticketId);

    if (!ticket) {
      logger.info("No Tickets found ");
      return res
        .status(404)
        .json({ success: false, error: "ticket not found" });
    }
    logger.info("Tickets by ID :", ticket);
    res.status(200).json({ success: true, Ticket: ticket });
  } catch (error) {
    logger.error("Error in fetching ticket :", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

export const updateTicket = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { JourneyDate, JourneyTime, SourceCity, DestinationCity } = req.body;

    const ticket = await Tickets.findByPk(id);
    if (!ticket) {
      logger.info("No Tickets found ");
      return res.status(404).json({ error: "Ticket not found" });
    }

    ticket.JourneyDate = JourneyDate;
    ticket.JourneyTime = JourneyTime;
    ticket.SourceCity = SourceCity;
    ticket.DestinationCity = DestinationCity;

    await ticket.save();
    logger.info("Ticket updated Successfully :", ticket);
    res.status(200).json({ success: true, ticket });
  } catch (error) {
    logger.error("Error in updating ticket :", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteTicket = async (req, res, next) => {
  const ticketId = req.params.id;

  try {
    const ticket = await Tickets.findByPk(ticketId);

    if (!ticket) {
      logger.info("No Tickets found ");
      return res
        .status(404)
        .json({ success: false, error: "Ticket not found" });
    }

    await ticket.destroy();
    logger.info("Ticket deleted successfully:", ticket);
    res
      .status(200)
      .json({ success: true, message: "Ticket deleted successfully" });
  } catch (error) {
    logger.error("Error in deleting ticket :", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
