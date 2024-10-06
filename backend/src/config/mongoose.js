import mongoose from "mongoose";

const URL = process.env.DB_URL;
export const connectDB = async ()=>{
    try{
        await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Mongodb connected using mongoose");
    } catch(err){
        console.log("Error while connecting to db");
        console.log(err);
    }
} 