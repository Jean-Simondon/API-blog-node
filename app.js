const express = require('express');
const articleRouter = require('./routes/articlesRoutes');

const app = express();

// Les routes sur les articles
app.use('/api/v1/articles', articleRouter);

// Erreur 404
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server !`, 404));
  });

module.exports = app;
