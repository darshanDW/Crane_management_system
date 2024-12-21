const express = require('express');
const { createQuote, getQuotes, getQuoteById } = require('../../controllers/quoteController.js');

const router = express.Router();

router.post('/', createQuote);
router.get('/', getQuotes);
router.get('/:id', getQuoteById);

module.exports= router;