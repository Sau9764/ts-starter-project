import { NextFunction, Request, Response } from "express";
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

    public async valiateUri(
        request: Request,
        response: Response,
        next: NextFunction
    ) {
        try {
            logger.info("executing Middleware -> valiateUri");

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
