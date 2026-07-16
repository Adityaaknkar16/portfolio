import express from 'express';
import { body } from 'express-validator';
import rateLimit from 'express-rate-limit';
import { getGuestbookMessages, postGuestbookMessage } from '../controllers/guestbook.controller.js';

const router = express.Router();

// Rate limiting for guestbook: max 10 messages per 15 minutes per IP
const guestbookLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    message: 'Too many messages posted. Please wait a bit before signing the guestbook again.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

router.get('/guestbook', getGuestbookMessages);
router.post(
  '/guestbook',
  guestbookLimiter,
  [
    body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 50 }).withMessage('Name must be under 50 characters'),
    body('message').trim().notEmpty().withMessage('Message is required').isLength({ max: 500 }).withMessage('Message must be under 500 characters'),
  ],
  postGuestbookMessage
);

export default router;
