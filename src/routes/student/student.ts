import express = require("express");

import Middleware from "../../utils/helper/middleware";
import { getStudents, registerStudent } from "../../controller/students";
import { GetStudentsValidator, PostStudentValidator } from "./validators";
import multer from "../../utils/helper/multer";

const StudentRouter = express.Router();

StudentRouter.get(
    "/students",
    GetStudentsValidator,
    Middleware.valiateUri,
    getStudents
);

StudentRouter.post(
    "/student",
    PostStudentValidator,
    multer.upload,
    Middleware.valiateUri,
    registerStudent
);

export default StudentRouter;
