import express from 'express';
import { addCategories, getCategories } from '../services/categoryService.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const response = await addCategories();
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const categories = await getCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
