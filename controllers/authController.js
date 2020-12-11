const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');

exports.signup = catchAsync(async (req, res, next) => {
    res.status(200).json({
        status: 'road under construction',
    });
});

exports.login = catchAsync(async (req, res, next) => {
    res.status(200).json({
        status: 'road under construction',
    });  
});

exports.protect = catchAsync(async (req, res, next) => {
    res.status(200).json({
        status: 'road under construction',
    });  
});
