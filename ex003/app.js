const express = require('express');
const app = express();
const fileController = require('./controllers/fileController');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');

// Configurações
// Template engine - ejs
app.set('view engine', 'ejs');

// Sessão para o flash
app.use(session({
    secret: 'chavesecreta', cookie: {maxAge: 300000000},
    saveUninitialized: true,
    resave: true
}));

// Flash
app.use(flash());

// Pasta estática
app.use(express.static('./public'));

// body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Utilização de rotas externas
app.use('/', fileController);

const server = app.listen('2020', (err) => {
    if(err) {
        console.log(err);
    } else {
        console.log('Aplicação rodando na porta ' + server.address().port);
    }
});