const logger = require('../../config/logger');
const listingServices = require('../service/listingServices');

const addListing = (req, res, next) => {
    let listingDetails = req.body;
    listingDetails.userId = req.payLoad.userId;
    logger.trace("inside the  add listing controller",listingDetails);
    listingServices.addListing(listingDetails).then( async(data)=> {

        logger.trace("After Adding ");
        res.status(200).json({acknowledged: true, message: data.msg});
    })
    .catch(err=>{
        logger.fatal(err);
        return res.status(err.code?err.code:404).json({"success":false,"message":err.message});
    });

}

const getListing = (req,res,next)=>{
    let userId = req.payLoad.userId;
    logger.trace("inside get order by id controller",{userId});
    listingServices.getListing(userId).then(data=>{

        res.status(200).json({"acknowledged": true, "data": data});
    }).catch(err=>{
        logger.fatal(err);
        return res.status(err.code?err.code:404).json({"acknowledged": false, "message": err.message});
    });
}


const updateListing =  (req, res, next) =>{
    let updateListingObj =  req.body;
    let id = req.params.id;

    logger.trace("inside the updadte listing ccontroller",updateListingObj, id);
    listingServices.updateListing(updateListingObj, id).then (async (data)=>{
        logger.trace("After update ")
        res.status(200).json({acknowledged: true, message: "listing updated successfully..."});
    })
    .catch(err=>{
        logger.fatal(err);
        return res.status(err.code?err.code:404).json({"success":false,"message":err.message});
    });
}

const deleteListing =  (req, res, next) =>{
    let id =  req.params.id;  
    logger.trace("inside the delete listing ccontroller",id );
    listingServices.deleteListing(id).then (async (data)=>{
        logger.trace("After delete")
        res.status(200).json({acknowledged: true, message: "listing deleted successfully..."});
    })
    .catch(err=>{
        logger.fatal(err);
        return res.status(err.code?err.code:404).json({"success":false,"message":err.message});
    });
}


module.exports= {
    addListing,
    getListing,
    updateListing,
    deleteListing

}