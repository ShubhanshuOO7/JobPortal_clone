import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { userState } from '@/store/atoms/users'
import { useRecoilState } from 'recoil';
import { Button } from '../ui/Button';
import CompaniesTable from './CompaniesTable';
import { useNavigate } from 'react-router-dom';
import { getAllCompany } from '@/hooks/getAllCompany';
import { Input } from '@/src/components/ui/input';
import { searchCompanyByText } from '@/store/atoms/company';
const Companies = () => {
  getAllCompany();
  const[user,setUser] = useRecoilState(userState);
  const[input,setInput] = useState("");
  const[company,setCompany] = useRecoilState(searchCompanyByText);
  const navigate = useNavigate();
  useEffect(()=>{
    setCompany(input);
  },[input])
  return (
    <div>
      <Navbar user={user}/>
      <div className='max-w-6xl mx-auto my-10'>
        <div className='flex items-center justify-between'> 
          <Input className='w-fit' placeholder='Filter By Name' onChange={(e)=>setInput(e.target.value)} />
        <Button onClick={()=>navigate("/admin/companies/create")}>New Company</Button>
        </div>
        <CompaniesTable/>
      </div>
    </div>
  )
}

export default Companies