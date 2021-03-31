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

    res.status(200).json({
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
        res.status(401).send('L\'utilisateur demandé n\'existe pas!');
    }

    delete response_user.data.password;

    res.status(200).json({
        status: 'success',
        data: {
            user: response_user.data,
        },
    });

});

exports.getCurrentUser = catchAsync(async (req, res, next) => {

    if( req.user.data ) {
        const user = req.user.data;
        delete user[0].password;
        res.status(200).json({
            status: 'success',
            data: {
                user: user[0],
            },
        });
        return;
    } else {
        res.status(401).json({
            status: "error",
            message: "Une erreur s\'est produite",
        }).send('');
        return;
    }

});

exports.createUser = catchAsync(async (req, res, next) => {

    if( !req.body.username ) {
        res.status(401).json({
            status: 'error',
            message: 'Le nom d\'utilisateur est requis',
          }).send();
          return;
    }
    if( !req.body.email ) {
        res.status(401).json({
            status: 'error',
            message: 'L\'utilisateur doit avoir un email',
        }).send();
        return;
    }
    if( !req.body.password ) {
        res.status(401).json({
            status: 'error',
            message: 'L\'utilisateur doit avoir un mot de passe',
        }).send();
        return;
    }

    let data = {
        username: req.body.username,
        email: req.body.email,
    }

    const salt = bcrypt.genSaltSync(process.env.SALT_ROUND);
    const hash = bcrypt.hashSync(req.body.password, salt) ;

    data.password = hash;

    const response = await axios.post(`${DATABASE}/myuser`, data, axiosConfig);

    console.log(response);

    response.then(console.log("success")).catch("echec");

    if( !response ) {
        res.status(401).json({
            status: 'error',
            message: 'Erreur dans l\'exécution de la requête',
        }).send();
        return;
    } else {
        res.status(200).json({
            status: 'success',
            message: 'utilisateur créé',
        }).send();
        return;
    }

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
        res.status(401).json({
            status: "success",
            message: "Erreur dans l\'exécution de la requête",
        }).send();
        return;
    } else {
        res.status(200).json({
            status: 'success',
            message: 'Utilisateur mis à jour',
        }).send();
        return;
    }

});

exports.deleteUser = catchAsync(async (req, res, next) => {

    const id = req.params.id;
    
    const response = await axios.delete(`${DATABASE}/myuser/${id}`, axiosConfig);

    res.status(200).json({
        status: 'success',
        message: 'utilisateur supprimé',
    }).send();
    return;

});
