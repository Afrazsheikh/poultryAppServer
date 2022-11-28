const logger = require('../../config/logger');
const adminService = require('../service/admin.services');
const bcrypt = require('bcrypt');
const twilioConfig = require('../../config/twilioConfig');
const client  = require("twilio")(twilioConfig.accountSID, twilioConfig.authToken)
const User = require("../../models/admin");
const jwt = require('jsonwebtoken');

const adminLogin = (req, res) => {
    logger.info('Inside Admin Login Controller');

    let admin = req.body;

    adminService.adminLogin(admin).then(adminData => {
		
        logger.info(adminData);
        
        let payLoad = {
            id: adminData._id,
            email: adminData.email,
        }

        let token = jwt.sign(payLoad, 'noor_poultry', { expiresIn: 60*60*24*30 });

        res.status(200).json({acknowledged: true, token: token});
    })
	.catch((err) => {
		logger.fatal(err);
		return res.status(err.code?err.code:404).json({"acknowledged":false,"message":err.message});
	})
}

const getUserList = (req, res) => {
    logger.info('Inside Admin Login Controller');

    adminService.getUserList().then((users) => {
        res.status(200).json({acknowledged: true, users: users});
    })
    .catch((err) => {
        logger.fatal(err);
        return res.status(err.code?err.code:404).json({"acknowledged":false,"message":err.message});
    })
}

const getNewUsers = (req, res) => {
    logger.info('inside admin getNewAccount');
    adminService.getNewUsers().then((newUser)=>{
        res.status(200).json({acknowledged: true, users: newUser});
    })
    .catch((err) => {
        logger.fatal(err);
        return res.status(err.code?err.code:404).json({"acknowledged":false,"message":err.message});
    })
}

const activateUser = (req, res) => {
    logger.info('inside activate user');
    let userId = req.params.id;
    adminService.activateUser(userId).then((data) => {
        // call push notification function here
        return res.status(200).json({acknowledged: true, message: "User account activated successfully", user: data});

    })
    .catch((err) => {
        logger.fatal(err);
        return res.status(err.code?err.code:404).json({"acknowledged":false,"message":err.message});
    })
}

const getSellingGraphs = (req, res) => {
	
	logger.info("Inside get selling graph controller", );
	
	adminService.getSellingGraphs(req.params.id).then(data => {
		
		res.status(200).json({success: true, graphData: data});
	})
	.catch((err) => {
		logger.fatal(err);
		return res.status(err.code?err.code:404).json({success: false, message: err.message});
	})
	
}


const getDaysGraphs = (req, res) => {
	
	logger.info("Inside get days graphs controller", );
	
	adminService.getDaysGraphs(req.params.id).then(data => {
		
		res.status(200).json({success: true, graphData: data});
	})
	.catch((err) => {
		logger.fatal(err);
		return res.status(err.code?err.code:404).json({success: false, message: err.message});
	})
	
}

const getUserDetails = (req, res) => {
    logger.info("Inside getUserWithId");
    let userId =  req.params.id;
    adminService.getUserDetails(userId).then(data =>{
        res.status(200).json({acknowledged: true, user: data});
    })
    .catch((err) =>{
        logger.fatal(err);
        return res.status(err.code?err.code:404).json({acknowledged: false, message: err.message});
    })
}




module.exports = 
{
    adminLogin,
    getUserList,
    getNewUsers,
    activateUser,
    getSellingGraphs,
    getDaysGraphs,
    getUserDetails
}