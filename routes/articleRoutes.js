const express = require('express');
const articleController = require('../controllers/articleController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(articleController.getAllArticle)
  .post(articleController.createArticle);

router
  .route('/:id')
  .get(articleController.getOneArticle)
  .patch(articleController.updateArticle)
  .delete(
    authController.protect,
    articleController.deleteArticle
  );

module.exports = router;
