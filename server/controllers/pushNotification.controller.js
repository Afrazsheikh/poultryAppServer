const logger = require('../../config/logger');
const pushNoticeService = require('../service/pushNoticeServices');
const chickenListingServices = require('../service/listingServices');
const chickenDetailsServices = require('../service/listingBidsServices');



const SendBiddingNotification  = (req, res, next) => {
    let bid = req.body;
    let addBidDetails  = req.payload;

    logger.trace ( "inside the SendBiddingNotificsation", bid, addBidDetails);

        // Get Latest Bid
	let notify = {};
	
	notify.orderStatus = {$in:['PENDING','ACCEPTED']};

    chickenDetailsServices.getBidDetails(notify).then(async(bidds) => {
        delete notify.listingStatus;
      
    })
    .catch(err => {
        return res.status(err.code?err.code:404).json({"success":false,"message":err.message});
    })
}

module.exports = { 
    SendBiddingNotification,

}