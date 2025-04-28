import express,{Request,Response} from "express"
export const applyRouter = express();
import { userMiddleware } from "../middlewares/middleware";
import { Prisma, PrismaClient } from "@prisma/client";
applyRouter.use(userMiddleware)
interface customRequest extends Request{
    id? : Number
}
applyRouter.post("/applyJob/:id",async(req:customRequest,res:Response)=>{
     try {
        const userId = req.id;
        const jobId = req.params.id;
        if(!jobId){
            return res.status(400).json({
                message : "Job Id is required",
                success : false
            })
        }
        const prisma = new PrismaClient({
            datasourceUrl : process.env.DATABASE_URL
        })
        const existingApplication = await prisma.applications.findFirst({
            where:{
                job:{
                    some:{
                        id : Number(jobId)    // we use some to check the array of related id
                    }
                },
                applicant:{
                    id : Number(userId)       // and applicant is not a array relation that why we use normally
                }
            }
        })
        if(existingApplication){
            return res.status(400).json({
                message : "You have already applied for this jobs",
                success : false
            })
        }
        const job = await prisma.job.findFirst({
            where:{
                id : Number(jobId)
            }
        })
        if(!job){
            return res.status(400).json({
                message : "Job not found",
                success : false
            })
        }
        const newApplication = await prisma.applications.create({
            data:{
                job:{
                    connect : {id : Number(jobId)}
                },
                applicantId : Number(userId)
            }
        })
        return res.status(201).json({
            message : "job applied successfully",
            success : true
        })
     } catch (error) {
        console.log(error)
     }
})
applyRouter.get("/getAppliedJobs",async(req:customRequest,res:Response)=>{
    try {
        const userId = req.id
        const prisma = new PrismaClient({
            datasourceUrl : process.env.DATABASE_URL
        })
        const application = await prisma.applications.findMany({
            where:{
                id : Number(userId)
            },
            include:{
                job : {
                    include : {
                        company : true
                    }
                }
            },
            
        })
        if(!application){
            return res.status(404).json({
                message : "No Applications",
                success : false
            })
        }
        return res.status(200).json({
            application,
            success : true
        })
    } catch (error) {
        console.log(error)
    }
})
// admin dekhega kitne users ne apply kiya hain
applyRouter.get("/getApplicants/:id",async(req:Request,res:Response)=>{
    try {
        const jobId = req.params.id
        const prisma = new PrismaClient({
            datasourceUrl : process.env.DATABASE_URL
        })
        const Jobs = await prisma.job.findMany({
            where:{
                id : Number(jobId)
            },
            include:{                       // getting value of users by job -> applications -> applicant
                applications : {
                    include : {
                        applicant : true
                    }
                }
            }
        })
        if(!Jobs){
            return res.status(400).json({
                meesage : "Jobs not found",
                success : false
            })
        }
        return res.status(200).json({
            Jobs,
            successs : true
        })
    } catch (error) {
        console.log(error)
    }
})
applyRouter.put("/updateStatus/:id",async(req:Request,res:Response)=>{
    try {
        const status = req.body
        const applicantId = req.params.id
        const prisma = new PrismaClient({
            datasourceUrl : process.env.DATABASE_URL
        })
        const application = await prisma.applications.findFirst({
            where:{
                id : Number(applicantId)
            }
        })
        if(!application){
            return res.status(404).jsonp({
                message : "Application not found",
                success : false
            })
        }
        application.status =  status.toString().toLowerCase();
        return res.status(200).json({
            message : "Status updated successfully",
            suucess : true,
            application
        })
    } catch (error) {
        console.log(error)
    }
})