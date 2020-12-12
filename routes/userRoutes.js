const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const bodyParser = require('body-parser')
const urlEncodedParser = bodyParser.urlencoded({ extended: false })

const router = express.Router();

router
  .route('/')
  .get(authController.protect, userController.getAllUsers )
  .patch( authController.protect, userController.createUser );

router
  .route('/:id')
  .get( authController.protect, userController.getOneUser )
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
