const express = require('express');
const controller = require('../controllers/admin.controller');
const checkToken = require('../middlewares/secureRoutes');
const router = express.Router();
const validate = require('express-validation');

router.route('/login').post(controller.adminLogin);
router.route('/getUserList').get(checkToken, controller.getUserList);
router.route('/getNewUsers').get(checkToken, controller.getNewUsers);
// router.route('/activateUser/:id').put(checkToken, controller.activateUser);
router.route('/getDaysGraphs').get(checkToken, controller.getDaysGraphs);
router.route('/getSellingGraphs').get(checkToken, controller.getSellingGraphs);
router.route('/getUserDetails/:id').get(checkToken, controller.getUserDetails);







module.exports = router;