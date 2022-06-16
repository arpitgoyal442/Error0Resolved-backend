import mongoose from "mongoose"

let student_schema = new mongoose.Schema({

    
    email:String,
    name:String,
    imageUrl:String,
    Rating:{
        type:Number,
        default:4
    },

    Notifications:[
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