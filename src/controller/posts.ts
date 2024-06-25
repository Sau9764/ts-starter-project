import { NextFunction, Request, Response } from "express";

import { logger } from "../utils/helper/logger";

export const createPost = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    try {
        logger.info("executing post controller -> createPost");

        return response.status(201).json({});
    } catch (error) {
        logger.error(error);
        logger.error("failed to execute controller -> createPost");

        next(error);
    }
};
