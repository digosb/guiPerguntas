const express = require("express");
const app = express();
const bodyParser = require("body-parser");
//caregando conexão BD
const connection = require("./database/connection");
//criando tabela no banco de dados 
const tbperguntas = require("./database/tbperguntas");
const tbrespostas = require("./database/tbrespostas");
// Database

connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com sucesso");
    })
    .catch((msgError) => {
        console.log(msgError);
    });


app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    tbperguntas.findAll({
        raw: true,
        order: [
            ['id', 'DESC']
        ]
    }).then(tbperguntas => {
        res.render("../view/index", {
            tbperguntas: tbperguntas
        });
        console.log(tbperguntas);
    });

});

app.get("/perguntar", (req, res) => {
    res.render("../view/perguntar");
});

app.post("/salvarpergunta", (req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;

    tbperguntas.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/")
    });

});

app.get("/pergunta/:id", (req, res) => { // para pesquisar apenas um pergunta no BD
    var id = req.params.id;
    tbperguntas.findOne({ // procura id da pergunta no BD
        where: { id: id }
    }).then(tbperguntas => {
        if (tbperguntas != undefined) { // verifica se encontrou a pergunta
            tbrespostas.findAll({
                where: { perguntaId: tbperguntas.id },
                order: [
                    ['id', 'DESC']
                ]
            }).then(tbrespostas => {
                res.render("../view/pergunta", {
                    tbperguntas: tbperguntas,
                    tbrespostas: tbrespostas
                });
            });

        } else { // não  encontrou a pergunta
            res.redirect("/");
        }
    });
})

app.post("/responder", (req, res) => {
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;

    tbrespostas.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("./pergunta/" + perguntaId);
    });
});

app.listen(8080, () => {
    console.log("App Rodando!!");
});