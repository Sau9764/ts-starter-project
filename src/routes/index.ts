import express, { Request, Response } from "express";
import { check } from "express-validator";

import middleware from "../utils/helper/middleware";

import StudentRouter from "./student/student";

const TestingRoute = express.Router();

TestingRoute.get("/health", (req: Request, res: Response) => {
    return res.status(200).json({ message: "server health is fine." });
});

TestingRoute.get("/token", async (request: Request, response: Response) => {
    const token = await middleware.genrateToken({
        username: "test",
        email: "test@gmail.com",
    });

    response.status(200).send({
        token,
    });
});

const checkToken = [
    check("Authorization")
        .exists()
        .withMessage("Authorization token must be present")
        .not()
        .isEmpty()
        .withMessage("Authorization token should not be empty"),
];

TestingRoute.post(
    "/verify",
    checkToken,
    middleware.valiateUri,
    async (request: Request, response: Response) => {
        return response.send({
            message: "Request verifid",
        });
    }
);

export { TestingRoute, StudentRouter };
