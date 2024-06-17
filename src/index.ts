import Application from "./app";
import { logger } from "./utils/helper/logger";

const server = Application.getInstance();
server.init();

process.on("uncaughtException", (error) => {
    logger.debug(`uncaughtException-------- ${error}`);
});

process.on("unhandledRejection", async (reason) => {
    logger.debug(`unhandledRejection------ ${reason}`);
});
