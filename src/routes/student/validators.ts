import { check } from "express-validator";

export const GetStudentsValidator = [
    check("page")
        .exists()
        .withMessage("page should be present")
        .isInt({ min: 1 })
        .withMessage("page should be integer and greater than 0"),
    check("size")
        .exists()
        .withMessage("page should be present")
        .isInt({ min: 0, max: 1000 })
        .withMessage(
            "page should be integer, greater than 0 and less than 1000"
        ),
];

export const PostStudentValidator = [
    check("name")
        .exists()
        .withMessage("name should be present")
        .isLength({ min: 1, max: 100 }),
    check("email")
        .exists()
        .withMessage("email should be present")
        .isEmail()
        .isLength({ min: 3, max: 100 }),
    check("marksheet").isBase64(),
];
