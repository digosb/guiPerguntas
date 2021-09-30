const Sequelize = require('sequelize');
const connection = require("./connection");

const tbrespostas = connection.define("resposta", {
    corpo: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    perguntaId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

tbrespostas.sync({ force: false });
module.exports = tbrespostas;