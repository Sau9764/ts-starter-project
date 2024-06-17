import { config } from "dotenv";

config();

const configuration = {
    mysql: {
        host: process.env.MYSQL_HOST || "localhost",
        user: process.env.MYSQL_USER || "root",
        password: process.env.MYSQL_PASSWORD || "password",
        database: process.env.MYSQL_DB || "test",
        port: process.env.MYSQL_PORT || 3306,
        dialect: process.env.DIALECT || "mysql",
    },
};

export default Object.freeze(configuration);
