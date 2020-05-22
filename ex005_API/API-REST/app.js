const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Connection = require('./database/connection');
const Product = require('./models/Product');
const productController = require('./controllers/productController');

// Database
Connection
    .authenticate()
        .then(() => {
            console.log('Conectado ao banco com sucesso!');
        })
        .catch((error) => {
            console.log('Erro ao se conectar ao banco: ' + error);
        });

// Body-Parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/', productController);

app.get('/', (req, res) => {
    res.send('API OK!');
});

const server = app.listen(1010, () => {
    console.log(`API rodando na porta ${server.address().port}`);
});