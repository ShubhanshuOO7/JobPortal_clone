import { useEffect } from "react"
import axios from "axios"
import { USER_ENDPOINT } from "@/config"
import { useRecoilState, useRecoilValue } from "recoil"
import { alljobs, searchedQuery } from "@/store/atoms/jobs"
export const getAllJobs =()=>{
    const searchQuery = useRecoilValue(searchedQuery);
    const[jobs,setJobs] = useRecoilState(alljobs);
    useEffect(()=>{
        try {
            const fetchAllJobs = async()=>{
                const res = await axios.get(`${USER_ENDPOINT}/api/v1/job/get?keyword=${searchQuery}`,{
                    withCredentials : true,
                })
                if(res.data.success){
                    setJobs(res.data.jobs);
                }
            }
            fetchAllJobs();
        } catch (error) {
            console.log(error)
        }
    },[])
}