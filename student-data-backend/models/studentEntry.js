const { DataTypes } = require('sequelize');
const sequelize = require("../db/Mysql/connection");

const StudentEntryData = sequelize.define('studentEntryData',
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        first_name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        mobile_no: {
            type: DataTypes.STRING(13),
            allowNull: true
        },
        city: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        email_id: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        dob: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
    },
    {
        tableName: 'studentEntryData',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
);

module.exports = StudentEntryData;