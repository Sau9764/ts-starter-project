import { NextFunction, Request, Response } from "express";
import User from "../models/user";
import { IUser } from "../types/user";
import userService from "../service/user";

import { logger } from "../utils/helper/logger";

export const createUser = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    try {
        logger.info("executing post controller -> createuser");

        const username = request.body.username;
        const email = request.body.email;
        const password = request.body.password;

        const user: IUser = {
            username,
            email,
            password,
        };

        const newUser = await userService.createUser(user);

        return response.status(201).json(newUser);
    } catch (error) {
        logger.error(error);
        logger.error("failed to execute controller -> createuser");

        next(error);
    }
};
