import express from 'express';
import { getProjects, getSkills } from '../controllers/data.controller.js';

const router = express.Router();

router.get('/projects', getProjects);
router.get('/skills', getSkills);

export default router;
