import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";


export const signup = async (req, res) => {
    // Handle user signup logic here
    //res.send("signup route");
    const{fullname,email,password,phone} = req.body

    try {

        if (!fullname || !email || !password) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        // hash passwrod 
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }
        // check if user already exists
        const user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "Email already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create new user
        const newUser = new User({
            fullname,
            email,
            password: hashedPassword,
            phone,
            //profilePic: req.file ? req.file.path : "",
        });


        if (newUser) {
            //generate  jwt token here
            generateToken(newUser._id, res);
            await newUser.save();


            res.status(201).json({ 
                _id: newUser._id,
                fullname: newUser.fullname,
                email: newUser.email,
                profilePic: newUser.profilePic,
                phone: newUser.phone,
                bio: newUser.bio,
             });

        } else {
            return res.status(400).json({ message: "Invalid user data" });
        }

    }catch (error) {
        console.log("Error in signup controller", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const login = async (req, res) => {
    //res.send("login route");
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        // check if user exists
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        // check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid  credentials" });

        //generate  jwt token here
        generateToken(user._id, res);

        res.status(200).json({
            _id: user._id,
            email: user.email,
          //  password: user.password,
            fullname: user.fullname,
            profilePic: user.profilePic,
            phone: user.phone,
            bio: user.bio,

         });
    } catch (error) {
        console.log("Error in login controller", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const logout =  (req, res) => {
   // res.send("logout route");
    try {
        res.cookie("token", "", {
         // httpOnly: true,
            expires: new Date(0),
        });
        return res.status(200).json({ message: "Logged out successfully" });
    
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateProfile = async (req, res) => {
    console.log("Request body:", req.body);
    console.log("Authenticated user:", req.user);

    const { fullname, phone, bio, profilePic } = req.body;
    const userId = req.user._id; // Assuming you have the user ID from the token

    try {
        // Prepare the fields to update
        const updateFields = {};
        if (fullname) updateFields.fullname = fullname;
        if (phone) updateFields.phone = phone;
        if (bio) updateFields.bio = bio;

        // Handle profile picture upload if provided
        if (profilePic) {
            const uploadResponse = await cloudinary.uploader.upload(profilePic);
            updateFields.profilePic = uploadResponse.secure_url;
        }

        // Update the user in the database
        const updatedUser = await User.findByIdAndUpdate(userId, updateFields, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            _id: updatedUser._id,
            email: updatedUser.email,
            fullname: updatedUser.fullname,
            profilePic: updatedUser.profilePic,
            phone: updatedUser.phone,
            bio: updatedUser.bio,
        });
    } catch (error) {
        console.error("Error in updateProfile controller:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const checkAuth = (req, res) => {
    // Check if the user is authenticated
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checkAuth controller", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }

};
