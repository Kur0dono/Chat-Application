import express from 'express';
import { getMessages, sendMessage, getLastMessagesForSidebar } from '../controllers/message.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get("/:id", protectRoute, getMessages);
router.get("/sidebar/last-messages", protectRoute, getLastMessagesForSidebar);
router.post("/send/:id", protectRoute, sendMessage); 

export default router;