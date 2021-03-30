// MODULE
const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken')
const axios = require('axios').default;
const bcrypt = require('bcrypt');


const catchAsync = require('../utils/catchAsync');

const DATABASE = process.env.DATABASE_URL || 'https://jsherokunodedb-060f.restdb.io/rest';

const axiosConfig = {
    headers: {
        'x-apikey': '7a42a1bbb286d8bc8479ba2913acf83f1b4d8',
        'Content-Type': 'application/json'
    }
}

// ---------------- PASSPORT CONFIGURATION --------------------------------------------

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:  'super_secret',
}

passport.use( new JwtStrategy(jwtOptions, catchAsync( async function(payload, done) {

        const user = await axios.get(`${DATABASE}/myuser?q={"email": "${payload.userEmail}"}`, axiosConfig);

        if (user) {
            return done(null, user)
        } else {
            return done(null, false)
        }
    })
));

// ---------------- PASSPORT CALL --------------------------------------------

/**
 * Fonction de protection
 */
exports.protect = passport.authenticate('jwt', { session: false })

// ---------------- LOGIN ROUTE --------------------------------------------

/**
 * Récupération d'un JWT
 */
exports.login = catchAsync(async (req, res, next) => {

    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        res.status(401).json({
            status: 'error',
            message: 'Email or password was not provided.',
          }).send();
        return;
    }

    const response_user = await axios.get(`${DATABASE}/myuser?q={"email": "${email}"}`, axiosConfig);

    if( response_user.data.length == 0 ) {
        res.status(401).json({
            status: 'error',
            message: 'Error login.',
          }).send();
        return;
    }

    let match = undefined;
    if( response_user.data[0].password !== undefined ) {
        const originalPassword = response_user.data[0].password;
        match = bcrypt.compareSync(password, originalPassword);
    } else {
        res.status(401).json({
            status: 'error',
            message: 'Error login.',
          }).send();
        return;
    }

    if( match ) {
        const userJwt = jwt.sign( { userEmail: response_user.data[0].email }, 'super_secret' );
        res.status(200).json({ jwt: userJwt }).send();
        return;
    } else {
        res.status(401).json({
            status: 'error',
            message: 'Error login.',
          }).send();
        return;
    }

});
