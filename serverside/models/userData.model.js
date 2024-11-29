import mongoose from "mongoose";

const profileSchema= mongoose.Schema({
    profile:{type:String},
    bio:{type:String},
    phone:{type:String},
    gender:{type:String},
    userID:{type:String}
})

export default mongoose.model.userdatas||mongoose.model('userdata',profileSchema)