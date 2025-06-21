import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "@/store/atoms/users";
import { alljobs, searchedQuery } from "@/store/atoms/jobs";
import { motion } from "framer-motion";
// import { userLogin } from "@/store/atoms/users";
const Jobs = () => {
 const value = useRecoilValue(userState)
 const jobs = useRecoilValue(alljobs);
 
 const searchQuery = useRecoilValue(searchedQuery);
 const [filterJobs,setFilterJobs] = useState(jobs);

 useEffect(()=>{
  if(searchQuery){

    const filteredJobs = jobs?.filter((job)=>{
      return job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      job.description.toLowerCase().includes(searchQuery.toLowerCase()) || 
      job.location.toLowerCase().includes(searchQuery.toLowerCase())
    })
    setFilterJobs(filteredJobs);
  }else{
    setFilterJobs(jobs);
  }
 },[jobs,searchQuery])
 
  return (
    <div>
      <Navbar user={value}/>
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-[20%]">
            <FilterCard />
          </div>
          {filterJobs?.length <= 0 ? (
            <span>Jobs not Found</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {filterJobs?.map((jobs) => (
                  <motion.div initial={{opacity:0 , x:100}} 
                  animate={{opacity:1 , x:0}} 
                  exit={{opacity:0 , x:-100}} 
                  transition={{duration: 0.3}}
                  key={jobs.id}>
                    <Job jobs={jobs}/>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
