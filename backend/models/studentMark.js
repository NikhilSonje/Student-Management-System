const { DataTypes } = require('sequelize');
const sequelize = require("../db/Mysql/connection");
const StudentEntryData = require('./studentEntry');

const studentMarksData = sequelize.define('studentMarksData', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    student_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        unique: true
    },
    math: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    science: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    gk: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    marathi: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    english: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    hindi: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    tableName: 'studentMarksData',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});


StudentEntryData.hasOne(studentMarksData, {
    foreignKey: 'student_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    as: 'marks'
});

studentMarksData.belongsTo(StudentEntryData, {
    foreignKey: 'student_id',
    as: 'student'
});

module.exports = studentMarksData;
