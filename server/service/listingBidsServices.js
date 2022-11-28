const logger = require('../../config/logger');
const models = require('../../models');
const mongoose = require('mongoose');



const  addBid = (addBidDetails) =>{
    logger.trace("inside add item service", {addBidDetails});
    return new Promise (async(resolve, reject ) =>{
        try
        {
            await models.listingBids.insertMany(
                [addBidDetails]
            );
              
            resolve({success: true, msg: "Bid added successfuly"});
        }
        catch(err){
            logger.fatal(err);
            reject({code: 401, message: err.message});
        }

    });
}

const getBidDetails = (_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            logger.trace("inside get getListing by id service");
            let Bid = await models.listingDetails.findOne(
                {_id},
                {
                    __v:0
                }
            );
            resolve(Bid);
        }
        catch (err) {
            logger.fatal(err);
            reject({ code:401, message: err.message });
        }
    })
}



const updateBid =  (updateBidObj, id) =>{
    logger.info("inside update bid ", {updateBidObj});
    return new Promise (async (resolve, reject) => {
        try{
            
            let listingBid = await models.listingDetails.findOneAndUpdate(
                {_id: id},
                updateBidObj,
                {returnorignal: false}
                
            );
            return resolve(listingBid)
        }
        catch(err){
            logger.fatal(err);
            reject({code: 401, message: err.message});

        }
    });
  }



  const deleteBid =  (id) =>{
    logger.info("inside deleteBid  ", {id});
    return new Promise (async (resolve, reject) => {
        try{
            
            let listingBid = await models.listingDetails.deleteOne(
                {_id: id},
            );

            logger.debug(listing);
            if(!listingBid.deleteCount){
                return reject({code:422, message:"Listing not found"});
            }
            return resolve(listing)
        }
        catch(err){
            logger.fatal(err);
            reject({code: 401, message: err.message});

        }
    });
  }

module.exports = {
    addBid,
    getBidDetails,
    updateBid,
    deleteBid

}