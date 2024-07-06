import { asyncHandler } from "../utils/asyncHandler.js";
import { APIError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";


export const registerUser = asyncHandler ( async (req,res)=>{
    // get user info from client
    const {fullName,email,username,password}=req.body;
    // console.table([fullName,username,email,password]);
    if(fullName===""){
        throw new APIError(400,"full name is required")
    }

  const existedUser= await User.findOne({
        $or:[{username},{email}]
    })
    if(existedUser){
        throw new APIError(409,"user already existing")
    }
    const avatarLocalPath= req.files?.avatar[0]?.path;
    const coverImageLocalPath= req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new APIError(400,"Avatar file is required");
    }

    const avatar=await uploadOnCloudinary(avatarLocalPath);
    const coverImage= await uploadOnCloudinary(coverImageLocalPath);
    //check if user already exist(validation)
    if(avatar){
        throw new APIError(400,"Avatar upload failed");
    }

    const user=await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })
    
    const createduser= await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if(!createduser){
        throw new APIError(500,"something went wrong while registering the user");
    }

    return res.status(201).json(
        new ApiResponse(200,createduser,"user register successfully")
    )

    //check for images and avtar

    //upload them to clodineryNam

    //create user object-- create entry in db

    //remove password and refresh token field

    //check for user creation


})

export const loginUser = async (req,res)=>{
    console.log("we are in login");
    res.send({});
}
export const getUser = (req,res)=>{
    console.log("get user controller");
    res.send({
        message: "ok"
    })
}