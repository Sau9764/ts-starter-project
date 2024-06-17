import { Sequelize } from "sequelize";

import config from "./config";

class Database {
    public sequelize: Sequelize;

    constructor() {
        this.sequelize = new Sequelize(
            config.mysql.database,
            config.mysql.user,
            config.mysql.password,
            {
                host: config.mysql.host,
                dialect: config.mysql.dialect as any,
                logging: false,
                pool: {
                    max: 1024,
                    min: 0,
                },
            }
        );
    }

    public connect() {
        return this.sequelize
            .authenticate()
            .then(() => this.sequelize.sync({ force: false }));
    }
}

export const database = new Database();
