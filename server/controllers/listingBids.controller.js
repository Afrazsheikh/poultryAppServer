const logger = require('../../config/logger');
const chickenDetails = require('../service/listingBidsServices');


const addBid = ( req, res, next) =>{
    let addBidDetails = req.body;
    logger.trace("inside the add bid  controller ", addBidDetails);
    chickenDetails.addBid(addBidDetails).then(async (data)=>{
  
        logger.trace("After Adding ");
        res.status(200).json({acknowledged: true, message: data.msg});
    })
    .catch(err=>{
        logger.fatal(err);
        return res.status(err.code?err.code:404).json({"success":false,"message":err.message});
    });

}

const getBidDetails = (req,res,next)=>{
    let id = req.params.id
    logger.trace("inside get order by id controller",{id});
    chickenDetails.getBidDetails(id).then(data=>{
        res.status(200).json({"success":true, "data":data});
    }).catch(err=>{
        logger.fatal(err);
        return res.status(err.code?err.code:404).json({"success":false,"message":err.message});
    });
}




const updateBid =  (req, res, next) =>{
    let updateBidObj =  req.body;
    let id = req.params.id;

    logger.trace("inside the updadte Bid ccontroller",updateBidObj, id);
    chickenDetails.updateListing(updateBidObj, id).then (async (data)=>{
        logger.trace("After update ")
        res.status(200).json({acknowledged: true, message: data.msg});
    })
    .catch(err=>{
        logger.fatal(err);
        return res.status(err.code?err.code:404).json({"success":false,"message":err.message});
    });
}


const deleteBid =  (req, res, next) =>{
    let id =  req.params.id;  
    logger.trace("inside the Delete bid controller",id );
    chickenDetails.deleteListing(id).then (async (data)=>{
        logger.trace("After update ")
        res.status(200).json({acknowledged: true, message: data.msg});
    })
    .catch(err=>{
        logger.fatal(err);
        return res.status(err.code?err.code:404).json({"success":false,"message":err.message});
    });
}


module.exports = {
    addBid,
    getBidDetails,
    updateBid,
    deleteBid,

}
