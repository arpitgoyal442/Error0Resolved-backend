import studentSchema from "../model/studentModel.js"
import doubtSchema from "../model/doubtModel.js"
import debuggerSchema from "../model/debuggerModel.js"



const makeRequest= async (req,res)=>{

    let doubtId=req.body.doubtId;
    let debuggerId=req.params.debuggerId;
    let studentId=null;

    // add request in that doubt
     
    //     await doubtSchema.findById(doubtId, async  (err,data)=>{

    //     if(err)
    //     res.status(404).send(err);

    //     else {

    //         studentId=data.studentId;
    //           console.log(studentId);

    //          await doubtSchema.findByIdAndUpdate(doubtId,{incomingRequests:[...data.incomingRequests,debuggerId]},function(err,data){

    //             if(err)
    //             res.status(404).send(err);
    //         });

    //     }
    // });

    let record= await doubtSchema.findOne({doubtId:doubtId}).exec().catch((err)=>{res.send(err)});

    await doubtSchema.findByIdAndUpdate(doubtId,{incomingRequests:[...record.incomingRequests,debuggerId]}).exec().catch((err)=>{res.status(404).send(err)});

    studentId=record.studentId;
    console.log(record.studentId);

    

     

    

    // add request for that debugger

    let debuggerdata= await debuggerSchema.findById(debuggerId).exec();
    debuggerSchema.findByIdAndUpdate(debuggerId,{requestedDoubts:[...debuggerdata.requestedDoubts,doubtId]}).then((data)=>{console.log(data)}).catch((err)=>{console.log(err)})

    //  debuggerSchema.findById(debuggerId,function(err,data){

    //     if(err)
    //     res.status(404).send(err);

    //     else {

    //         debuggerSchema.findByIdAndUpdate(doubtId,{requestedDoubts:[...data.requestedDoubts,doubtId]},function(err,data){

    //             if(err)
    //             res.status(404).send(err);



    //         })
    //     }
    // })



    // in student send a notification
    let newNotification={

        sender:2,
        debuggerId:debuggerId,
        doubtId:doubtId
    }

      studentSchema.findById(studentId,function(err,data){

        if(err)
        res.status(404).send(err);

        else{

            studentSchema.findByIdAndUpdate(studentId,{notifications:[...data.notifications,newNotification]},function(err,data){

                if(err)
                res.status(404).send(err);

                else res.status(200).send("Request Made Successfully");
            })
        }
    })

    

    

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

