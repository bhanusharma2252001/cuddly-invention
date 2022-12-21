const mongoose = require('mongoose');
const schema = new mongoose.Schema(
    {   eventId: String, 
        eventName: String, 
        marketId: String 
    });
const Data = mongoose.model('Data', schema);
module.exports ={
    Data
}