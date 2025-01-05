import axios from "axios";
import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, emailid, age, phoneNumber, password } = req.body;
    if (!name || !emailid || !age || !phoneNumber || !password) {
      return res.status(400).json({ status: 'fail', message: "Enter all fields." });
    }

    const existingUser = await userModel.findOne({ $or: [{ emailid }, { phoneNumber }] });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const User = new userModel({
      name,
      emailid,
      age,
      phoneNumber,
      password: hashedPassword
    });
    await User.save();
    return res.status(201).json(User);
  } catch (error) {
    return res.status(500).json({ status: 'fail', message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { emailid, password } = req.body;
    if (!emailid || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const User = await userModel.findOne({ emailid });
    if (!User) {
      return res.status(400).json({ message: "Email ID is not registered." });
    }

    const isMatch = await bcrypt.compare(password, User.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password." });
    }

    const token = jwt.sign({ _id: User._id, role: User.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return res.status(200).json({ User, token });
  } catch (error) {
    return res.status(500).json({ status: 'fail', message: error.message });
  }
};

export const deleteBlog = async (req, res) => {
    try {
      const { id } = req.params; 
      const { _id: userId } = req.user;
  
      if (!id) {  
        return res.status(400).json({ message: "Blog ID is required." });
      }
  
      const response = await axios.delete(`http://blog-service:5000/api/deleteblogbyid/${id}`, {
        headers: { Authorization: `Bearer ${req.token}` },
      });
  
      return res.status(response.status).json(response.data);
    } catch (error) {
      return res.status(500).json({ status: 'fail', message: error.message });
    }
  };

export const getBlogs = async (req, res) => {
  try {
    const response = await axios.get('http://blog-service:5000/api/getallblogs', {
      headers: { Authorization: `Bearer ${req.token}` },
    });

    return res.status(200).json({ blogs: response.data });
  } catch (error) {
    return res.status(error.response?.status || 500).json({
      status: 'fail',
      message: error.response?.data?.message || error.message,
    });
  }
};

export const deleteAll = async (req, res) => {
  try {
    await axios.delete('http://blog-service:5000/api/blogs');
    return res.status(200).json({ message: "All blogs deleted successfully." });
  } catch (error) {
    return res.status(500).json({ status: 'fail', message: error.message });
  }
};



export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required." });
    }

    const response = await axios.put(`http://blog-service:5000/api/blogs/${id}`, { title, content }, {
      headers: { Authorization: `Bearer ${req.token}` }
    });

    if (response.status === 200) {
      return res.status(200).json(response.data);
    } else {
      return res.status(response.status).json(response.data);
    }
  } catch (error) {
    return res.status(500).json({ status: "fail", message: error.message });
  }
};