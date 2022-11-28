var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema ({
    name: { type: String, required: [true,'firstName is required!!!']},
    email: { 
        type: String,
        trim:true, 
        lowercase:true,
        required: [true,'email is required!!!'],
        index: { unique: true}
    },
    moduleList: {type: Array, default: ['Chicken']},
    userType: {type: String, required: [true, 'userType is required']}, //Buyer or Seller
    phoneNumber: {type: String, required: [ true,'phoneNumber is requried ']},
    workProfile: {type: String},
    street: {type: String},
    district: { type: String},
    state: { type: String},
    companyName: {type: String},
    isDelete: {type:Boolean, default: false},
    isActive: {type: Boolean, default: false},
},
{
    timestamps: true
});

module.exports = mongoose.model('user', user);