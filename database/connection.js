// importando o sequelize para conectar com mysql 
const Sequelize = require('sequelize');
//conectando com banco de dados
const connection = new Sequelize('guia_pergunta', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql'
});

// exportando a conexão BD
module.exports = connection;