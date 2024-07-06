import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath)=>{
    try {
        if(!localFilePath) return null;
    //   console.table([cloud_name,api_key,api_secret]);
    // console.log(cloudinary.config());
     const response= await  cloudinary.uploader.upload(localFilePath,{
            resource_type: "auto"
        })
       console.log("File is uploaded on cloudinary");
       fs.unlinkSync(localFilePath)
       return response

    } catch (error) {
        fs.unlinkSync(localFilePath)
        console.log("Error in Upload: ",error);
        return null;
        
    }
}

export {uploadOnCloudinary}