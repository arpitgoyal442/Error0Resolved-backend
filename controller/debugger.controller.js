import studentSchema from "../model/studentModel.js"
import doubtSchema from "../model/doubtModel.js"
import debuggerSchema from "../model/debuggerModel.js"



const makeRequest= async (req,res)=>{

    console.log(req)


    try{

    let doubtId=req.body.doubtId;
    let debuggerId=req.params.debuggerId;
    let studentId=req.body.studentId;

    console.log(doubtId+"--"+debuggerId+"--"+studentId)

    // Adding debugger id to incoming req. in doubt
    let record=await doubtSchema.findByIdAndUpdate(doubtId,{$push:{incomingRequests:debuggerId}}).catch((err)=>{return res.send(err)});
    console.log("record is --");
    console.log(record);

    
    // adding doubtid to requested doubt in debugger
    let debuggerdata=await debuggerSchema.findByIdAndUpdate(debuggerId,{$push:{requestedDoubts:doubtId}}).catch((err)=>{ console.log("debugger data is not coming");
        return res.send(err)});


    console.log("Debugger data--");
    console.log(debuggerdata);

    let debuggerFiltered={};  // with Notification to student we need to send some info of debugger as well for that purpose this obj is created
    for (const key in debuggerdata) {

            if(key=='_id' || key=='name'||key=='imageUrl'||key=='Rating'||key=='skills')
            debuggerFiltered[key]=debuggerdata[key];

            else if(key=='doubtsSolved')
            debuggerFiltered.doubtSolved=debuggerdata.doubtsSolved.length;
    }

    // in student send a notification
    let newNotification={

        sender:2,
        debuggerData:debuggerFiltered,

        doubtData:record,
        message: debuggerdata.name+" is requesting to solve Your "+ record.topic+" doubt"
    }

         // Push Notification in Student
         studentSchema.findByIdAndUpdate(studentId,{$push:{notifications:newNotification}}).then((data)=>{

            console.log("Data After Making Request");
            console.log(newNotification);
            return res.status(200).send(newNotification);

         }).catch((err)=>{return res.send(err)});


        }catch(error){

            res.status(404).send(error)

        }

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

