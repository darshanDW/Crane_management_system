
const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require('@google/generative-ai');
const express = require("express");
const cors = require("cors")
const mainroute = require('./route/index')
const cranespageroute = require('./route/cranespage')
const dotenv = require('dotenv')
// const chatroute = require('./route/chatroute')

// dw changes
const Crane = require('./models/Crane');
const Maintenance = require('./models/Maintenance');
const Booking = require('./models/Booking');
const quoteRoutes = require('./route/api/quotes');
const contractRoutes = require('./route/api/contracts');

const app = express();
app.use(cors())
app.use(express.json())
dotenv.config()

app.use('/', mainroute)
app.use('/CranesPage', cranespageroute);
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











// dw changes

app.use('/api/quotes', quoteRoutes);
app.use('/api/contracts', contractRoutes);


app.post('/api/cranes', async (req, res) => {
    try {
        console.log(req.body)
        const crane = new Crane(req.body);
        await crane.save();
        res.status(201).json(crane);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update crane
app.put('/api/cranes/:id', async (req, res) => {
    try {
        const crane = await Crane.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(crane);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete crane
app.delete('/api/cranes/:id', async (req, res) => {
    try {
        const crane = await Crane.findById(req.params.id);
        if (!crane) {
            return res.status(404).json({ message: 'Crane not found' });
        }
        console.log(crane.imagePublicId);
        console.log(crane.documentPublicId);
        if (crane.imagePublicId) {
            await cloudinary.uploader.destroy(crane.imagePublicId, { resource_type: 'image' });
        }
        if (crane.documentPublicId) {
            await cloudinary.uploader.destroy(crane.documentPublicId, { resource_type: 'raw' });
        }

        await Crane.findByIdAndDelete(req.params.id);

        res.json({ message: 'Crane and its resources deleted successfully' });
    } catch (error) {
        console.error('Error deleting crane or its resources:', error);
        res.status(500).json({ message: error.message });
    }
});
app.get('/api/cranes', async (req, res) => {
    try {
        const cranes = await Crane.find();
        console.log(cranes)
        res.json(cranes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create maintenance record
app.post('/api/maintenance', async (req, res) => {
    try {
        console.log(req.body)
        const maintenance = new Maintenance(req.body);
        await maintenance.save();

        // Update crane's last maintenance date
        await Crane.findByIdAndUpdate(req.body.craneId, {
            lastMaintenance: req.body.date,
            status: 'maintenance'
        });

        res.status(201).json(maintenance);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.get('/api/maintenance/:craneId', async (req, res) => {
    try {

        const maintenance = await Maintenance.find({ craneId: req.params.craneId });
        res.json(maintenance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


app.post('/api/bookings', async (req, res) => {
    try {
        console.log(req.body)
        const booking = new Booking(req.body);
        await booking.save();
        res.status(201).json(booking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// app.use('/api/maintenance', require('./routes/maintenance'));

const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});



app.listen(3000);
console.log('Server started on http://localhost:3000');
