const { DataTypes } = require('sequelize');

module.exports = user_model;

function user_model(sequelize) {
    const attributes = {
        name: { type: DataTypes.STRING, allowNull: false },
        venue_password: { type: DataTypes.STRING, allowNull: false },
        username: { type: DataTypes.STRING, allowNull: false },
        hash: { type: DataTypes.STRING, allowNull: false }
    };

    const options = {
        defaultScope: {
            // exclude hash 
            attributes: { exclude: ['hash'] }
        },
        scopes: {
            // include hash 
            withHash: { attributes: {}, }
        }
    };

    return sequelize.define('User', attributes, options);
}

