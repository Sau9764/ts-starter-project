import express, { Request, Response } from "express";

import StudentRouter from "./student";

const TestingRoute = express.Router();

TestingRoute.get("/health", (req: Request, res: Response) => {
    return res.status(200).json({ message: "server health is fine." });
});

export { TestingRoute, StudentRouter };
