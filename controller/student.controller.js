import studentSchema from "../model/studentModel.js"
import doubtSchema from "../model/doubtModel.js"
import debuggerSchama from "../model/debuggerModel.js"

const getDoubts=  (req,res)=>{

    let studentId=req.params.studentId;

     doubtSchema.find({studentId:studentId} ,function(err,data){

        if(err)
        res.status(404).send(err);

        else res.status(200).send(data);


    });



   


}

const getAllNotifications= async (req,res)=>{

    let studentId=req.params.studentId;

    await studentSchema.findById(studentId).exec().then((data)=>{res.status(200).send(data.notifications)}).catch((err)=>{res.status(404).send(err)})

    
}


const acceptRequest=async (req,res)=>{

    let debuggerId=req.body.debuggerId;
    let doubtId=req.body.doubtId;
    let studentId=req.params.studentId;

    // Mark that Doubt Inactive and set debugger id 

     await   doubtSchema.findByIdAndUpdate(doubtId,{status:'inactive',debuggerId:debuggerId}).catch((err)=>{

        return res.status(404).send(err);
     })

    



    // send Notification to debugger about request accepted  and remove request made by debugger

    let newnotification={

        sender:1,
        studentId:studentId,
        doubtId:doubtId,
        isRequestAccepted:true,
       
    


    }

    debuggerSchama.findById(debuggerId,function(err,data){

        if(err)
        res.status(404).send(err);

        else{

            debuggerSchama.findByIdAndUpdate(debuggerId,{notifications:[...data.notifications , newnotification]} , function(err,data){
                if(err){
                 return res.status(404).send(err);

                }

                else res.status(200).send("Successfully Accepted")
            })


        }
    });



    

  


    


    
}

const declineRequest=()=>{

    // Remove that req from notificaions of student

    // remove that from requestedDoubts of debugger

    // remove that from incoming requests of doubt


    
}

const getProfile= async (req,res)=>{

    let studentId=req.params.studentId;

    await studentSchema.findById(studentId).exec().then((data)=>{res.status(200).send(data)}).catch((err)=>{res.status(404).send(err)})


}

export {getDoubts,getAllNotifications,getProfile,declineRequest,acceptRequest}