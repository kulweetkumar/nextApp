const mongoose = require("mongoose");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const { fileURLToPath } = require("url");
const next = require("next");

const DB = process.env.DATABASE;
const server = express();
const app = next({
  dev: true,
  path: `${path.resolve()}/.next`,
});
const handle = app.getRequestHandler();

server.enable("trust proxy");
server.set("view engine", "ejs");
server.set("views", path.join(__dirname, "views"));
server.use(cors());
server.use(fileUpload());
server.options("*", cors());
server.use("/public", express.static(path.join(__dirname, "public")));
server.use(express.static(path.join(__dirname, "public")));
server.use(cookieParser());
server.use(bodyParser.text({ type: "text/html" }));
server.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

server.get("*", (req, res) => {
  return handle(req, res);
});

mongoose
  .connect(DB)
  .then(async () => {
    console.log("Database connected successfully");
    const port = process.env.PORT || 3000;
    server.listen(port, () => {
      console.log(`Server started successfully on http://localhost:${port}`);
    });
    await app.prepare();
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
