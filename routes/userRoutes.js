const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/currentuser')
  .get( authController.protect, userController.getCurrentUser );

router
  .route('/')
  .get( authController.protect, userController.getAllUsers )
  .post( userController.createUser );

router
  .route('/:id')
  .get( authController.protect, userController.getOneUser )
  .patch( authController.protect, userController.updateUser )
  .delete( authController.protect, userController.deleteUser );


module.exports = router;
