const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/produtos', (req, res) => {
    axios.get('http://localhost:1010/products').then((response) => {
        res.render('index', {products: response.data});
    });
});

router.get('/produtos/cadastrar', (req, res) => {
    res.render('cadastro');
});

router.post('/produtos/cadastrar', (req, res) => {
    var dados = req.body;
    axios.post('http://localhost:1010/products', dados).then((response) => {
        res.redirect('/produtos');
    }).catch(error => {
        res.send(error.message);
    });
});

router.post('/produtos/deletar', (req, res) => {
    var id = req.body.id;
    axios.delete(`http://localhost:1010/products/${id}`).then(() => {
        res.redirect('/produtos');
    }).catch(error => {
        res.send(error.message);
    });
});

router.get('/produtos/editar/:id', (req, res) => {
    var id = req.params.id;
    axios.get(`http://localhost:1010/products/${id}`).then((response) => {
        res.render('edicao', {product: response.data});
    });
});

router.post('/produtos/editar/:id', (req, res) => {
    var id = req.params.id;
    var dados = req.body;
    axios.put(`http://localhost:1010/products/${id}`, dados).then((resp) => {
        res.redirect('/produtos');
    }).catch(error => {
        res.send(error.message);
    });
});

module.exports = router;