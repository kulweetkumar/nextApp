const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const next = require("next");
const server = express();
const app = next({
  dev: true,
  path: `${path.resolve()}/.next`,
});
const apiRoute = require("./src/app/backend/route/api");
const connectDB = require('./src/app/backend/config/db')
connectDB(app) // db connection 
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
server.use("/api",apiRoute); // apis route  file const withSass = require('@zeit/next-sass');

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server started successfully on http://localhost:${port}`);
}); 
server.get("*", (req, res) => {
  return handle(req, res);
});