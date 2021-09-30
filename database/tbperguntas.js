// criando tabela de perguntas no banco de dados.
// importando o sequelize e a conexão com BD
const Sequelize = require('sequelize');
const connection = require("./connection");

//criando a tabela      
const tbperguntas = connection.define('pergunta', {
    //nome da coluna: {aqui dentro é as atribuições tipo, chave primaria etc...}
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },

    descricao: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

// sincroniza com banco de dados e não força uma nova criação caso já esteja criado.
tbperguntas.sync({ force: false }).then(() => {});

module.exports = tbperguntas;