import * as Sequelize from "sequelize";
import { database } from "../config/database";
import { IStudent } from "../types/student";

class Student extends Sequelize.Model<IStudent> {
    id!: number;
    name: any;
    email: any | null;
    createdAt!: Date | null;
    updatedAt!: Date | null;
}

Student.init(
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            validate: {
                isNumeric: true,
            },
        },
        name: {
            type: Sequelize.STRING,
            field: "name",
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            field: "email",
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
        modelName: "student",
        freezeTableName: true,
    }
);

// Add joins here

export default Student;
