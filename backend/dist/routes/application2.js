"use strict";
/* 1.apply job
 2. getAppliedjobs
 3. get Applicants/:id
 4. updateStatus/;id
 
import express,{Request,Response} from "express"
import { userMiddleware } from "../middlewares/middleware";
import { PrismaClient } from "@prisma/client";
export const applyRouter = express();
applyRouter.use(userMiddleware)
interface customRequest extends Request{
    id? : Number
}
const prisma = new PrismaClient({
    datasourceUrl : process.env.DATABASE_URL
})
applyRouter.post("/applyJob/:id",async(req:customRequest,res:Response)=>{
    try {
        const userId = req.id
        const jobId = req.params.id
        if(!jobId){
            return res.status(401).json({
                meesage : "job id is requires"
            })
        }
        const applica
    } catch (error) {
        console.log(error)
    }
})
*/ 
