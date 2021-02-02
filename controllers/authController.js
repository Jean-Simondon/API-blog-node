// MODULE
const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken')
const axios = require('axios').default;

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

        const user = await axios.get(`${DATABASE}/myuser?q={"email": "${payload.jwtData.userEmail}"}`, axiosConfig);

        if (user) {
            return done(null, user) // error, user, info
        } else {
            return done(null, false) // error, user, info
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
        res.status(401).json({ error: 'Email or password was not provided.' })
        return
    }

    const response_user = await axios.get(`${DATABASE}/myuser?q={"password": "${password}", "email": "${email}"}`, axiosConfig);

    if( !response_user ) {
        res.status(401).json({ error: 'Email / password do not match.' })
        return;
    }

    const jwtData = {
        userEmail: response_user['data'][0]['email'],
        userId: response_user['data'][0]['_id'],
    }

    const userJwt = jwt.sign( { jwtData: jwtData }, 'super_secret' );

    res.json({ jwt: userJwt });

});
