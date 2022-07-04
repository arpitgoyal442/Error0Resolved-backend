import uploadToCloudinary from "../cloudinary.js";
import doubtSchema from "../model/doubtModel.js"
import studentModel from "../model/studentModel.js";


// Helper functions **START

function giveDate(){

    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let postedtime = date + "-" + month + "-" + year;

    return postedtime;

}



//Helper functions **END


const addNewDoubt = async (req, res) => {

    console.log(req.files);
    console.log(req.body);

    let files = [];

    for (let i = 0; i < req.files.length; i++) {
        let result = await uploadToCloudinary(req.files[i].path);
        console.log(result.url);
        files.push(result.url);
    }

    let postedtime=giveDate();

    req.body = {

        ...req.body, files: files, postedTime: postedtime
    }

   

    let doubt=new doubtSchema(req.body);
     await doubt.save(function(err,data){
        if(err)
        return  res.status(404).send("Error : "+err);

        else {
            console.log(data);
            return res.send("doubt Added successfully")
        }
        
     });
}


const getAllDoubts = (req, res) => {

    doubtSchema.find(function(err,data){
        
        if(err)
        res.status(404).send(err);

        else res.send(data);
    });





}

const viewDoubt = (req,res) => {

    let doubtId=req.params.doubtId;
    doubtSchema.findOne({_id:doubtId},function(err,data){
        
        if(err)
        return  res.status(404).send(err);

        else return res.send(data);
    });
    



}
const deleteDoubt = (req,res) => {

    let doubtId=req.params.doubtId;
    doubtSchema.deleteOne({_id:doubtId},function(err,data){

        if(err)
         return res.status(404).send(err);

        else  return res.status(200).send("Deleted Successfully");

        

    })

}
const editDoubt = (req,res) => {

    doubtSchema.findByIdAndUpdate( req.params.doubtId,req.body , function(err,data){

        if(err)
         return res.status(404).send(err);

        else return  res.status(200).send("Updated Successfully");


    })

}

export { addNewDoubt, getAllDoubts, viewDoubt, editDoubt, deleteDoubt };