
const express = require('express');
const axios = require('axios');
const router = express.Router();
const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require('@google/generative-ai');


// Initialize the route
const route = express.Router();


// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Chat route
route.post('/api/chat', async (req, res) => {
    console.log('Received chat message:', req.body);
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        // Initialize the model
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        // Generate response
        const result = await model.generateContent(message);
        const response = await result.response;
        const text = response.text();

        res.json({ reply: text });
    } catch (error) {
        console.error('Error processing chat:', error);
        res.status(500).json({
            error: 'Failed to process chat message',
            details: error.message
        });
    }
});




module.exports = router;