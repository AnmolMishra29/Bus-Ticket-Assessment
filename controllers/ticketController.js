import Journey from "../models/ticketModel.js";

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
    //await Appointments.sync();
    const newTicket = await Journey.create({
      CustomerName: CustomerName,
      Contact: Contact,
      Email: Email,
      JourneyDate: JourneyDate,
      JourneyTime: JourneyTime,
      SourceCity: SourceCity,
      DestinationCity: DestinationCity,
    });
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
    const allTickets = await Journey.findAll();

    if (!allTickets) {
      return res
        .status(404)
        .json({ success: false, error: "tickets not found" });
    }

    res.status(200).json({ success: true, Tickets: allTickets });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Error fetching tickets ", error });
  }
};

export const getTicketbyID = async (req, res, next) => {
  const ticketId = req.params.id;

  try {
    const ticket = await Journey.findByPk(ticketId);

    if (!ticket) {
      return res
        .status(404)
        .json({ success: false, error: "ticket not found" });
    }
    res.status(200).json({ success: true, Ticket: ticket });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

export const updateTicket = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { JourneyDate, JourneyTime, SourceCity, DestinationCity } = req.body;

    const ticket = await Journey.findByPk(id);
    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    ticket.JourneyDate = JourneyDate;
    ticket.JourneyTime = JourneyTime;
    ticket.SourceCity = SourceCity;
    ticket.DestinationCity = DestinationCity;

    await ticket.save();
    res.status(200).json({ success: true, ticket });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteTicket = async (req, res, next) => {
  const ticketId = req.params.id;

  try {
    const ticket = await Journey.findByPk(ticketId);

    if (!ticket) {
      return res
        .status(404)
        .json({ success: false, error: "Ticket not found" });
    }

    await ticket.destroy();
    res
      .status(200)
      .json({ success: true, message: "Ticket deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
