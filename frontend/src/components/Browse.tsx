import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job'
import { useRecoilState, useRecoilValue } from 'recoil'
import { userState } from '@/store/atoms/users'
import { alljobs, searchedQuery } from '@/store/atoms/jobs'
import { Badge } from './ui/badge'
import { getAllJobs } from '@/hooks/getAllJobs'
// import { userLogin } from '@/store/atoms/users'
const Browse = () => {
    getAllJobs();
    const[searchQuery,setSearchQuery] = useRecoilState(searchedQuery);
    const value = useRecoilValue(userState);
    const [jobs,setJobs] = useRecoilState(alljobs)
    useEffect(()=>{
        setSearchQuery("");
    },[])
  return (
    <div>
        <Navbar user={value}/>
        <div className='max-w-7xl mx-auto my-10'>
            <h1 className='font-bold text-xl my-10'>Search Results ({jobs?.length})</h1>
            <div className='grid grid-cols-3 gap-4'>
                { jobs?.length <=0 ? (<Badge>No Jobs Available</Badge>)
                    :(jobs?.map((jobs)=>{
                        return (
                            <Job key={jobs.id} jobs={jobs}/>
                        )
                    }))
                }
            </div>
        </div>
    </div>
  )
}

export default Browse