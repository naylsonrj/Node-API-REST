const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


var DB = {
    games: [
        {
            id: 23,
            titulo: "GTA V",
            ano: 2013,
            preço: 60
        },
        {   
            id: 65,
            titulo: "Call of Duty MW",
            ano: 2019,
            preço: 257
        },
        {
            id: 2,
            titulo: "Counter Strike 1.6",
            ano: 2000,
            preço: 20
        }
    ]

}

// CRIANDO ROTA GET (trazer todos os dados de games)
app.get('/games', (req, res) => {
    res.statusCode = 200; // requisição feita com sucesso
    res.json(DB.games); //rota que retornam dados
});





// ENDEREÇO DA ROTA GAMES ->  http://localhost:3000/games
app.listen(3000, () => {
  console.log('API RODANDO na porta 3000');
});