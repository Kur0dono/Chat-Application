import express from 'express';
import { getMessages, sendMessage, getLastMessagesForSidebar, sendGroupMessage, getGroupMessages } from '../controllers/message.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();
console.log("Loaded message routes");

router.get("/:id", protectRoute, getMessages);
router.get("/sidebar/last-messages", protectRoute, getLastMessagesForSidebar);
router.post("/send/:id", protectRoute, sendMessage); 
router.post("/send-group/:groupId", protectRoute, sendGroupMessage);
router.get("/group/:groupId", protectRoute, getGroupMessages);

export default router;
