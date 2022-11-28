const express = require('express');

const router = express.Router(); // eslint-disable-line new-cap
const userServicesRoutes = require('./server/routes/userServices.router');
const listingRoutes = require('./server/routes/listingServices.router');
const listingBidsRoutes = require('./server/routes/listingBids.router');
const adminRoutes = require('./server/routes/admin.router');
const cashFree = require('./server/routes/cashFree.router');
const pushNoticeService = require('./server/routes/pushNotification.router');



// let expressWs = require('express-ws')(router);


/** GET /health-check - Check service health */ 
router.get('/health-check', (req, res) => res.send('OK'));

router.use('/userService', userServicesRoutes);
router.use('/listingService', listingRoutes); 
router.use('/listingBidsServices', listingBidsRoutes); 
router.use('/adminService', adminRoutes);
//router.use('/cashFree', cashFree); 
//router.use('/pushNotification', pushNotification); 





module.exports = router;
