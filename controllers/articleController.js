const axios = require('axios').default;
const catchAsync = require('../utils/catchAsync');

const DATABASE = process.env.DATABASE_URL || 'https://jsherokunodedb-060f.restdb.io/rest';

const axiosConfig = {
    headers: {
        'x-apikey': '7a42a1bbb286d8bc8479ba2913acf83f1b4d8',
        'Content-Type': 'application/json'
    }
}

exports.getAllArticle = catchAsync(async (req, res) => {

    const response_articles = await axios.get(`${DATABASE}/article`, axiosConfig);

    res.json({
        status: 'success',
        data: {
            article: response_articles.data,
        },
    });

});


exports.getOneArticle = catchAsync(async (req, res) => {

    const id = req.params.id;

    const response_article = await axios.get(`${DATABASE}/article/${id}`, axiosConfig);

    if( !response_article ) {
        res.status(401).send('L\'article demandé n\'existe pas!');
    }

    res.status(200).json({
        status: 'success',
        data: {
            article: response_article.data,
        },
    });

});

exports.createArticle = catchAsync(async (req, res) => {

    if( !req.body.title ) {
        res.status(401).send('L\'article doit avoir un titre');
    }
    if( !req.body.content ) {
        res.status(401).send('Le contenu de l\'article ne peut pas être vide');
    }

    const url = `${DATABASE}/article`;

    const data = {
        title: req.body.title,
        content: req.body.content,
        author: req.user.data,
        publish_date: new Date()
    }

    const response = await axios.post(url, data, axiosConfig);

    res.status(200).json({
        status: 'success',
        message: 'Article créé',
    }).send();

});

exports.updateArticle = catchAsync(async (req, res) => {

    const user = req.user.data;
    const id = req.params.id;

    const response_article = await axios.get(`${DATABASE}/article/${id}`, axiosConfig);

    if( user[0]['_id'] !== response_article.data.author[0]['_id'] ) {
        res.status(401).send('Vous n\'êtes pas l\'auteur de cet article!');
    }

    const data = {};

    if( req.body.title ) {
        data.title = req.body.title;
    } else {
        data.title = response_article.title;
    }

    if( req.body.content ) {
        data.content = req.body.content;
    } else {
        data.content = response_article.content;
    }

    data.author = user;
    data.publish_date = response_article.data.publish_date;

    const response = await axios.patch(`${DATABASE}/article/${id}`, data, axiosConfig);

    res.json({
        status: 'success',
        message: 'article mis à jour',
    });

});

exports.deleteArticle = catchAsync(async (req, res) => {

    const user = req.user.data;
    const id = req.params.id;

    const response_article = await axios.get(`${DATABASE}/article/${id}`, axiosConfig);

    if( user[0]['_id'] !== response_article.data.author[0]['_id'] ) {
        res.status(401).send('Vous n\'êtes pas l\'auteur de cet article!');
    }

    const response = await axios.delete(`${DATABASE}/article/${id}`, axiosConfig);

    res.json({
        status: 'success',
        message: 'article supprimé',
    });
});
