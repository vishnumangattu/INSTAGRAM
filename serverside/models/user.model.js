import mongoose from "mongoose";

const userSchema= mongoose.Schema({
    username:{type:String},
    email:{type:String},
    password:{type:String},
    cpassword:{type:String}
    
})

export default mongoose.model.users||mongoose.model('user',userSchema)