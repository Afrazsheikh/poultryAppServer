const express = require('express');
const validate = require('express-validation');
const controller = require('../controllers/pushNotification.controller');
const checkToken = require('../middlewares/secureRoutes');

const router = express.Router(); 
router.route('/sendOrderNotification').post(checkToken, controller.SendBiddingNotification)
