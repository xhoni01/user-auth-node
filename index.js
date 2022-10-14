import dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();

import cors from "cors";
import routeUser from "./routes/users.js";
import route from "./routes/auth.js";

//database connection
import connection from "./db.js";
connection();

//midlewares
app.use(express.json());

//routes
app.use("/api/user", routeUser);
app.use("/api/authen", route);

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Listening on port ${port}`));
