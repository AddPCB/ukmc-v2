const serverless = require("serverless-http");
const express = require("express");
const cors = require("cors");
const { loginHandler } = require("./handler");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/io/login", loginHandler);

module.exports.handler = serverless(app);