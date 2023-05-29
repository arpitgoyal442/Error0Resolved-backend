import mongoose from "mongoose";
let debugger_schema = new mongoose.Schema({
  email: String,
  name: String,
  imageUrl: String,
  Rating: {
    type: Number,
    default: 4,
  },
  skills: [
    {
      type: String,
    },
  ],
  notifications: [
    {
      sender: Number, //  0 For Admin and 1 for  student
      studentId: {
        // null if notification is from admin
        type: String,
        default: null,
      },
      doubtId: {
        type: String,
        default: null,
      },
      isRequestAccepted: {
        type: Boolean,
        default: false,
      },
      message: {
        // in case of debugger we bydefault know that he/she is requesting -- this field if for admin mainly
        type: String,
        default: null,
      },
    },
  ],
  requestedDoubts: [
    {
      type: String,
    },
  ],
  doubtsSolved: [
    {
      doubtId: String,
    },
  ],
});

export default mongoose.model("debugger", debugger_schema);
