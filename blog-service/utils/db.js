import mongoose from "mongoose";
const connectDb=async()=>{
    mongoose.connect(process.env.DATABASE_URLB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Blog Service connected to DB"))
  .catch(err => console.error("DB Connection Error:", err));

}
export default connectDb;