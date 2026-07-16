import { validationResult } from 'express-validator';
import Guestbook from '../models/Guestbook.js';

export const getGuestbookMessages = async (req, res) => {
  try {
    const messages = await Guestbook.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: messages });
  } catch (error) {
    console.error('Fetch guestbook messages error: ', error);
    return res.status(500).json({ success: false, message: 'Failed to retrieve guestbook messages.' });
  }
};

export const postGuestbookMessage = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { name, message } = req.body;

  try {
    const entry = new Guestbook({ name, message });
    await entry.save();
    return res.status(201).json({ success: true, data: entry });
  } catch (error) {
    console.error('Post guestbook message error: ', error);
    return res.status(500).json({ success: false, message: 'Failed to post message to guestbook.' });
  }
};
