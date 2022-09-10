// import Model, DataTypes from sequelize
const { Model, DataTypes } = require('sequelize');
// import config/connection.js
const sequelize = require('../config/connection');

// Post initi id, title, content, user_id
Post.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1]
        }
    },
    conten: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1]
        }
    },
    user_id: {
        type: DataTypes.INTEGER,
        reference: {
            model: 'user',
            key: 'id'
        }
    }
},
    {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'post'
    }
);

// export module as Post
module.exports = Post;