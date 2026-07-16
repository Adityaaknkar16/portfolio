import express from 'express';
import { getGoals, toggleGoal } from '../controllers/goals.controller.js';

const router = express.Router();

router.get('/goals', getGoals);
router.put('/goals/:id/toggle', toggleGoal);

export default router;
