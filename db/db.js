const mongoose = require("mongoose")
async function db () {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("db connection success!");
    } catch (error) {
        throw error;
    }  
}
db();

