import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Button } from '../ui/Button'
import { useNavigate } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { userState } from '@/store/atoms/users'
import axios from 'axios'
import { USER_ENDPOINT } from '@/config'
import {toast} from "sonner"
import { Toast } from '../ui/toast'
import { singleCompany } from '@/store/atoms/company'
import { Input } from '@/src/components/ui/input'

const CompanyCreate = () => {
    const user = useRecoilValue(userState)
    const [company,setCompany] = useRecoilState(singleCompany)
    const [companyName,setCompanyName] = useState("");
    const navigate = useNavigate();
    const registerNewCompany = async ()=>{
        try {
            const res = await axios.post(`${USER_ENDPOINT}/api/v1/company/registration`,{companyName},{
                headers:{
                    "Content-Type": 'application/json'
                },
                withCredentials: true
            })
            if(res.data.success){
                setCompany(res?.data?.company);
                toast.success(res.data.message);
                const companyId = res?.data?.company?.id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    }
  return (
    <div>
        <Navbar user={user}/>
        <div className="max-w-4xl mx-auto">
            <div className='my-10'>
                 <h1 className='font-bold text-2xl'>Your Company Name</h1>
                 <p className='text-gray-500'>What would you like to give your company name?</p>
            </div>
            <div className='flex flex-col my-4'>
            <Label>Company name</Label>
            <Input type='text' className='my-2 py-1' placeholder='Microsof India etc.' onChange={(e)=>setCompanyName(e.target.value)}/>
            </div>
            <div className='flex items-center gap-2 my-10'>
                 <Button variant="outline" onClick={()=>navigate("/admin/companies")}>Cancel</Button>
                 <Button onClick={registerNewCompany}>Continue</Button>
            </div>
        </div>
    </div>
  )
}

export default CompanyCreate