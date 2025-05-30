import express from 'express';

const router = express.Router();
import { register, login, logout } from '../controllers/authController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

router.post('/signup', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', authMiddleware, (req, res) => {
  res.json({ user: req.user });
});


export default router;
