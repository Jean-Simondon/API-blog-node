const catchAsync = require('../utils/catchAsync');
const axios = require('axios').default;
const bcrypt = require('bcrypt');

const DATABASE = process.env.DATABASE_URL || 'https://jsherokunodedb-060f.restdb.io/rest';

const axiosConfig = {
    headers: {
        'x-apikey': '7a42a1bbb286d8bc8479ba2913acf83f1b4d8',
        'Content-Type': 'application/json'
    }
}

exports.getAllUsers = catchAsync(async (req, res, next) => {

    const response_users = await axios.get(`${DATABASE}/myuser`, axiosConfig);

    response_users.data.forEach(element => {
        delete element.password;
    });

    res.json({
        status: 'success',
        data: {
            users: response_users.data,
        },
    });

});

exports.getOneUser = catchAsync(async (req, res, next) => {

    const id = req.params.id;

    const response_user = await axios.get(`${DATABASE}/myuser/${id}`, axiosConfig);

    if( !response_user ) {
        res.send('L\'utilisateur demandé n\'existe pas!');
    }

    delete response_user.data.password;

    res.json({
        status: 'success',
        data: {
            user: response_user.data,
        },
    });

});


exports.createUser = catchAsync(async (req, res, next) => {

    if( !req.body.username ) {
        res.send('L\'utilisateur doit avoir un nom');
    }
    if( !req.body.email ) {
        res.send('L\'utilisateur doit avoir un email');
    }
    if( !req.body.password ) {
        res.send('L\'utilisateur doit avoir un mot de passe');
    }

    let data = {
        username: req.body.username,
        email: req.body.email,
    }

    const salt = bcrypt.genSaltSync(process.env.SALT_ROUND);
    const hash = bcrypt.hashSync(req.body.password, salt) ;

    data.password = hash;

   const response = await axios.post(`${DATABASE}/myuser`, data, axiosConfig);

    res.json({
        status: 'success',
        message: 'utilisateur créé',
    });

});


exports.updateUser = catchAsync(async (req, res, next) => {

    const id = req.params.id;

    let data = {};

    if( req.body.username ) {
        data.username = req.body.username;
    } else {
        data.username = req.user.data.username;
    }

    if( req.body.email ) {
        data.email = req.body.email;
    } else {
        data.email = req.user.data.email;
    }

    const response = await axios.patch(`${DATABASE}/myuser/${id}`, data, axiosConfig);

    if( !response ) {
        res.send('Erreur dans l\'exécution de la requête');
    }

    res.json({
        status: 'success',
        message: 'utilisateur mis à jour',
    });

});

exports.deleteUser = catchAsync(async (req, res, next) => {

    const id = req.params.id;
    
    const response = await axios.delete(`${DATABASE}/myuser/${id}`, axiosConfig);

    res.json({
        status: 'success',
        message: 'utilisateur supprimé',
    });

});
