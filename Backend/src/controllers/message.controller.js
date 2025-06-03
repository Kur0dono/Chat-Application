import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import { get } from "mongoose";
import { getReceiverSocketId, io } from "../lib/socket.js";

/*
export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({_id:{$ne:loggedInUserId}}).select("-password");
   
        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error("Error fetching users for sidebar:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
*/

export const getMessages = async (req, res) => {
    try {
      const { id:userToChatId } = req.params
      const myId = req.user._id;

      const messages = await Message.find({
        $or: [
          { senderId:myId, receiverId:userToChatId },
          { senderId:userToChatId, receiverId:myId },
        ],
      })
      res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages controller", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const sendMessage = async (req, res) => {
    try {
        const { text, image, video, audio } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let imageUrl, videoUrl, audioUrl;

        // Handle image upload
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image, {
                folder: "chat-app/images",
            });
            imageUrl = uploadResponse.secure_url;
        }

        // Handle video upload
        if (video) {
            const uploadResponse = await cloudinary.uploader.upload(video, {
                folder: "chat-app/videos",
                resource_type: "video", // Cloudinary treats videos as "video"
            });
            videoUrl = uploadResponse.secure_url;
        }

        // Handle audio upload
        if (audio) {
            const uploadResponse = await cloudinary.uploader.upload(audio, {
                folder: "chat-app/audio",
                resource_type: "video", // Cloudinary treats audio as "video"
            });
            audioUrl = uploadResponse.secure_url;
        }

        // Create a new message
        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
            video: videoUrl,
            audio: audioUrl,
        });

        await newMessage.save();

        // TODO: Add real-time functionality with socket.io here
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage controller", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const getLastMessagesForSidebar = async (req, res) => {
  try {
    const myId = req.user._id;

    // Get all users except the logged-in user
    const users = await User.find({ _id: { $ne: myId } }).select("-password");

    // For each user, find the last message exchanged
    const results = await Promise.all(
      users.map(async (user) => {
        const lastMessage = await Message.findOne({
          $or: [
            { senderId: myId, receiverId: user._id },
            { senderId: user._id, receiverId: myId },
          ],
        })
          .sort({ createdAt: -1 })
          .lean();

        return {
          user,
          lastMessage,
        };
      })
    );

    res.status(200).json(results);
  } catch (error) {
    console.error("Error fetching last messages for sidebar:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
