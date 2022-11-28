const logger = require('../../config/logger');
const userService = require('../service/userServices');
const bcrypt = require('bcrypt');
const twilioConfig = require('../../config/twilioConfig');
const client  = require("twilio")(twilioConfig.accountSID, twilioConfig.authToken);
const User = require("../../models/user");
const jwt = require('jsonwebtoken');

// Generate OTP
const sendOTP = async ( req, res, next) => { 
  let phoneNumber = req.body.phoneNumber;

  logger.info('inside send OTP controller--->', phoneNumber);

  client.verify.services(twilioConfig.serviceSID).verifications.create({
    to: '+91' + phoneNumber,
    channel: 'sms'
  })
  .then((data) => {

    logger.info(data);
    res.status(200).json({ acknowledged: true, message: "OTP send successfuly to your mobile" });
  })
}

// Verify OTP for Login/Registration
const verifyOTP = (req, res, next) => {
  let phoneNumber = req.body.phoneNumber;
  let OTP = req.body.OTP;

  logger.info('inside OTP verify controller--->', {phoneNumber, OTP});
  userService.userLogin(phoneNumber).then((response) => {

    client.verify.services(twilioConfig.serviceSID).verificationChecks.create({
      to: '+91' + phoneNumber,
      code: OTP
    })
    .then((data) => {

      logger.info(data);

      if(response.isPhoneExists) 
      {
        // Generate Token Here and append in response body below
        logger.info(response);

        if(response.userData.isActive) 
        {
          let payload = {
            userId: response.userData._id,
            name: response.userData.name,
            email: response.userData.email,
            userType: response.userData.userType
          }
  
          const userData = jwt.sign(payload, 'noor_poultry', { expiresIn: 60*60*24*30 });
          res.status(200).json({ acknowledged: true, isActive: true, message: "OTP verification success", token: userData });
        }
        else {
          res.status(200).json({ acknowledged: true, isActive: false, message: `OTP verification success. Your account activation is
              under process. It will get activated in 2-3 days.`});
        }
      }
      else {
        res.status(200).json({ acknowledged: true, isActive: false, message: "OTP verification success" });
      }
    })
  })
  .catch((err) => {
    logger.fatal(err);
    res.json({ acknowledged: false, message: err.message });
  })
}

// Update Remaining fields here for i.e Name , email etc
const updateLoginProfile = (req, res, next) => {

  let loginData = req.body;
  logger.trace("inside addUser controller--->", loginData);
  userService.updateLoginProfile(loginData).then(data=>{
    logger.trace("After Adding ");

    let payload = {
      userId: data.user._id,
      name: data.user.name,
      email: data.user.email,
      userType: data.user.userType
    }

    //const userData = jwt.sign(payload, 'noor_poultry', { expiresIn: 60*60*24*30 });
    res.status(200).json({acknowledged: true, message: data.msg});  
  })
  .catch(err=>{
    return res.status(err.code?err.code:404).json({"succuess": false, "message":err.message});
  })
}

module.exports = {
  sendOTP,
  verifyOTP,
  updateLoginProfile 
}