const { DataTypes } = require("sequelize");

module.exports = {
    up: async (queryInterface, sequelize) => {
        try {
            await queryInterface.sequelize.transaction(async (t) => {
                await queryInterface.createTable(
                    "student",
                    {
                        id: {
                            type: DataTypes.INTEGER,
                            allowNull: false,
                            primaryKey: true,
                            autoIncrement: true,
                        },
                        name: {
                            type: DataTypes.STRING(50),
                            allowNull: false,
                        },
                        email: {
                            type: DataTypes.STRING(50),
                            allowNull: false,
                            unique: true,
                        },
                        created_at: {
                            type: DataTypes.DATE,
                            allowNull: false,
                        },
                        updated_at: {
                            type: DataTypes.DATE,
                            allowNull: false,
                        },
                    },
                    {
                        engine: "InnoDB",
                        charset: "utf8mb4",
                        collate: "utf8mb4_general_ci",
                        transaction: t,
                    }
                );
            });
        } catch (error) {
            console.error(error);
        }
    },

    down: async (queryInterface, sequelize) => {
        try {
            await queryInterface.sequelize.transaction(async (t) => {
                await queryInterface.dropTable("student", {
                    transaction: t,
                });
            });
        } catch (error) {
            console.error(error);
        }
    },
};
