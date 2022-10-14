import express from "express";
import { validate, User } from "../models/user.js";
import bcrypt from "bcrypt";

const routeUser = express.Router();

routeUser.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).send({ message: error });
    }
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res
        .status(409)
        .send({ message: "User with the given email already exists" });
    }
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    await new User({ ...req.body, password: hashPassword }).save();
    res.status(201).send({ message: "User is created successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
    //delete log
    console.log(error);
  }
});

export default routeUser;
