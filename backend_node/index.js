
const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require('@google/generative-ai');
const express = require("express");
const cors = require("cors")
const mainroute = require('./route/index')
const cranespageroute = require('./route/cranespage')
// const chatroute = require('./route/chatroute')
// const videopage = require('./route/videopage')

const app = express();
app.use(cors())
app.use(express.json())

app.use('/', mainroute)
app.use('/CranesPage', cranespageroute);
// app.use('/videopage', videopage);
// app.use('/api/chat', chatroute);



const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Chat route
app.post('/api/chat', async (req, res) => {
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

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Something broke!',
        details: err.message
    });
});


app.listen(3000);