import mongoose from "mongoose"

let student_schema = new mongoose.Schema({

    
    email:String,
    name:String,
    imageUrl:String,
    rating:{
        type:Number,
        default:4
    },

    notifications:[
        {
            type:String
        }
    ],

    chats:[
        {
            debuggerId:String,
            doubtId:String
        }
    ]




});


export default mongoose.model("student",student_schema);