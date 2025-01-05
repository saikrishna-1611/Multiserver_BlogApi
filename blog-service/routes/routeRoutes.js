import express from 'express';
import { createBlog,getAllBlogs,getBlogById,updateBlog,likeBlog } from '../controllers/blogController.js';
const router = express.Router();
router.post('/', createBlog);
router.get('/', getAllBlogs);
router.get('/:id', getBlogById);
router.put('/:id',updateBlog);
router.post('/like/:_id',likeBlog);


export default router