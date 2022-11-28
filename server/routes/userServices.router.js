const express = require('express');
const validate = require('express-validation');
const controller = require('../controllers/userServices.controller')
const {login} = require('../validations/userServices.validation');
const router = express.Router();
const checkToken = require('../middlewares/secureRoutes')


router.route('/sendOTP').post(controller.sendOTP);
router.route('/verifyOTP').post(controller.verifyOTP);
router.route('/updateLoginProfile').post(controller.updateLoginProfile);

// router.route('/login_with_phone').post(controller.createNewUser);
// router.route('/verify').post(controller.verifyPhoneOtp);
// router.route('/me').get(controller.fetchCurrentUser);
// router.route('/admin').get(controller.handleAdmin);

module.exports = router;
