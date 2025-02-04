const express = require('express');
const articleController = require('../controllers/articleController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get( articleController.getAllArticle )
  .post( authController.protect, articleController.createArticle );

router
  .route('/:id')
  .get( articleController.getOneArticle )
  .patch( authController.protect, articleController.updateArticle )
  .delete( authController.protect, articleController.deleteArticle );

module.exports = router;
