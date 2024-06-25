import * as Sequelize from "sequelize";
import { database } from "../config/database";
import { IPost } from "../types/post";

class Post extends Sequelize.Model<IPost> {
    id!: number;
    data!: string;
    userId!: string;
    createdAt!: Date;
    updatedAt!: Date;
}

Post.init(
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
        data: {
            type: Sequelize.STRING(1000),
            field: "name",
            allowNull: false,
        },
        userId: {
            type: Sequelize.INTEGER,
            references: {
                model: "user",
                key: "id",
            },
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
        modelName: "post",
        freezeTableName: true,
    }
);

// Add joins here

export default Post;
