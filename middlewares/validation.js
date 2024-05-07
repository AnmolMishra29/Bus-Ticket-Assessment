import { body, validationResult } from "express-validator";

export const ticketDataValidate = [
  body("CustomerName")
    .notEmpty()
    .withMessage("Customer Name is required")
    .isLength({ min: 2, max: 30 })
    .withMessage("Name must be between 2 to 30 characters long"),

  body("Contact")
    .notEmpty()
    .withMessage("Contact Number is required")
    .isMobilePhone("any", { strictMode: false })
    .withMessage("Invalid contact number format"),

  body("Email").trim().isEmail().withMessage("Email is required"),

  body("JourneyDate")
    .notEmpty()
    .withMessage("Date is required")
    .custom((value) => {
      if (new Date(value) < new Date()) {
        throw new Error("Invalid Date");
      }
      return true;
    }),

  body("JourneyTime").notEmpty().withMessage("Time is required"),

  body("SourceCity")
    .notEmpty()
    .withMessage("Source City is required")
    .isLength({ min: 2, max: 30 })
    .withMessage("City Name must be between 2 to 30 characters long"),

  body("DestinationCity")
    .notEmpty()
    .withMessage("Destination City is required")
    .isLength({ min: 2, max: 30 })
    .withMessage("City Name must be between 2 to 30 characters long"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
