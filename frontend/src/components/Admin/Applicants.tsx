import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import { userState } from '@/store/atoms/users'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios'
import { USER_ENDPOINT } from '@/config'
import { useParams } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { applicants } from '@/store/atoms/Application'

const Applicants = () => {
  const[applicant,setApplicant] = useRecoilState(applicants)
  const params = useParams();
  useEffect(()=>{
    const fetchApplicants = async()=>{
      try {
        const res = await axios.get(`${USER_ENDPOINT}/api/v1/user/application/getApplicants/${params.id}`,{withCredentials:true} )
         setApplicant(res.data.Jobs);
      } catch (error) {
        console.log(error);
      }
    }
   fetchApplicants();
  },[])
  return (
    <div>
      <Navbar user={userState}/>
       <div className='max-w-7xl mx-auto'>
           <h1 className='font-bold text-xl my-5'>Applicants ({applicant?.[0]?.applications?.length})</h1>
           <ApplicantsTable/>
       </div>
    </div>
  )
}

export default Applicants