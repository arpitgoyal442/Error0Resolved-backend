
import cloudinary from "cloudinary"
import fs from "fs"



cloudinary.config({
  cloud_name: 'arpitgoyal442',
  api_key: "887291296563983",
  api_secret:"0zO7I21DbKzic_EV-G_7gXjGQXo"
});


async function uploadToCloudinary(localFilePath) {
  var filePathOnCloudinary =
    "main" + "/" + localFilePath;

  return cloudinary.uploader.upload(localFilePath, { public_id: filePathOnCloudinary }).then((result) => {

    // remove that file from local storage now --As we dont need that
    fs.unlinkSync(localFilePath);
    return {
      message: "Success",
      url: result.url,
    };

  }).catch((error) => {

    // Remove file from local uploads folder
    fs.unlinkSync(localFilePath);
    return { message: "Fail" };
  });
}


export default uploadToCloudinary;