import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import Group from "../models/group.model.js";
import cloudinary from "../lib/cloudinary.js";
import { get } from "mongoose";
import { getReceiverSocketId, io } from "../lib/socket.js";


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
                resource_type: "video", 
            });
            videoUrl = uploadResponse.secure_url;
        }

        // Handle audio upload
        if (audio) {
            const uploadResponse = await cloudinary.uploader.upload(audio, {
                folder: "chat-app/audio",
                resource_type: "video", 
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

    // Get all groups the user is a member of

     const groups = await Group.find({ members: myId })
      .populate('members', 'fullname username avatar profilePic') 
      .lean();


    // For each user, find the last message exchanged
    const userResults = await Promise.all(
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
          type: "user",
          user,
          lastMessage,
        };
      })
    );

    // For each group, find the last message
    const groupResults = await Promise.all(
      groups.map(async (group) => {
        const lastMessage = await Message.findOne({
          groupId: group._id,
        })
          .sort({ createdAt: -1 })
          .lean();

        return {
          type: "group",
          group,
          lastMessage,
        };
      })
    );

    // Combine and sort by last message time (most recent first)
    const combined = [...userResults, ...groupResults].sort((a, b) => {
      const aTime = a.lastMessage?.createdAt ? new Date(a.lastMessage.createdAt) : 0;
      const bTime = b.lastMessage?.createdAt ? new Date(b.lastMessage.createdAt) : 0;
      return bTime - aTime;
    });

    res.status(200).json(combined);
  } catch (error) {
    console.error("Error fetching last messages for sidebar:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const sendGroupMessage = async (req, res) => {
  try {
    const { text, image, video, audio } = req.body;
    const { groupId } = req.params;
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
            resource_type: "video", 
        });
        videoUrl = uploadResponse.secure_url;
    }

    // Handle audio upload
    if (audio) {
        const uploadResponse = await cloudinary.uploader.upload(audio, {
            folder: "chat-app/audio",
            resource_type: "video", 
        });
        audioUrl = uploadResponse.secure_url;
    }

    const newMessage = await Message.create({
      senderId,
      groupId,
      text,
      image: imageUrl,
      video: videoUrl,
      audio: audioUrl,
    });

    // Emit the new message to all group members in real time
    io.to(groupId).emit("new-message", newMessage);

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: "Failed to send group message." });
  }
};

export const getGroupMessages = async (req, res) => {
  try {
    const { groupId } = req.params;
    const messages = await Message.find({ groupId }).sort({ createdAt: 1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch group messages." });
  }
};
