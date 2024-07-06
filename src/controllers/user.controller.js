import { asyncHandler } from "../utils/asyncHandler.js";

export const registerUser = asyncHandler ( async (req,res)=>{
    res.status(200).json({
        message: "ok"
    })
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