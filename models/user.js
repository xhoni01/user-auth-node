import mongoose from "mongoose";
import jsonwebtoken from "jsonwebtoken";
import joi from "joi";
import passwordcomplexity from "joi-password-complexity";
//creating user schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//Creating the function for generating authentication token
userSchema.methods.generateAuthToken = function () {
  const token = jsonwebtoken.sign(
    { _id: this._id },
    process.env.JWTPRIVATEKEY,
    { expiresIn: "7d" }
  );
  return token;
};

const User = mongoose.model("user", userSchema);
const validate = (data) => {
  const schema = joi.object({
    firstName: joi.string().required().label("First Name"),
    lastName: joi.string().required().label("Last Name"),
    email: joi.string().email().required().label("Email"),
    password: passwordcomplexity().required().label("Password"),
  });
  return schema.validate(data);
};

export { User, validate };
