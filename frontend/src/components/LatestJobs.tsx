import React from 'react'
import LatestJobCards from './LatestJobCards'
import { useRecoilState } from 'recoil'
import { alljobs } from '@/store/atoms/jobs'
const LatestJobs = () => {
  const[jobs,setJobs] = useRecoilState(alljobs)
  return (
    <div className='max-w-7xl mx-auto my-20'>
       <h1 className='text-4xl font-bold'><span className='text-[#6A38C2]'>Latest & Top </span>Job Openings</h1>
       <div className='grid grid-cols-3 gap-4 my-5'>
            {jobs?.length <= 0 ? <span>No Job Available</span> : jobs?.slice(0,6).map((job)=><LatestJobCards key={job.id} job={job} />)}
       </div>
    </div>
  )
}

export default LatestJobs