const express = require('express');
const validate = require('express-validation');
const controller = require('../controllers/listingBids.controller');
const checkToken = require('../middlewares/secureRoutes');


const router = express.Router(); 
router.route('/addBid').post(checkToken, controller.addBid);
router.route('/updateBid/:id').put(checkToken, controller.updateBid);
router.route('/deleteBid/:id').delete(checkToken, controller.deleteBid);


router.route('/getBidDetails/:id').get(checkToken, controller.getBidDetails);

module.exports = router;
