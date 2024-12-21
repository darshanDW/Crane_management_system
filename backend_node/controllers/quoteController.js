const Quote = require('../models/Quote.js');
const Contract = require('../models/Contract.js');
// import { sendQuoteEmail } from '../utils/emailService.js';
const validateQuote = require('../utils/validation.js');


const createQuote = async (req, res) => {
  console.log("FF")
  try {


    const { craneType, capacity, rentalDuration, startDate, clientInfo, rent } = req.body;
    // const totalPrice = calculatePrice(craneType, capacity, rentalDuration, additionalServices);
    console.log("ADD")
    const quote = new Quote({
      craneType,
      capacity,
      rentalDuration,
      startDate,
      totalPrice:rent,
      clientInfo
    });
    console.log("ADD")
    const savedQuote = await quote.save();
    console.log("ADD")


    res.status(201).json(savedQuote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find().sort({ createdAt: -1 });

    res.json(quotes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getQuoteById = async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.id);
    if (!quote) {
      return res.status(404).json({ message: 'Quote not found' });
    }
    res.json(quote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = { getQuoteById, getQuotes, createQuote };