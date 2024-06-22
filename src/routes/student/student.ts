import express = require("express");

import { getStudents } from "../../controller/students";
import Middleware from "../../utils/helper/middleware";
import { GetStudentsValidator } from "./validators";

const StudentRouter = express.Router();

StudentRouter.get(
    "/students",
    GetStudentsValidator,
    Middleware.valiateUri,
    getStudents
);

export default StudentRouter;
