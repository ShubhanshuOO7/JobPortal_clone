import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { userState } from '@/store/atoms/users';
import { useRecoilState } from 'recoil';
import { Button } from '../ui/Button';
import CompaniesTable from './CompaniesTable';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/src/components/ui/input';
import AdminJobsTable from './AdminJobsTable';
import { getAllAdminJobs } from '@/hooks/useGetAllAdminJobs';
import { searchJobByText } from '@/store/atoms/jobs';
const AdminJobs = () => {
  getAllAdminJobs();
  const[user,setUser] = useRecoilState(userState);
  const[input,setInput] = useState("");
  const[job,setJob] = useRecoilState(searchJobByText);
  const navigate = useNavigate();
  useEffect(()=>{
    setJob(input);
  },[input])
  return (
    <div>
      <Navbar user={user}/>
      <div className='max-w-6xl mx-auto my-10'>
        <div className='flex items-center justify-between'> 
          <Input className='w-fit' placeholder='Filter By Name' onChange={(e)=>setInput(e.target.value)} />
        <Button onClick={()=>navigate("/admin/jobs/create")}>New Jobs</Button>
        </div>
        <AdminJobsTable/>
      </div>
    </div>
  )
}

export default AdminJobs