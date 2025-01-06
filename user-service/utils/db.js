import mongoose from "mongoose";
const connectDB =()=>{
    try{
        mongoose.connect(process.env.DATABASE_URLU, { useNewUrlParser: true, useUnifiedTopology: true })
          .then(() => console.log("User Service connected to DB"))
          .catch(err => console.error("DB Connection Error:", err));
    }
    catch(err){
        console.error(err);
    }
}

export default connectDB;