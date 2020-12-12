// Important des modules
const express = require('express');

// Importation des routes pour articles et utilisateur
const articleRouter = require('./routes/articleRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// Les routes sur les articles
app.use('/api/v1/articles', articleRouter);
app.use('/api/v1/users', userRouter);

// Erreur 404, si aucune autre route ne match
app.all('*', (req, res, next) => {
  res.send('La page recherché n\'existe pas');
});

module.exports = app;
