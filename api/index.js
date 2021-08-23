const jwt = require("jsonwebtoken");
const { getUserById } = require("../db");
const express = require("express");
const postsRouter = require("./posts");
const usersRouter = require("./users");
const tagsRouter = require("./tags");
const apiRouter = express.Router();
const { JWT_SECRET } = process.env;

apiRouter.use("/users", usersRouter);

apiRouter.use("/posts", postsRouter);

apiRouter.use("/tags", tagsRouter);

apiRouter.use(async (req, res, next) => {
  const prefix = "Bearer ";
  const auth = req.header("Authorization");

  if (!auth) {
    // nothing to see here
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      const { id } = jwt.verify(token, JWT_SECRET);

      if (id) {
        req.user = await getUserById(id);
        next();
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  } else {
    next({
      name: "AuthorizationHeaderError",
      message: `Authorization token must start with ${prefix}`,
    });
  }
});

// apiRouter.use((error, req, res, next) => {
//   res.send(error);
// });
apiRouter.use((req, res, next) => {
  if (req.user) {
    console.log("User is set:", req.user);
  }

  next();
});

module.exports = apiRouter;
