// Important des modules
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');

// Importation des routes pour articles et utilisateur
const articleRouter = require('./routes/articleRoutes');
const userRouter = require('./routes/userRoutes');
const authRouter = require('./routes/authRoutes');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var corsOptions = {
  origin: 'https://wonderful-turing-d512ba.netlify.app',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions)); // https://expressjs.com/en/resources/middleware/cors.html

app.use('/api/v1/article', articleRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/auth', authRouter);

// Erreur 404, si aucune autre route ne match
app.all('*', (req, res, next) => {
  res.json('La page recherché n\'existe pas');
});

module.exports = app;


