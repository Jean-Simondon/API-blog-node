const express = require('express');
const articleController = require('../controllers/articleController');
const authController = require('../controllers/authController');
const bodyParser = require('body-parser')
const urlEncodedParser = bodyParser.urlencoded({ extended: false })

const router = express.Router();

router
  .route('/')
  .get( articleController.getAllArticle )
  .post( articleController.createArticle );

router
  .route('/:id')
  .get(articleController.getOneArticle)
  .patch( articleController.updateArticle )
  .delete( articleController.deleteArticle );

module.exports = router;
