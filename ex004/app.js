const express = require('express');
const app = express();
const axios = require('axios');

app.get('/:cep', (req, res) => {
    var cep = req.params.cep;
    axios.get(`http://viacep.com.br/ws/${cep}/json/`).then((response) => {
        if(response.data.erro) {
            res.send('Cep não localizado!');            
        } else {
            res.json(response.data);
        }
    });
});

app.listen(2020, () => {
    console.log('Aplicação rodando!');
});