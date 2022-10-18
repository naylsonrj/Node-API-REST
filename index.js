const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


var DB = {
    games: [
        {
            id: 23,
            titulo: "GTA V",
            ano: 2013,
            valor: 60
        },
        {   
            id: 65,
            titulo: "Call of Duty MW",
            ano: 2019,
            valor: 257
        },
        {
            id: 2,
            titulo: "Counter Strike 1.6",
            ano: 2000,
            valor: 20
        }
    ]

}

// CRIANDO ROTA GET (trazer todos os dados de games)
app.get('/games', (req, res) => {
    res.statusCode = 200; // requisição feita com sucesso
    res.json(DB.games); //rota que retornam dados
});

// CRIANDO ROTA GET (trazer um ID específico)
app.get('/games/:id', (req, res) => {
    if(isNaN(req.params.id)){ //verifica se o id é um número ou não
        res.sendStatus(400);         
    } else { //se for um número
        var id = parseInt(req.params.id); //converte o id para inteiro
        var game = DB.games.find(g => g.id == id); //verifica se o id existe no banco de dados

        if(game != undefined){ 
            res.statusCode = 200; // requisição feita com sucesso
            res.json(game);
        }else{
            res.sendStatus(404); //se não existir o id, retorna 404
        }
    }
});

app.post('/game', (req, res) => {
    var { titulo, valor, ano } = req.body;

    DB.games.push({
        id: 2323,
        titulo,
        valor,
        ano
    });

    res.sendStatus(200);
});

app.delete('/game/:id', (req, res) => {
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    } else {
        var id = parseInt(req.params.id);
        var index = DB.games.findIndex(g => g.id == id);

        if(index == -1){
            res.sendStatus(404);
        } else {
            DB.games.splice(index, 1);
            res.sendStatus(200);
        }
    }
});


app.put('/game/:id', (req, res) => {
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    } else {
        var id = parseInt(req.params.id);
        var game = DB.games.find(g => g.id == id);

        if(game != undefined){

            var { titulo, valor, ano } = req.body;

            if(titulo != undefined){
                game.titulo = titulo;
            }

            if(valor != undefined){
                game.valor = valor;
            }

            if(ano != undefined){
                game.ano = ano;
            }

            res.sendStatus(200);

        } else {
            res.sendStatus(404);
        }
    }
});





// ENDEREÇO DA ROTA GAMES ->  http://localhost:3000/games
app.listen(3000, () => {
  console.log('API RODANDO na porta 3000');
});