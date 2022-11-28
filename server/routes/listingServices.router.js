const express = require('express');
const validate = require('express-validation');
const controller = require('../controllers/listingServices.controller');
const checkToken = require('../middlewares/secureRoutes');

const router = express.Router(); 

router.route('/getListing').get(checkToken,controller.getListing);
router.route('/addListing').post(checkToken, controller.addListing);
router.route('/updateListing/:id').put(checkToken, controller.updateListing);
router.route('/deleteListing/:id').delete(checkToken, controller.deleteListing);

module.exports = router;
