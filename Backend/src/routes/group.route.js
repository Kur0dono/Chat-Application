import express from "express";
import { createGroup, getGroups } from "../controllers/group.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { updateGroupAvatar } from "../controllers/group.controller.js";

const router = express.Router();

router.post("/", protectRoute, createGroup);
router.get("/", protectRoute, getGroups);
router.put("/:id/avatar", protectRoute, updateGroupAvatar);

export default router;