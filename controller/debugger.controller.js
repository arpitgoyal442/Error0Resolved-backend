import studentSchema from "../model/studentModel.js"
import doubtSchema from "../model/doubtModel.js"
import debuggerSchema from "../model/debuggerModel.js"



const makeRequest= async (req,res)=>{

    let doubtId=req.body.doubtId;
    let debuggerId=req.params.debuggerId;
    let studentId=req.body.studentId;


    // .then((data)=>{console.log("doubt data");console.log(data)})
    // .then((data)=>{console.log("doubt data");console.log(data)}).catch((err)=>{res.send(err)});
   
    let record= await doubtSchema.findOne({doubtId:doubtId}).exec().catch(err=>{ return res.status(404).send(err)});
    console.log("records are: ");
    console.log(record);

    await doubtSchema.findByIdAndUpdate(doubtId,{incomingRequests:[...record.incomingRequests,debuggerId]}).exec().catch((err)=>{res.status(404).send(err)});

    // studentId=record.studentId;
    // console.log( "Student Id is "+record.studentId);

    

     

    

    // add request for that debugger

    let debuggerdata= await debuggerSchema.findById(debuggerId).exec();
    debuggerSchema.findByIdAndUpdate(debuggerId,{requestedDoubts:[...debuggerdata.requestedDoubts,doubtId]}).then((data)=>{console.log(data)}).catch((err)=>{console.log(err)})

    

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

