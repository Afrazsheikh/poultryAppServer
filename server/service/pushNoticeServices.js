const logger = require('../../config/logger');
const models = require('../../models');
const mongoose = require('mongoose');
const serviceAccount = require("../../config/firebaseKey/poultryapp.json");


const  SendBiddingNotification = (bid , addBidDetails) => {
    return new Promise  (async (resolve, reject)=> {
        logger.trace('Inside  push Notification Service');
        try {

            let bid  = await models.listing.findOne({userId}, {deviceToken: 1, _id: 0});
            let deviceId = models.listing.deviceToken;


            const message = {
                notification : {}
            }
            fireAdmin.messaging().sendToDevice(deviceId, message).then(response => {
				logger.trace(response);
				resolve(response);
			})
			.catch(err => {
				logger.trace(err);
				reject(err);
			})

        }
        catch(err) {
			logger.fatal(err);
			reject({ code:422, message: err.message })
		}
    })
}

module.exports = {
    SendBiddingNotification,
}