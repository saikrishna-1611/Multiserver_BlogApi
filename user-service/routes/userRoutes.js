import express from "express";
import {
  register,
  login,
  deleteAll,
  deleteBlog,
  getBlogs,
  updateBlog,
  
} from "../controllers/userController.js";
import { authUser } from "../middleware/authUser.js";

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.delete('/deleteblogbyid/:id', authUser, deleteBlog);
router.get('/getallBlogs', authUser, getBlogs);
router.delete('/deleteall',authUser, deleteAll);
router.put('/updateblogbyid/:id',authUser,updateBlog);

export default router;