import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './Footer'
//import { userLogin } from '@/store/atoms/users'
import { RecoilRoot, useRecoilState, useRecoilValue } from 'recoil'
import { userState } from '@/store/atoms/users'
import { getAllJobs } from '@/hooks/getAllJobs'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const[user,setUser] = useRecoilState(userState);
  const navigate = useNavigate();
  getAllJobs();
  useEffect(()=>{
    if(user?.role == "recruiter"){
      navigate("/admin/companies")
    }
  },[])
  return (
    <div>
      <Navbar user={user}/>
       <HeroSection/>
       <CategoryCarousel/>
       <LatestJobs/>
       <Footer/>
    </div>
  )
}

export default Home