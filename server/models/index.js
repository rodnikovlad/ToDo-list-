const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const List = sequelize.define('list', {
    id: {
        type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    }
});

const Task = sequelize.define('task', {
    id: {
        type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true
    },
    list_id: {
        type: DataTypes.INTEGER
    },
    name: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.BOOLEAN
    }
});

// List.hasMany(Task, {foreignKey: "id"});
Task.belongsTo(List, {foreignKey: "list_id"});

module.exports = {
    List,
    Task
};