import mongoose from "mongoose";

export default async  function Connection(){
    const db = mongoose.connect(process.env.DB_URL+process.env.DB_NAME)
    return db

}
