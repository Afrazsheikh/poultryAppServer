// const logger = require('../../config/logger');
// const cashFree = require('../service/cashFree.services');



// // const handleResponse = (response) => {
// //     if(response.status === "ERROR"){
// //         throw {name: "handle response error", message: "error returned"};
// //     }
// // } services

// const cashFree = (req, res, next) => {
//     let payment =  req.body;
//     logger.trace("inside cashFree  controller ", payment)
//     cashFree.cashFree().then(async (data)=>{


  
//         logger.trace("After Adding ");
//            res.status(200).json({acknowledged: true, message: data.msg});
//         })
// .catch(err=>{
//     logger.fatal(err);
//     return res.status(err.code?err.code:404).json({"success":false,"message":err.message});
// });




// const {Payouts} = cfSdk;
// const {Beneficiary, Transfers} = Payouts;

// //main execution function
// const bene = {
//     "beneId": "JOHN1801277890990877", 
//     "name": "john doe",
//     "email": "johndoe@cashfree.com", 
//     "phone": "9876543210",
//     "bankAccount": "00011020001772",
//     "ifsc": "HDFC0000001",    
//     "address1" : "ABC Street", 
//     "city": "Bangalore", 
//     "state":"Karnataka", 
//     "pincode": "560001"
// };

// module.exports= {
//     handleResponse,

// }