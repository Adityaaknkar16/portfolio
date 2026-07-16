import express from 'express';
import { body } from 'express-validator';
import rateLimit from 'express-rate-limit';
import { submitContact } from '../controllers/contact.controller.js';

const router = express.Router();

// Basic rate limiting to prevent spam (max 5 requests per 15 minutes per IP)
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: 'Too many contact submissions from this IP. Please try again in 15 minutes.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post(
  '/contact',
  contactLimiter,
  [
    body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }).withMessage('Name too long'),
    body('email').trim().isEmail().withMessage('A valid email address is required'),
    body('message').trim().notEmpty().withMessage('Message content is required').isLength({ max: 2000 }).withMessage('Message too long'),
  ],
  submitContact
);

export default router;
