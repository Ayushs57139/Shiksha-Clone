import express from 'express';
import College from '../models/College.js';

const router = express.Router();

// Get all colleges
router.get('/', async (req, res) => {
  const colleges = await College.find();
  res.json(colleges);
});

// Add a new college
router.post('/', async (req, res) => {
  try {
    const college = new College(req.body);
    await college.save();
    res.status(201).json(college);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a college by ID
router.delete('/:id', async (req, res) => {
  try {
    await College.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "College deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
