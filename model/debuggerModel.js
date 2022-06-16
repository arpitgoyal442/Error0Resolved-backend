import mongoose from "mongoose"

let debugger_schema = new mongoose.Schema({

    
    email:String,
    name:String,
    imageUrl:String,
    Rating:{
        type:Number,
        default:4
    },

    skills:[
        {
            type:String
        }
    ],

    notifications:Array,

    requestedDoubts:[
        {
            doubtId:String
        }

    ],


    
    doubtsSolved:[
        {
            doubtId:String
        }
    ],

    chats:[
        {
            student:String,
            doubtId:String,
            conversation:[
                {
                    isSender:Boolean, // corresponding to debugger -- is he sender or receiver
                    message:String,
                    time:String
                

                }
            ]
        }
    ]




});


export default mongoose.model("debugger",debugger_schema);