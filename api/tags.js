const express = require("express");
const { getAllTags, getPostsByTagName } = require("../db");
const tagsRouter = express.Router();

tagsRouter.get("/", async (req, res) => {
  const tags = await getAllTags();

  res.send({
    tags,
  });
});
tagsRouter.get("/:tagName/posts", async (req, res, next) => {
  // read the tagname from the params function getPostsByTagName
  const { tagName } = req.params;
  
  // Cannot for the life of me figure out what data to grab from. "tagname". This at least does not break:

  try {
    const posts = await getPostsByTagName(tagName);
    if (posts) {
      res.send({ posts: posts });
    }
    // use our method to get posts by tag name from the db
    // send out an object to the client { posts: // the posts }
  } catch ({ name, message }) {
    next({ name, message }); // forward the name and message to the error handler
  }
});

module.exports = tagsRouter;
