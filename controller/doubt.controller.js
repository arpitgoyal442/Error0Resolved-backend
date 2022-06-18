import uploadToCloudinary from "../cloudinary.js";

const addNewDoubt=async (req,res)=>{

    console.log(req.files);
    console.log(req.body);

    for(let i=0;i<req.files.length;i++)
    {
         let result= await uploadToCloudinary(req.files[0].path);
         console.log(result.url);
    }


    res.send("Successfull");


}


const getAllDoubts=(req,res)=>{

}

const viewDoubt=()=>{

}
const deleteDoubt=()=>{
    
}
const editDoubt=()=>{
    
}

export {addNewDoubt,getAllDoubts,viewDoubt,editDoubt,deleteDoubt};