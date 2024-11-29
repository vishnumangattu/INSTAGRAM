import mongoose from "mongoose";

const postSchema= mongoose.Schema({
    userID:{type:String},
    images:{type:Array},
    description:{type:String},
    postedDate:{type:String},
    postedTime:{type:String}
    
})

export default mongoose.model.posts||mongoose.model('post',postSchema)