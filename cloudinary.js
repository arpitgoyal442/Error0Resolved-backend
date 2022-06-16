import cloudinary from "cloudinary"


cloudinary.config({ 
    cloud_name: 'arpitgoyal442', 
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });


  export default cloudinary;