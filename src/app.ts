import express from "express";
import { config } from "dotenv";
import { createServer } from "http";

import { logger } from "./utils/helper/logger";
import middleware from "./utils/helper/middleware";
import { StudentRouter, TestingRoute } from "./routes";

config();

class Application {
    private static instance: Application;
    private app: express.Express;

    private readonly PORT = process.env.PORT || 3000;
    private readonly NODE_ENV: string = process.env.NODE_ENV || "development";

    private constructor() {
        this.app = express();
    }

    public static getInstance() {
        if (!Application.instance) {
            Application.instance = new Application();
        }

        return Application.instance;
    }

    public getPort() {
        return this.PORT;
    }

    public getNodeEnv() {
        return this.NODE_ENV;
    }

    private initlizeMiddleware() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    private responseMiddleware() {
        try {
            logger.info("executing Application -> responseMiddleware");
            this.app.use(middleware.errorHandlerMiddleware);
        } catch (error) {
            logger.error("failed to execute Application -> responseMiddleware");
            throw error;
        }
    }

    private async initRoute() {
        try {
            logger.info("executing Application -> initRoute");

            const defaultParam = ""; // use /api, /api/v1

            this.app.use(defaultParam, TestingRoute);
            this.app.use(defaultParam, StudentRouter);
        } catch (error) {
            logger.error("failed to execute Application -> initRoute");

            throw error;
        }
    }

    public init() {
        this.initlizeMiddleware();
        this.initRoute();
        this.responseMiddleware();

        const http = createServer(this.app);

        http.listen(this.PORT, () => {
            const message = `|| App is running at port ${this.PORT} in ${this.NODE_ENV} mode ||`;

            logger.info(message);
        });
    }
}

export default Application;
