
const {DataTypes} = require("sequelize");

module.exports = venue_model;
function venue_model(sequelize) {
    const attributes = {
        venue: { type: DataTypes.STRING, allowNull: false },
        venue_password: { type: DataTypes.STRING, allowNull: false },
    };

    const options = {
        defaultScope: {
            // exclude hash by default
            attributes: { exclude: ['hash'] }
        },
        scopes: {
            // include hash with this scope
            withHash: { attributes: {}, }
        }
    };

    return sequelize.define('Venues', attributes, options);
}