import Group from "../models/group.model.js";

export const createGroup = async (req, res) => {
  try {
    const { name, members, avatar } = req.body;
    const createdBy = req.user._id;

    if (!name || !members || members.length < 2) {
      return res.status(400).json({ message: "Group name and at least 2 members required." });
    }

     const existingGroup = await Group.findOne({ name });
    if (existingGroup) {
        return res.status(400).json({ message: "A group with this name already exists. Please choose a different name." });
    }

    const uniqueMembers = [...new Set([...members, createdBy.toString()])]; 

    const group = new Group({
      name,
      members: uniqueMembers, 
      avatar,
      createdBy,
    });

    await group.save();
    res.status(201).json(group);
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(400).json({ message: `The ${field} '${error.keyValue[field]}' already exists. Please use a different one.` });
    }
    console.error("Failed to create group:", error); 
    res.status(500).json({ message: "Failed to create group due to an internal server error." });
  }
};

export const getGroups = async (req, res) => {
  try {
    const userId = req.user._id;
    const groups = await Group.find({ members: userId })
                                .populate('members', 'fullname username avatar profilePic') 
                                .lean();
    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch groups." });
  }
};

export const updateGroupAvatar = async (req, res) => {
  const { avatar } = req.body;
  await Group.findByIdAndUpdate(req.params.id, { avatar });
  res.json({ success: true });
};