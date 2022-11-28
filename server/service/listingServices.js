const logger = require('../../config/logger');
const models = require('../../models');
const mongoose = require('mongoose');


const  addListing = (listingDetails, userId) =>{
    logger.trace("inside add item service", {listingDetails});
    return new Promise (async(resolve, reject ) =>{
        try{
            await models.listing.insertMany(
                [listingDetails]
            );
             
      logger.debug("added successfully");
      resolve({success: true, msg: "Listing Added successfuly"});
        }
        catch(err){
            logger.fatal(err);
            reject({code: 401, message: err.message});
        }

    });
}


const getListing = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            logger.trace("inside get getListing by id service");
            let listing = await models.listing.aggregate([
                /* {$match: {userId: userId}}, */

                {$lookup: {
                    from: "listingbids",
                    localField: "_id",
                    foreignField: "listId",
                    as: "bids"
                }},
                {
                    $project: {
                        _id: 1,
                        userId: 1,
                        quantity: 1,
                        averageWeight: 1,
                        askingPrice: 1,
                        breed: 1,
                        bids: '$bids',
                        createdAt: 1,
                        updatedAt: 1,
                    }
                }
            ]);
            resolve(listing);
        }
        catch (err) {
            logger.fatal(err);
            reject({ code:401, message: err.message });
        }
    })
}

const updateListing =  (updateListingObj, id) =>{
    logger.info("inside update Listing ", {updateListingObj});
    return new Promise (async (resolve, reject) => {
        try{
            
            let listing = await models.listing.findOneAndUpdate(
                {_id: id},
                updateListingObj,
                {returnorignal: false}
                
            );
            return resolve(listing)
        }
        catch(err){
            logger.fatal(err);
            reject({code: 401, message: err.message});

        }
    });
  }

  const deleteListing =  (id) =>{
    logger.info("inside delete Listing ", {id});
    return new Promise (async (resolve, reject) => {
        try{
            
            let listing = await models.listing.deleteOne(
                {_id: id},
            );

            logger.debug(listing);
            if(!listing.deletedCount){
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
    addListing,
    getListing,
    updateListing,
    deleteListing
}