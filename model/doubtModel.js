import mongoose from "mongoose"

let doubt_schema = new mongoose.Schema({

    
   topic:String,
   shortDescription:String,
   longDescription:String,
   Price:Number,
   status:{
       type:String,
       default:"active"
   },

   studentId:String,

   debuggerId:{
       type:String,
       default:null
   },

   postedTime:String





});


export default mongoose.model("student",doubt_schema);