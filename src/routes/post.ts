import express = require("express");
import { createPost } from "../controller/posts";

const PostRoute = express.Router();

PostRoute.get("/user", createPost);

export default PostRoute;
