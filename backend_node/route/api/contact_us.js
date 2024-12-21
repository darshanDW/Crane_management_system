const express = require('express');
const router = express.Router();
const Contact_us = require('../../models/Contact_us');

router.post('/', async (req, res) => {
    const { name, email, message } = req.body;
    try {
        const newContact_us = new Contact_us({
            name, email, message,status:'open'
        });
        const contact_us = await newContact_us.save();
        res.json(contact_us);
    } catch (error) {
        console.error('Error processing contact us:', error);
        res.status(500).json({
            error: 'Failed to process contact us message',
            details: error.message
        });
    }
});

// Example API Route in Node.js/Express
router.get('/getAllQueries', async (req, res) => {
    try {
        console.log(1)
        const queries = await Contact_us.find(); // Replace with your database query
        res.status(200).json(queries);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch queries' });
    }
});


router.patch('/queries/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
console.log(req.body)
        if (!['open', 'resolved'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }

        const updatedQuery = await Contact_us.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!updatedQuery) {
            return res.status(404).json({ error: 'Query not found' });
        }

        res.status(200).json(updatedQuery);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update query' });
    }
});



module.exports = router;
