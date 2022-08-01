import uploadToCloudinary from "../cloudinary.js";
import doubtSchema from "../model/doubtModel.js"
import studentModel from "../model/studentModel.js";
import debuggerModel from "../model/debuggerModel.js";



// Helper functions **START

function giveDate() {

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
        console.log(result);
        files.push(result.url);
    }

    let postedtime = giveDate();

    req.body = {

        ...req.body, files: files, postedTime: postedtime
    }



    let doubt = new doubtSchema(req.body);
    await doubt.save(function (err, data) {
        if (err)
            return res.status(404).send("Error : " + err);

        else {
            console.log(data);
            return res.send("doubt Added successfully")
        }

    });
}


const getAllDoubts = async (req, res) => {

     console.log("Request in coming")

    const param = req.query;
    const filters = {};
    const sortOrder = {};// To decide wheteher to sort acc. to date or price

    console.log(param)

    let debuggerId = param.debuggerId;

    if (param.active == 1)
        filters.status = "active";

    else if (param.active == -1)
        filters.status = "inactive";

    if (param.topics)
        filters.topic = param.topics;

    if (param.sort == 1)
        sortOrder._id = -1;

    else sortOrder.price = -1;

    if (param.solvingNow == "true") {
        console.log("Inside true")
        filters.debuggerId = debuggerId;
    }


    console.log("Filters in case of " + param.solvingNow + " ");
    console.log(filters);


    if (param.requested == 0||param.requested==-1) {
        doubtSchema.find(filters, function (err, data) {

            if (err)
                res.status(404).send(err);

            else return res.send(data);
        }).sort(sortOrder);

    }

    else  if(param.requested==1){

        let requested_doubts= await debuggerModel.findById(debuggerId).then((data)=>{
            console.log("data is");
            console.log(data);

           doubtSchema.find({_id: data.requestedDoubts,...filters},function(err,data){

             return res.send(data);

           }).sort(sortOrder)

        }).catch(()=>{}); 
    }








}

const viewDoubt = (req, res) => {

    let doubtId = req.params.doubtId;
    doubtSchema.findOne({ _id: doubtId }, function (err, data) {

        if (err)
            return res.status(404).send(err);

        else return res.send(data);
    });




}
const deleteDoubt = (req, res) => {

    let doubtId = req.params.doubtId;
    doubtSchema.deleteOne({ _id: doubtId }, function (err, data) {

        if (err)
        {
            console.log(err);
            return res.status(404).send(err);
        }

        else {

            // console.log()
            return  res.status(200).send("Deleted Successfully");
        }



    })

}
const editDoubt = async(req, res) => {




    let doubtId=req.params.doubtId;

    console.log("Body is :");
    console.log(req.body);

    console.log("Files are: ");
    console.log(req.files);

    let updateData = { ...req.body };


    if ( req.files.length != 0) {
        // upload new images to cloudinary and get the urls
        let files = [];

        for (let i = 0; i < req.files.length; i++) {
            let result = await uploadToCloudinary(req.files[i].path);
            console.log(result);
            files.push(result.url);
        }

        updateData={...updateData , files:files}
    }

    

    console.log(updateData);

       doubtSchema.findByIdAndUpdate(doubtId,updateData)
       .then((data)=>{
        console.log(data);
        return res.status(200).send(data);
    }
        )
       .catch((err)=>{
        console.log(err);
        return res.status(404).send(err);
    });





}


// Filters  ** START**

const statusFilterDoubts = (req, res) => {

    let status = (req.body.status == "true") ? "active" : "inactive";



    doubtSchema.find({ status: status }).exec().then((data) => { return res.send(data) }).catch((err) => { res.status(404).send(err) });



}

const filterPrice = (req, res) => {

    doubtSchema.find().sort({ price: -1 }).exec().then((data) => { return res.send(data) }).catch((err) => { res.status(404).send(err) });

}


// Filters **END**

export { addNewDoubt, getAllDoubts, viewDoubt, editDoubt, deleteDoubt, statusFilterDoubts, filterPrice };