const express = require('express');
const app = express();
const ejs = require('ejs');
const productController = require('./controllers/productController');
const bodyParser = require('body-parser');

// EJS
app.set('view engine', 'ejs');

// Pasta estática
app.use(express.static('./public'));

// body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/', productController);

app.get('/', (req, res) => {
    res.render('index');
});

const server = app.listen('5050', () => {
    console.log('Apicação rodando na porta ' + server.address().port);
});