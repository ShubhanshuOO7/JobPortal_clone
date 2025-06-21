import { USER_ENDPOINT } from "@/config";
import axios from "axios";
import React, { useEffect, useState } from 'react'
import { useRecoilState } from "recoil"; 
    import { allAppliedJobs } from "@/store/atoms/jobs";
const useGetAppliedJob = () => {
  const[appliedJobs,setAppliedJobs] = useRecoilState(allAppliedJobs)
  return (
    useEffect(()=>{
        const fetchAppliedJobs = async()=>{
            try {
                const res = await axios.get(`${USER_ENDPOINT}/api/v1/user/application/getAppliedJobs`,{
                    withCredentials : true,
                })
                if(res.data.success){
                    setAppliedJobs(res.data.application);
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchAppliedJobs();
    },[])
  )
}

export default useGetAppliedJob