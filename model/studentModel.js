import mongoose from "mongoose"

let student_schema = new mongoose.Schema({

    
    email:{
        required:true,
        type:String
    },
    name:{
        required:true,
        type:String
    },
    imageUrl:String,
    rating:{
        type:Number,
        default:4
    },

    notifications:[
        {
            sender:Number,         //  0 For Admin and 2 for  debugger
            debuggerData: {          // null if notification is from admin

                type:Object,
                default:null

            },
            doubtData:{

                type:Object,
                default:null

            },

            message:{                    // in case of debugger we bydefault know that he/she is requesting -- this field if for admin mainly

                type:String,
                default:null


            }


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