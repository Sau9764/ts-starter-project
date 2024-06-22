import { check } from "express-validator";

export const GetStudentsValidator = [
    check("page")
        .exists()
        .withMessage("page should be present")
        .isInt({ min: 1 })
        .withMessage("page should be integer and greater than 0"),
];
