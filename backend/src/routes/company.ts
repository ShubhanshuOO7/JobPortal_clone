import { userMiddleware } from '../middlewares/middleware';
import { Prisma, PrismaClient } from '@prisma/client';
import { json } from 'body-parser';
import cookieParser from 'cookie-parser';
import express,{Request,Response} from 'express'
 export const companyRouter = express();
companyRouter.use(express.json());
companyRouter.use(cookieParser());
companyRouter.use(userMiddleware)
interface customId extends Request{
    id? : number
}
companyRouter.post('/registration',userMiddleware,async(req:customId,res:Response)=>{
   try {
    const {companyName} = req.body
    if(!companyName){
        return res.status(400).json({
            message : "Company name is required",
            status : false
        })
    }
    const prisma = new PrismaClient({
        datasourceUrl : process.env.DATABASE_URL,
    })
    const existingcompany = await prisma.company.findUnique({
        where:{
            companyName : req.body.companyName
        }
    })
    if(existingcompany){
        return res.status(400).json({
            message : "You can't register the same company",
        })
    }
    let company = await prisma.company.create({
    data:{
        companyName : companyName,
        userId : req.id as number
    }
   })
   return res.status(201).json({
      message : "Company registered successfully",
      company,
      success: true
   })
   } catch (error) {
    console.log(error)
   }
})

interface customRequest extends Request{
    id?: number
}
companyRouter.get('/get',userMiddleware,async(req:customRequest,res:Response)=>{
    try {
        const userId = req.id
        const prisma = new PrismaClient({
            datasourceUrl : process.env.DATABASE_URL
        })
        const companies = await prisma.company.findMany({
            where:{
                userId : userId
            }
        })
        if(!companies){
            return res.status(404).json({
                message : "Companies not found",
                success : false
            })
        }
        return res.status(200).json({
            companies,
            success : true
        })
    } catch (error) {
        console.log(error)
    }
})
interface Params{
    id : Number
}
companyRouter.get('/getById/:id',async(req:Request<Params>,res)=>{
    try {
        const companyId = req.params.id;
        const prisma = new PrismaClient({
            datasourceUrl : process.env.DATABASE_URL
        })
        const company = await prisma.company.findFirst({
            where:{
                id : Number(companyId)
            }
        })
        if(!company){
            return res.status(404).json({
                message : "Company not found",
                success : false
            })
        }
        return res.status(200).json({
            company,
            success : true
        })
    } catch (error) {
        console.log(error)
    }
})
interface update{
    id? : number
}
companyRouter.put('/update/:id',async(req:Request<update>,res)=>{
    const {companyName,description,website,location} = req.body
  //  const file = req.file;
    // idhar cloudinary aayega
    const userId = req.params.id
    if(!companyName && !description && !website && !location){
        return res.json({
            message : "Something is missing",
            success : false
        })
    }
    const prisma = new PrismaClient({
        datasourceUrl : process.env.DATABASE_URL
    })
    const company = await prisma.company.updateMany({
        where:{
           userId : Number(userId)  
        },
        data:{
           companyName : req.body.companyName,
           descriptions : req.body.descriptions,
           website : req.body.website,
           location : req.body.location
        }
    })
    if(!company){
        return res.status(404).json({
            message : "Company not found",
            success : false
        })
    }
    return res.status(200).json({
        message : "Company information updated",
        success : true
    })
})