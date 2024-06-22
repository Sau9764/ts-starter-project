import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

import { IAuthorizedUserDetails } from "../../types/middleware";
import { logger } from "./logger";

class Middleware {
    private static instance: Middleware;

    private constructor() {}

    public static getInstance() {
        if (!Middleware.instance) {
            Middleware.instance = new Middleware();
        }

        return Middleware.instance;
    }

    public async genrateToken(user: IAuthorizedUserDetails) {
        try {
            logger.info("executing Middleware -> genrateToken");

            if (!process.env.SECRET) {
                throw new Error("JWT secret not added");
            }

            const token = jwt.sign(user, process.env.SECRET, {
                expiresIn: "15 minutes",
            });

            return token;
        } catch (error) {}
    }

    public async valiateUri(
        request: Request,
        response: Response,
        next: NextFunction
    ) {
        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        try {
            logger.info("executing Middleware -> valiateUri");

            if (process.env.IS_AUTH === "true") {
                logger.info("executing Middleware -> valiateUri -> Auth");
                try {
                    const auth = request.header("Authorization");
                    const token = auth?.split(" ")[1] || ""; // Token is always present

                    if (!process.env.SECRET) {
                        throw new Error("JWT secret not added");
                    }

                    const payload = await jwt.verify(token, process.env.SECRET);

                    if (!payload) {
                        return response
                            .status(401)
                            .json({ message: "Unauthorized access" });
                    }
                } catch (error) {
                    logger.error(
                        "failed to execute Middleware -> valiateUri -> auth"
                    );
                    return response
                        .status(401)
                        .json({ message: "Unauthorized" });
                }
            }

            // Doing nothing here.

            next();
        } catch (error) {
            logger.error("failed to execute Middleware -> valiateUri");

            next(error);
        }
    }

    public async errorHandlerMiddleware(
        err: Error,
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        if (err) {
            logger.info("Error stack -> " + JSON.stringify(err));
            return res.status(500).json({ error: "Internal server error" });
        }
        next();
    }
}

export default Middleware.getInstance();
