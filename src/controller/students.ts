import { NextFunction, Request, Response } from "express";

import { logger } from "../utils/helper/logger";
import studentService from "../service/student";

export const getStudents = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    try {
        logger.info("executing student controller -> getStudents");

        const data = await studentService.getStudents();

        return response.status(200).json(data);
    } catch (error) {
        logger.error(error);
        logger.error("failed to execute controller -> getStudents");

        next(error);
    }
};
