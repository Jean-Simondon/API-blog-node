// Important des modules
const express = require('express');
const bodyParser = require('body-parser')

// const cors = require('cors');

// Importation des routes pour articles et utilisateur
const articleRouter = require('./routes/articleRoutes');
const userRouter = require('./routes/userRoutes');
const authRouter = require('./routes/authRoutes');

const app = express();

//app.use(cors()); // https://expressjs.com/en/resources/middleware/cors.html
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(cors);

app.use('/api/v1/article', articleRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/auth', authRouter);

// Erreur 404, si aucune autre route ne match
app.all('*', (req, res, next) => {
  res.json('La page recherché n\'existe pas');
});

module.exports = app;


