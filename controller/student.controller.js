import studentSchema from "../model/studentModel.js"
import doubtSchema from "../model/doubtModel.js"
import debuggerSchama from "../model/debuggerModel.js"
import nodemailer from"nodemailer";

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


    let notificationId=req.body.notificationId;
    console.log("Notification id is"+notificationId);
    let debuggerId=req.body.debuggerId;
    let debuggerName=req.body.debuggerName;
    let doubtId=req.body.doubtId;
    let studentId=req.body.studentId;
    let studentName=req.body.studentName;

    console.log("Users email"+req.body.debuggerEmail)


    console.log("On Accept");

    console.log(req.body);

   

    // Mark that Doubt Inactive and set debugger id 

     let doubt= await   doubtSchema.findByIdAndUpdate(doubtId,{status:'inactive',debuggerId:debuggerId,debuggerName:debuggerName}).catch((err)=>{

        return res.status(404).send(err);
     })

    // send Notification to debugger about request accepted  and remove request made by debugger

    let newnotification={

        sender:1,
        studentId:studentId,
        doubtId:doubtId,
        isRequestAccepted:true,
        message:"Congratulations 🎉🎉 "+studentName + " has accepted your request for "+doubt.topic +" doubt"
       
    }

     await debuggerSchama.findByIdAndUpdate(debuggerId,{ $push:{notifications:newnotification} })
    .then((data)=>{ console.log(data);  })
    .catch((err)=>{return res.send(err)});


    // Remove the notification from student

    // *** Removal of Notification from student is NOT Working 😒 *** 
    studentSchema.findByIdAndUpdate(studentId , {$pull:{notifications :{_id:notificationId}}})
    .then((data)=>{

        console.log("data After pull ");
        console.log(data);
        return res.status(200).send("Added Successfully");
    })
    .catch((err)=>{return res.send(err)});

    //  ****Sending mail to debugger *******

    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'mariano.williamson73@ethereal.email',
            pass: 'juMmhdSeKANVbMDYVS'
        },
      });

    
    
      // send mail with defined transport object
//       let info = await transporter.sendMail({
//         from: '"Fred Foo 👻"<arpitgoyal442@gmail.com>', // sender address
//         to: 'arpit.05616403219@ipu.ac.in', // list of receivers
//         subject: "Request Accepted", // Subject line
//         text: studentName+"has accepted your request ", // plain text body
//         html: "<b>Hello world?</b>", // html body
//       });
//  console.log("Mesage sent")
//       console.log(info.messageId)
    


  




    
}

const declineRequest=()=>{

    // Remove that req from notificaions of student

    // remove that from requestedDoubts of debugger

    // remove that from incoming requests of doubt


    
}

const getProfile= async (req,res)=>{

    let studentId=req.params.studentId;
    // console.log("request is coming")

    await studentSchema.findById(studentId).exec().then((data)=>{ res.status(200).send(data)}).catch((err)=>{res.status(404).send(err)})


}

export {getDoubts,getAllNotifications,getProfile,declineRequest,acceptRequest}