import { PrismaClient } from '@prisma/client';
import express,{request, Request,Response} from 'express'
export const jobRouter = express();
import { userMiddleware } from '../middlewares/middleware';
jobRouter.use(express.json());
jobRouter.use(userMiddleware);
interface jobPost{
    title : string,
    description : string,
    requirements : string
    salary : number,
    location : string,
    jobType : string,
    experience : number,
    position : string
    companyId : number
}
interface customRequest extends Request{
   id? : number
}
//admin
jobRouter.post("/jobPost",userMiddleware,async(req:customRequest,res:Response)=>{
    try{
    const {title,description,requirements,salary,location,jobType,experience,position,companyId} = req.body as jobPost
    const userId = req.id
    if(!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId){
        return res.status(400).json({
            message : "Something is missing",
            success : false
        })
    }
    const prisma = new PrismaClient({
        datasourceUrl : process.env.DATABASE_URL
    })
    const job = await prisma.job.create({
        data:{
            title,
            description,
            requirements,
            salary : Number(salary),
            location,
            jobType,
            experience : Number(experience),
            position : Number(position),
            companyId  : Number(companyId),
            createdBy : Number(userId)
        }
    })
    return res.json({
        message : "New job created successfully",
        success : true,
        job
    })
}catch(error){
    console.log(error)
}
})
//students ke liye
jobRouter.get("/get",async(req:Request,res:Response)=>{
    try {
        const keyword = req.query.keyword as string || ""
        const prisma = new PrismaClient({
            datasourceUrl : process.env.DATABASE_URL
        })
         const jobs = await prisma.job.findMany({
      where: keyword
        ? {
            OR: [
              {
                title: {
                  contains: keyword,
                  mode: "insensitive",
                },
              },
              {
                description: {
                  contains: keyword,
                  mode: "insensitive",
                },
              },
            ],
          }
        : {}, // return all if no keyword
      include: {
        company: true,
      },
    });
        if(!jobs){
            return res.status(401).json({
                message : "Jobs not found",
                success : false
            })
        }
        return res.status(200).json({
            jobs,
            success : true
        })
    } catch (error) {
        console.log(error)
    }
})
jobRouter.get("/getJob/:id",async(req:Request,res:Response)=>{
    try {
        const jobId = req.params.id;
        const prisma = new PrismaClient({
            datasourceUrl : process.env.DATABASE_URL
        })
        const jobs = await prisma.job.findFirst({
            where:{
                id : Number(jobId)
            },
           include:{
              applications : true
           }
        })
        if(!jobs){
            return res.status(401).json({
                message : "jobs not found",
                success : false
            })
        }
        return res.status(200).json({jobs,success:true})
    } catch (error) {
        console.log(error)
    }
})
// admin ne kitne job create kare hain abhi tak
jobRouter.get("/getAdminJobs",async(req:customRequest,res:Response)=>{
    try {
        const adminId = req.id;
        const prisma = new PrismaClient({
            datasourceUrl : process.env.DATABASE_URL
        })
        const jobs = await prisma.job.findMany({
            where:{
                createdBy : Number(adminId)
            },
            include:{
                company: true
            }
        })
        if(!jobs){
            return res.status(401).json({
                message : "Jobs nott found",
                success : false
            })
        }
        return res.status(200).json({
            jobs,
            success : true
        })
    } catch (error) {
        console.log(error)
    }
})