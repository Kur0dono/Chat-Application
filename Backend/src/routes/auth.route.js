import express from 'express';
import {checkAuth, login, logout, signup, updateProfile } from '../controllers/auth.controller.js'; // Add updateProfile
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.put("/update-profile", protectRoute, updateProfile);

router.get("/check", protectRoute, checkAuth); // Check authentication status

export default router;