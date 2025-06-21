import { useEffect } from "react"
import axios from "axios"
import { USER_ENDPOINT } from "@/config"
import { useRecoilState } from "recoil"
import { allAdminJobs, alljobs } from "@/store/atoms/jobs"
export const getAllAdminJobs =()=>{
    const[jobs,setJobs] = useRecoilState(allAdminJobs);
    useEffect(()=>{
        try {
            const fetchAllAdminJobs = async()=>{
                const res = await axios.get(`${USER_ENDPOINT}/api/v1/user/job/getAdminJobs`,{
                    withCredentials : true,
                })
                if(res.data.success){
                    setJobs(res.data.jobs);
                }
            }
            fetchAllAdminJobs();
        } catch (error) {
            console.log(error)
        }
    },[])
}