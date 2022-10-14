import mongoose from "mongoose";

export default () => {
  const connection_parameters = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }; //End of params

  try {
    mongoose.connect(process.env.DB, connection_parameters);
    console.log("Database connected successfully");
  } catch (error) {
    //delete console.log
    console.log(error);
  } //End of catch
}; //End of module
