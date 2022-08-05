import studentSchema from "../model/studentModel.js"
import doubtSchema from "../model/doubtModel.js"
import debuggerSchema from "../model/debuggerModel.js"



const makeRequest= async (req,res)=>{

    let doubtId=req.body.doubtId;
    let debuggerId=req.params.debuggerId;
    let studentId=req.body.studentId;

    // Adding debugger id to incoming req. in doubt
    let record=await doubtSchema.findByIdAndUpdate(doubtId,{$push:{incomingRequests:debuggerId}}).catch((err)=>{return res.send(err)});

    
    // adding doubtid to requested doubt in debugger
    let debuggerdata=await debuggerSchema.findByIdAndUpdate(debuggerId,{$push:{requestedDoubts:doubtId}}).catch((err)=>{return res.send(err)});

   

    // in student send a notification
    let newNotification={

        sender:2,
        debuggerData:debuggerdata,

        doubtData:record,
        message: debuggerdata.name+" is requesting to solve Your "+ record.topic+" doubt"
    }


         // Push Notification in Student
         studentSchema.findByIdAndUpdate(studentId,{$push:{notifications:newNotification}}).then((data)=>{

            return res.status(200).send(data);

         }).catch((err)=>{return res.send(err)});

    

    

}

const getProfile= async(req,res)=>{

    let debuggerId=req.params.debuggerId;

     debuggerSchema.findById(debuggerId).exec().then((data)=>{res.status(200).send(data)}).catch((err)=>{res.status(404).send(err)})



}

const getNotifications= async (req,res)=>{

    let debuggerId=req.params.debuggerId;

    await debuggerSchema.findById(debuggerId).exec().then((data)=>{res.status(200).send(data.notifications)}).catch((err)=>{res.status(404).send(err)})



}

export {makeRequest,getNotifications,getProfile};

