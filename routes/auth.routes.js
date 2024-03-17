const jwt = require("jsonwebtoken");
const secretKey = "1315";
const bcrypt = require("bcrypt");
const UserModel = require("../model/model");
const { Router } = require("express");
const authRouter = Router();

authRouter.post("/signup", async (req, res) => {
    try {
      const myPlaintextPassword = req.body.password;
      const salt = await bcrypt.genSaltSync(10);
      const password = await bcrypt.hash(myPlaintextPassword, salt);
      const payload = {
        name: req.body.name,
        email: req.body.email,
        password,
      };
  
      await UserModel.create(payload)
        .then((user) => {
          return res.send({
            type: "success",
            message: "signup complated successfully",
          });
        })
        .catch((err) => {
          console.log("signup  err:", err);
          if (err.code === 11000) {
            return res.send({
              type: "error",
              message: "user already exist",
              error: err,
            });
          }
  
          return res.send({
            type: "error",
            message: "somthing went wrong while signup ",
            error: err,
          });
        });
    } catch (error) {
      return res.send({
        type: "error",
        message: "somthing went wrong while signup ",
        error: error,
      });
    }
  });
  
  authRouter.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email });
  
      if (!user) {
        return res.send({
          type: "error",
          message: "Invalid email or user not exist",
        });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.send({
          type: "error",
          message: "Invalid password",
        });
      }
  
      const payload = {
        name: user.name,
        email: user.email,
      };
      const token = jwt.sign(payload, secretKey);
  
      return res.send({
        type: "success",
        message: "Login successful",
        user: { name: user.name, email: user.email, userId: user._id, token },
      });
    } catch (error) {
      console.log("Login error:", error);
      return res.send({
        type: "error",
        message: "Something went wrong during login",
        error: error,
      });
    }
  });

  module.exports = authRouter;