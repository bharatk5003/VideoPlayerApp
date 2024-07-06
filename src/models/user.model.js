import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
   username:{
    type: String,
    required: true,
    unique: true,
    lowercase : true,
    trim : true,
    index: true
   },
   email:{
    type: String,
    required: true,
    unique: true,
    lowercase : true,
    trim : true,
   
   },
   fullname:{
    type: String,
    required: true,
    trim : true,
   },
   avatar:{
    type: String,  // cloudinary url
    required: true,
   },
   coverImage:{
    type: String, // cloudinary url

   },
   watchHistory:[
    {
       type: mongoose.Schema.Types.ObjectId,
       ref : 'video'
    }
   ],
   password: {
    type : String,
    required : [true,'password is required']
   },
   refreshToken :{
    type: String
   }

},{timestamps :true})

userSchema.pre("save", async function(next){
    if(!this.isModified("password"))
        return next();
     this.password = await bcrypt.hash(this.password,10);
     next();

})

userSchema.methods.isPasswordCorrect = async function(password){
   return await bcrypt.compare(password,this.password);
}
userSchema.method.generateAccessToken = async function(){
      const jwtPayload ={
         _id : this._id,
         email: this.email,
         username: this.username
      }
   return   jwt.sign(
            jwtPayload,
            process.env.ACCESS_TOKEN_SECRET,{
         expiresIn: process.env.ACCESS_TOKEN_EXPIRY
      })


}

userSchema.method.generateRefreshToken = async function(){
   const jwtPayload={
      _id: this._id,
   }
   return jwt.sign(
      jwtPayload,
      process.env.REFRESH_TOKEN_EXPIRY,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
      }
   )
}

export const User = mongoose.model('user',userSchema);