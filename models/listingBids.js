var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingBids = new Schema ({
listId: {type: Schema.Types.ObjectId, ref: 'listing'},
/* userId : {type: Schema.Types.ObjectId, ref:'user'}, */
quantity : {type: Number, default: 0, required:  [true, "Plase fill the quantity"]},
offerPrice : {type : Number, default: 0, required : [true, "please enter offer price"]},
listingStatus:{ type:String, enum:["PENDING","ACCEPTED","DENIED","COMPLETED","CANCELLED","FAILED"], default:"PENDING"},
},
{
    timestamps: true
})

module.exports = mongoose.model('listingBids', listingBids)