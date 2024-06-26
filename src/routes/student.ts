import express = require("express");

import { getStudents } from "../controller/students";
import Middleware from "../utils/helper/middleware";

const StudentRouter = express.Router();

StudentRouter.get("/students", Middleware.valiateUri, getStudents);

export default StudentRouter;
