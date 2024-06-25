import * as Sequelize from "sequelize";
import { database } from "../config/database";
import { IUser } from "../types/user";

class User extends Sequelize.Model<IUser> {
    id!: number;
    username!: string;
    email!: string;
    passowrd!: string;
    createdAt!: Date;
    updatedAt!: Date;
}

User.init(
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        username: {
            type: Sequelize.STRING,
            field: "username",
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            field: "email",
            allowNull: false,
        },
        password: {
            type: Sequelize.STRING,
            field: "password",
            allowNull: false,
        },
        createdAt: {
            type: Sequelize.DATE,
            field: "created_at",
            allowNull: false,
        },
        updatedAt: {
            type: Sequelize.DATE,
            field: "updated_at",
            allowNull: false,
        },
    },
    {
        sequelize: database.sequelize,
        modelName: "user",
        freezeTableName: true,
    }
);

// Add joins here

export default User;
