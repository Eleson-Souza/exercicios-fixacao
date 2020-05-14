const express = require('express');
const router = express.Router();
const Writer = require('../Classes/Writer');
const Reader = require('../Classes/Reader');

router.get('/save-document', (req, res) => {
    res.render('save', {success: req.flash('success'), error: req.flash('error')});
});

const fileSave = new Writer();

router.post('/save-document', async (req, res) => {
    var text = req.body.text; // Texto que será salvo.
    var title = req.body.title; // Título do arquivo que será salvo.
    var path = req.body.path; // Caminho do arquivo onde será salvo.
    var filepath;
    
    // Caso seja passado o path(caminho) será salvo no diretório escolhido. Caso contrário será salvo em um diretório padrão!
    if(path) {
        filepath = `${path}/${title}.txt`;
    } else {
        filepath = `./public/arquives/${title}.txt`;
    }

    var status = await fileSave.WriteFile(filepath, text);

    if(status == true) {
        req.flash('success', `Arquivo salvo com sucesso como '${title}'!`);
    } else {
        req.flash('error', 'Ocorreu um erro ao salvar o arquivo, verique e tente novamente!');
    }
    
    res.redirect('/save-document');
});

router.get('/read-document', (req, res) => {
    res.render('read', {
        name: undefined, 
        path: undefined, 
        text: undefined, 
        error: req.flash('error')
    });
});


const fileRead = new Reader();

router.post('/read-document', async (req, res) => {
    var name = req.body.name;
    var path = req.body.path;
    var filepath = `${path}/${name}.txt`;

    var text = await fileRead.ReadFile(filepath);

    if(!text) {
        req.flash('error', 'Ops, arquivo não encontrado! :(');
    }
    res.render('read', {name, path, text, error: req.flash('error')});
});

module.exports = router;