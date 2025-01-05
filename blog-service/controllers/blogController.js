import Blog from '../models/blogModel.js';

export const createBlog = async (req, res) => {
  try {
    const blog = new Blog(req.body);
    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().limit(10).skip((req.query.page - 1) * 10);
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const likeBlog=async(req,res)=>{
  try{
   const{_id}=req.params;
   if(!_id)
   {
      return res.status(400).json({message:"enter blog id to like in query url"});
   }
   const blog=await Blog.findById(_id);
   if(!blog){
      return res.status(400).json({message:"Blog doesn't exist for the given Id"});
   }
   blog.likes+=1;
   await blog.save();
   return res.status(200).json({blog});
  }
  catch(error){
      return res.status(500).json({status:'fail',message:error.message})
  }
};