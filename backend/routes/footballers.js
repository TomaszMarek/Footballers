const express = require('express');
const router = express.Router();
const Footballer = require('../models/Footballer');

router.get('/', async (req, res) => {
    try {
        const footballers = await Footballer.find();
        res.json(footballers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/add', async (req, res) => {
    const { Surname, Age, Position, Club, Goals, Assists, Height, createdBy } = req.body;
    const newFootballer = new Footballer({ Surname, Age, Position, Club, Goals, Assists, Height, createdBy });

    try {
        await newFootballer.save();
        res.status(201).json(newFootballer);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const footballer = await Footballer.findById(req.params.id);
        if (footballer.createdBy !== req.body.createdBy) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        const updatedFootballer = await Footballer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedFootballer);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const footballer = await Footballer.findById(req.params.id);
        if (footballer.createdBy !== req.body.createdBy) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        await Footballer.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Footballer deleted successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
