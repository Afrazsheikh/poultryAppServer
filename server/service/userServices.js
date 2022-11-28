const logger = require('../../config/logger');
const models = require('../../models');
const bcrypt = require('bcrypt');
const twilioConfig = require('../../config/twilioConfig');
const client = require ('twilio')(twilioConfig.accountSID, twilioConfig.authToken)


const userLogin = (phoneNumber) => {
  logger.info("inside user login service--->", phoneNumber);
  return new Promise(async (resolve,reject) => {
    try
    {
      //Check if Number is already registered
      const user = await models.user.findOne(
        {phoneNumber: phoneNumber},
        {
          _id: 1,
          name: 1,
          email: 1,
          userType: 1,
          isActive: 1
        }
      );

      if(user) {
        resolve({isPhoneExists: true, userData: user});
      }  
      else {
        resolve({isPhoneExists: false});
      }
    }
    catch(err)
    {
      logger.fatal(err);
      reject({code: 401, message: err.message});
    }
  });
};

const updateLoginProfile = (loginData) => {
  logger.info("inside user update profile--->", loginData);
  return new Promise(async (resolve, reject) => {
    try
    {
      // Update user remaining profile data here
      let user = await models.user.insertMany(
        [loginData]
      );
     
      logger.debug("added successfully--->", user);
      resolve({success: true, msg: "user registered successfuly", user: user});

    }
    catch(err)
    {
      logger.fatal(err);
      reject({code: 401, message: err.message});
    }
  });
}


module.exports = {
  userLogin,
  updateLoginProfile
};