import studentSchema from "../model/studentModel.js"
import doubtSchema from "../model/doubtModel.js"

const getDoubts=  (req,res)=>{

    let studentId=req.params.studentId;

     doubtSchema.find({studentId:studentId},function(err,data){

        if(err)
        res.status(404).send(err);

        else res.status(200).send(data);


    });



   


}

const getAllNotifications=()=>{
    
}


const acceptRequest=()=>{
    
}

const declineRequest=()=>{
    
}

const getProfile=()=>{

}

export {getDoubts,getAllNotifications,getProfile,declineRequest,acceptRequest}