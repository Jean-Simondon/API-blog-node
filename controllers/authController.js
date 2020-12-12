// MODULE
const passport = require('passport')
const passportJWT = require('passport-jwt')
const jwt = require('jsonwebtoken')
const catchAsync = require('../utils/catchAsync');
const bodyParser = require('body-parser')
const urlEncodedParser = bodyParser.urlencoded({ extended: false })

// Récupérer les utilisateur dans la BDD plutôt que cette ligne de code
const users = [
            { email: 'jsimondon@yahoo.fr', password: '12345' }
            ];

// VARIABLE
const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy
const secret = 'super_secret';

// CONFUGRATION
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret
}

const jwtStrategy = new JwtStrategy(jwtOptions, function(payload, next) {
// usually this would be a database call:
    const user = users.find(user => user.email === payload.user);
    if (user) {
        next(null, user)
    } else {
        next(null, false)
    }
});

passport.use(jwtStrategy);


/**
 * Récupération d'un JWT 
 * Ajouter le urlEncodedParser pour email et password
 */
exports.login = catchAsync(async (req, res, next) => {

    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        res.status(401).json({ error: 'Email or password was not provided.' })
        return
    }

    // usually this would be a database call :
    const user = users.find(user => user.email === email);

    if (!user || user.password !== password) {
        res.status(401).json({ error: 'Email / password do not match.' })
        return
    }

    const userJwt = jwt.sign({ user: user.email }, secret);

    res.json({ jwt: userJwt });

});





exports.signup = catchAsync(async (req, res, next) => {
    // vérifier les données que l'on envoie
    // si elles sont toutes là, on les utilise pour créer un nouvel utilisateur et le placer dans la BDD
    // et on envoie un jwt à l'utilisateur par la même occasion
    res.status(200).json({
        status: 'road under construction',
    });
});



exports.isAuthor = catchAsync(async (req, res, next) => {
    res.status(200).json({
        status: 'road under construction',
    });
    next();
});




exports.protect = catchAsync(async (req, res, next) => {
    passport.authenticate('jwt', { session: false })
    next();
});





