import express,{Request,Response} from "express";
import jwt from "jsonwebtoken";
import {PrismaClient} from "@prisma/client"
import { userMiddleware } from "../middlewares/middleware";
export const userRouter = express();
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import { json } from "body-parser";
import { singleUpload } from "../middlewares/multer";
import getDataUri from "../utils/datauri";
import cloudinary from "../utils/cloudinary";
import { profile } from "console";
userRouter.use(cookieParser());
userRouter.use(express.json());
interface signupType{
  fullName: string,
  email: string,
  phoneNumber: string,
  password: string,
  role: string
}
userRouter.post("/signup",singleUpload,async (req:Request,res:Response) => {
  const { fullName, email, phoneNumber, password, role } = req.body as signupType;
  if (!fullName || !email || !phoneNumber || !password || !role) {
    return res.status(400).json({
      message: "Something is missing",
      status: false,
      });
    }
    const file = req.file;
    console.log(file);
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content ?? "") ;
    const prisma = new PrismaClient({
      datasourceUrl: process.env.DATABASE_URL,
    });
    const user = await prisma.user.findUnique({where:{email: req.body.email}});
    if(user){
      return res.status(400).json({
        message: "User already exist with this email",
        success: false
      })
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      let createdUser = await prisma.user.create({
        data: {
          fullName: req.body.fullName,
          email: req.body.email,
          phoneNumber: req.body.phoneNumber,
          password: hashedPassword,
          role: req.body.role,
          profile:{
            create:{
              profilePhoto: cloudResponse.secure_url || ""
            }
          }
        },
        include:{
          profile: true
        }
      });
     const{id,fullName,email,phoneNumber,password,role,createdAt,profile} = createdUser
      createdUser = {
        id : createdUser.id,
        fullName,
        email,
        phoneNumber,
        password,
        role,
        profile,
        createdAt: createdUser.createdAt,
      };
      const token = jwt.sign(
        {
          userId: createdUser?.id,
        },
        process.env.JWT_SECRET || "",
        {
          expiresIn: "1h",
        }
      );
      return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: "Signup Successfully ",
        status: true,
        createdUser,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Internal server error",
        status: false,
      });
    }
  }
);
userRouter.post("/login",async(req,res)=>{
  const {email,password,role} = req.body;
  if(!email || !password || !role){
    return res.json({
      message : "something is missing",
      status: false
    })
  }
  const prisma = new PrismaClient({
    datasourceUrl  : process.env.DATABASE_URL
  })
  try {
    let user = await prisma.user.findUnique({
      where:{
        email : req.body.email
      },
      include : {profile: true}
    })
    if(!user){
      return res.status(400).json({
         message : "incorrect email or password",
         status : false
      })
    }
    const passwordMatch = await bcrypt.compare(password,user.password);
    if(!passwordMatch){
      return res.status(400).json({
        message : "Incorrect email or password",
        status: false
      })
    }
    if(role != user.role){
      return res.status(400).json({
        message : "Account doesn't exist with current role",
        status: false
      })
    }
    const token = await jwt.sign({userId : user.id},process.env.JWT_SECRET || "",{expiresIn: "1h"})
    const userResponse = {
      id : user.id,
      fullName : user.fullName,
      email : user.email,
      phoneNumber : user.phoneNumber,
      role : user.role,
      profile : user.profile,
      createdAt: user.createdAt,
    }
    return res.status(200).cookie("token",token,{
      maxAge : 1*24*60*60*1000,
      httpOnly : true,
      sameSite : "strict"
    }).json({
      message : `Welcome back ${user.fullName}`,
      userResponse,
      success : true
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message : "internal server error",
      status : false
    })
  }
})
userRouter.get("/logout",async(req,res)=>{
  try {
    return res.status(200).cookie("token","",{maxAge: 0}).json({
      message : "User logged out successfully",
      status: true,
    })
  } catch (error) {
    console.log(error)    
    
  }
})
userRouter.post("/update",userMiddleware,singleUpload,async(req:Request,res:Response)=>{
  try {
    const {fullName,phoneNumber,email,bio,skills} = req.body;
    if(!fullName||!phoneNumber||!email || !bio || !skills){
      return res.status(400).json({
        message : "something is missing",
        status : false
      })
    }
    const file = req.file;
   // console.log(file);
    const fileUri = getDataUri(file);
    console.log(fileUri.content);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content ?? "");



    // cloudinary aayega idhar
    const skillsArray = skills.split(" ");

     const prisma = new PrismaClient({
      datasourceUrl  : process.env.DATABASE_URL
     })
    const user = await prisma.user.update({
      where:{
        email : req.body.email
      },
      data:{
        email : req.body.email,
        profile:{
          upsert:{
            create:{
            bio : req.body.bio,
            skills: skillsArray,
            resume : cloudResponse.secure_url,
            resumeOriginalName: file?.originalname  // it comes from multer which contain originalName
            },
            update:{
              bio : req.body.bio,
              skills: skillsArray,
              resume : cloudResponse.secure_url,
              resumeOriginalName : file?.originalname
            }
          }
        }
      },
      include:{
        profile : true
      }
    })

    const updatedResponse = {
         fullName : user.fullName,
         email : user.email,
         phoneNumber : user.phoneNumber,
         role : user.role,
         profile : user.profile,
         
         //resumes comes later here

    }
    return res.status(200).json({
      message : "Updated successfully",
      updatedResponse,
      success : true
    })
  } catch (error) {
    console.log(error)
  }
})
userRouter.get("/getAllUsers",async(req:Request,res:Response)=>{
    try {
       const prisma = new PrismaClient({
        datasourceUrl : process.env.DATABASE_URL
       })
       const users = await prisma.user.findMany({
          select:{
             fullName : true,
             email : true,
             phoneNumber : true,
             password : true,
             role : true,
             job:{
              select:{
                title : true
              }
             }
          }
       })
       if(!users){
          return res.status(401).json({
            message : "there is a problem somewhere",
            success : false
          })
       }
       return res.status(200).json({
        users,
       })
    } catch (error) {
      console.log(error)
    }
})