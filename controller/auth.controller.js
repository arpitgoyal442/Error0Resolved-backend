import studentModel from "../model/studentModel.js";
import debuggerModel from "../model/debuggerModel.js";

const Login=(req,res)=>{

    const img=req.body.img;
    const name=req.body.name;
    const email=req.body.email;

    const userType=req.body.userType; // 1 means student 2 means debugger

    if(userType==1)
    {
           

            studentModel.findOne( {email:email} ).then( (data)=>{

                if(!data)
                {
                    // insert this user in student 
                    let newStudent= new studentModel({ name:name,email:email,imageUrl:img});

                    newStudent.save( function(err,data){

                        if(err)
                        return res.status(404).send(err);

                        else{ console.log(data); return res.status(200).send(data)}
                    } )
                }

                // Dont insert as user is already there just return _id
                else return res.send(data);
                

            } ).catch((err)=>{

               return res.send(err);
            })
    }


    else if(userType==2)
    {

        debuggerModel.findOne( {email:email} ).then( (data)=>{

            if(!data)
            {
            // insert this user in student 
            let newDebugger= new debuggerModel({ name:name,email:email,imageUrl:img});

            newDebugger.save( function(err,data){

                if(err)
                return res.status(404).send(err);

                else{ console.log(data); return res.status(200).send(data)}
            } )

        }

        else   return res.send(data);
                

            


       } ).catch((err)=>{

          return res.send(err);
       })

    }




}

export {Login};