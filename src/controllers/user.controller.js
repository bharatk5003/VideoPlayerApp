import { asyncHandler } from "../utils/asyncHandler.js";
import { APIError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";

const generateAccessAndRefreshToken = async(userId)=>{
     try {
        const user= await User.findById(userId);
        const accessToken= user.generateAccessToken();
        const refreshToken= user.generateRefreshToken();
        
        user.refreshToken= refreshToken;
        user.save({validateBeforeSave: false});

        return {accessToken,refreshToken};

     } catch (error) {
        throw new APIError(500,"someting went wrong while generating access token");
     }
}

export const registerUser = asyncHandler ( async (req,res)=>{
    // get user info from client
    const {fullname,email,username,password}=req.body;
    // console.table([fullName,username,email,password]);
    if(fullname===""){
        throw new APIError(400,"full name is required")
    }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
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
    if(!avatar){
        throw new APIError(400,"Avatar upload failed");
    }

    const user=await User.create({
        fullname,
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

export const loginUser = asyncHandler (async (req,res)=>{
    const {username,email,password} = req.body;

    if(!username || !email){
        throw new APIError(400,"username or email is required");
    }
    const user= await User.findOne({
        $or: [{username},{email}]
    })
    if(!user){
        throw new APIError(404,"User doesn't exist");
    }

    const isPasswordValid=await user.isPasswordCorrect(password);

    if(!isPasswordValid){
        throw new APIError(401,"password is incorrect");
    }
     
    const {refreshToken,accessToken}=await generateAccessAndRefreshToken(user._id);
    
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");
    //find the user
     const options = {
        httpOnly: true,
        secure: true
     }

     return res
     .status(200)
     .cookie("accessToken",accessToken,options)
     .cookie("refreshToken",refreshToken,options)
     .json(
        new ApiResponse(200,
            {
                user: loggedInUser,
                accessToken,
                refreshToken
            },
            "user loggedIn successfully"
            )
     );
    //password check

    //access and refresh token
    
    //send cookies
})

export const logoutUser
