const express = require('express');
const authController = require('../controllers/authController');
const bodyParser = require('body-parser')
const urlEncodedParser = bodyParser.urlencoded({ extended: false })

const router = express.Router();

router.post('/signup', urlEncodedParser, authController.signup);
router.post('/login', urlEncodedParser, authController.login);

module.exports = router;
