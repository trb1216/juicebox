require("dotenv").config();
const jwt = require("jsonwebtoken");
const PORT = 3000;
const express = require("express");
const apiRouter = require("./api");
const server = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const { client } = require("./db");
server.use(bodyParser.json());


server.use(morgan("dev"));
server.use("/api", apiRouter);
client.connect();


server.get('/background/:color', (req, res, next) => {
  res.send(`
    <body style="background: ${ req.params.color };">
      <h1>Hello World</h1>
    </body>
  `);
});

server.listen(PORT, () => {
  console.log("The server is up on port", PORT);
});
