const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Retorna todos os produtos
router.get('/products', (req, res) => {
    Product.findAll().then(products => {
        res.json(products);
        res.statusCode = 200;
    });
});

// Retorna um produto pelo id
router.get('/products/:id', (req, res) => {
    var id = req.params.id;
    if(isNaN(id)) {
        res.sendStatus(400);
    } else {
        Product.findByPk(id).then(product => {
            if(product) {
                res.json(product);
            } else {
                res.sendStatus(404);
            }
        });
    }
});

// Cria um novo produto
router.post('/products', (req, res) => {
    var {name, category, amount, price} = req.body;
    var totalPrice = (parseInt(amount) * parseFloat(price)).toFixed(2);

    if(name == '' || amount == '' || price == '' || totalPrice == '') {
        res.sendStatus(400);
    } else {
        var data = new Date();
        Product.create({
            name, 
            category, 
            amount, 
            price, 
            totalPrice, 
            createdAt: data.toLocaleString(), 
            updatedAt: data.toLocaleString()
        }).then(() => {
            res.sendStatus(200);
        }).catch(() => {
            res.sendStatus(500);
        });
    }
});

// Edita um produto
router.put('/products/:id', (req, res) => {
    var id = req.params.id;
    if(isNaN(id)) {
        res.sendStatus(400);
    } else {
        Product.findOne({
            where: {id: id}
        }).then(product => {
            if(product) {
                var {name, category, amount, price} = req.body;
                var totalPrice = product.totalPrice;
                
                // Se qualquer variável estiver vazia, irá adotar o valor do campo do banco.
                if(name == '') {
                    name = product.name;
                }
                if(category == '') {
                    category = product.category;
                }
                if(amount == '') {
                    amount = product.amount;
                }
                if(price == '') {
                    price = product.price;
                }

                // se o amount ou o price forem alterados, o total terá de ser recalculado.
                if(amount || price) {
                    totalPrice = (parseInt(amount) * parseFloat(price)).toFixed(2);
                }

                Product.update({
                    name,
                    category,
                    amount,
                    price,
                    totalPrice,
                    updatedAt: new Date().toLocaleString()
                }, {
                    where: {
                        id: product.id
                    }
                }).then(() => {
                    res.sendStatus(200);
                }).catch((error) => {
                    console.log('Ocorreu um erro ao atualizar: ' + error);
                    res.sendStatus(500);
                });
            } else {
                res.sendStatus(404);
            }
        }); 
    }
});

// Exclui um produto
router.delete('/products/:id', (req, res) => {
    var id = req.params.id;
    if(isNaN(id)) {
        res.sendStatus(400);
    } else {
        Product.findByPk(id).then(product => {
            if(product) {
                Product.destroy({
                    where: {id: product.id}
                }).then(() => {
                    res.sendStatus(200);
                }).catch((error) => {
                    console.log('Erro ao excluir: ' + error);
                    res.sendStatus(500);
                })
            } else {
                res.sendStatus(404);
            }
        })
    }
});

module.exports = router;