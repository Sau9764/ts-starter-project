import express = require("express");
import { createUser } from "../controller/user";

const UserRoute = express.Router();

UserRoute.post("/user", createUser);

export default UserRoute;
