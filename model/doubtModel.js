import mongoose from "mongoose"

let doubt_schema = new mongoose.Schema({


    topic:{
        type:String,
        required:true
    },
    shortDescription: {
        type:String,
        required:true
    },
    longDescription: {
        type:String,
        required:true
    },
    price: {
        type:Number,
        required:true
    },
    files: [
        {

            type: String

        }
    ],
    status: {
        type: String,
        default: "active"
    },

    studentId: {
        type:String,
        required:true
    },

    studentName:{

        type:String,
        required:true

    },

    

    debuggerId: {
        type: String,
        default: null
    },

    debuggerName:{

        type:String,
        default:null

    
       
    },

    incomingRequests:[{

        type:String   // Id of debugger making request

    }],




    chats:[

        {
            senderName:String,
            senderId:String,
            receiverName:String,
            receiverId:String,
            message:String,
            sentTime:String,
            sentDate:String
        }

    ],




    postedTime: {
        type:String,
        required:true
    }

});


export default mongoose.model("doubt", doubt_schema);