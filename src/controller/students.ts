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

        const page = Number(request.query.page) || 1;
        const size = Number(request.query.size) || 10;

        const data = await studentService.getStudents(page, size);

        response.status(200).json(data);
    } catch (error) {
        logger.error(error);
        logger.error("failed to execute controller -> getStudents");

        next(error);
    }
};
