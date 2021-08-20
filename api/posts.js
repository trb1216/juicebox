
const { getAllPosts } = require("../db");
const express = require("express");
const postsRouter = express.Router();

postsRouter.get("/", async (req, res) => {
    const posts = await getAllPosts();
  
    res.send({
      posts
    });
  });




module.exports = postsRouter;
