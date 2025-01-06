import express from 'express';
import router from "./routes/routeRoutes.js"
import dotenv from "dotenv";
import Blog from './models/blogModel.js';
import connectDb from './utils/db.js';
dotenv.config();
const app = express();
app.use(express.json());
connectDb();
app.use('/blogs', router);
//getall blogs
app.get("/api/getallblogs", async (req, res) => {
    try {
      const blogs = await Blog.find();
      return res.status(200).json(blogs);
    } catch (error) {
      return res.status(500).json({ status: "fail", message: error.message });
    }
  });
  

  // Delete a single blog by ID
  app.delete("/api/deleteblogbyid/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const blog = await Blog.findByIdAndDelete(id);
      if (!blog) {
        return res.status(404).json({ message: "Blog not found." });
      }
      return res.status(200).json({ message: "Blog deleted successfully." });
    } catch (error) {
      return res.status(500).json({ status: "fail", message: error.message });
    }
  });
  
  // Update an existing blog
  app.put("/api/blogs/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { title, content } = req.body;
  
      const updatedBlog = await Blog.findByIdAndUpdate(
        id,
        { title, content },
        { new: true }
      );
  
      if (!updatedBlog) {
        return res.status(404).json({ message: "Blog not found." });
      }
      return res.status(200).json(updatedBlog);
    } catch (error) {
      return res.status(500).json({ status: "fail", message: error.message });
    }
  });
  
  
  
  // Delete all blogs
  app.delete("/api/blogs", async (req, res) => {
    try {
      await Blog.deleteMany();
      return res.status(200).json({ message: "All blogs deleted successfully." });
    } catch (error) {
      return res.status(500).json({ status: "fail", message: error.message });
    }
  });
app.listen(process.env.PORTB, () => {
  console.log(`Blog Service running on port ${process.env.PORTB}`);
});