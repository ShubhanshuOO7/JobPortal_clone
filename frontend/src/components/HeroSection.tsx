import React, { useState } from 'react'
import { Button } from './ui/Button'
import { Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { searchedQuery } from '@/store/atoms/jobs'

const HeroSection = () => {
  const navigate = useNavigate();
  const[searchQuery,setSearchQuery] = useRecoilState(searchedQuery);
  const [query,setQuery]  = useState("");
  const searchJobHandler = ()=>{
      setSearchQuery(query);
      navigate("/browse")
  }
  
  return (
    <div className='text-center'>
        <div className='flex flex-col gap-5 my-10'>
          <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>No. 1 Job Hunt Website</span>
          <h1 className='text-5xl font-bold'>Search, Apply & <br /> Get Your <span className='text-[#6A38c2]'>Dream Jobs</span></h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus omnis ratione nulla quibusdam dolore.</p>
          <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
            <input
            onChange={(e)=>setQuery(e.target.value)}
             type="text" 
             placeholder='Find your dream jobs'
             className='outline-none border-none w-full'/>
             <Button onClick={searchJobHandler} className='rounded-r-full bg-[#6A38c2]'>
              <Search className='h-5 w-5'/>
             </Button>
          </div>
        </div>
    </div>
  )
}

export default HeroSection