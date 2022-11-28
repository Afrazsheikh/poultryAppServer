var mongoose = require('mongoose');
const Schema = mongoose.Schema;


const listing = new Schema ({
module: {type: String, default: 'Chicken'},
userId : {type: String, default: null},
averageWeight : {type: String , required: [true, "Weight is required!!!"]},
quantity : {type: String, default: 0, required:  [true, "Please fill the quantity"]},
breed : {type : String, default: null },
askingPrice : {type: Number, required: [true, "price is required!!"]},
listingStatus:{ type:String, enum:["PENDING","ACCEPTED","DENIED","COMPLETED","CANCELLED","FAILED"], default:"PENDING"},
},
{
    timestamps:true
});
module.exports = mongoose.model('listing', listing);