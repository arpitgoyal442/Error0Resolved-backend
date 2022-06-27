import mongoose from "mongoose"

let doubt_schema = new mongoose.Schema({


    topic: String,
    shortDescription: String,
    longDescription: String,
    price: Number,
    files: [
        {

            type: String

        }
    ],
    status: {
        type: String,
        default: "active"
    },

    studentId: String,

    debuggerId: {
        type: String,
        default: null
    },

    postedTime: String

});


export default mongoose.model("doubt", doubt_schema);