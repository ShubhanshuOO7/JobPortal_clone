import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/Button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { USER_ENDPOINT } from "@/config";
import { useRecoilState } from "recoil";
import { singleJob } from "@/store/atoms/jobs";
import { userState } from "@/store/atoms/users";
import { toast } from "sonner";
const JobDescription = () => {
    const params = useParams();
    const jobId = params.id
    const[job,setJob] = useRecoilState(singleJob);
    const [user,setUser] = useRecoilState(userState)
    const initiallyApplied = job?.applications.some(applicant => applicant?.applicantId == user?.id) || false;
     const[isApplied,setIsApplied] = useState(initiallyApplied);
    useEffect(()=>{
        const fetchSingleJob = async()=>{
            try {
                const res = await axios.get(`${USER_ENDPOINT}/api/v1/user/job/getJob/${jobId}`,{withCredentials: true});
                if(res.data.success){
                   setJob(res.data.jobs);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob();
    },[jobId,user?.id])

    const applyJobHandler = async()=>{
      try {
        const res = await axios.post(`${USER_ENDPOINT}/api/v1/user/application/applyJob/${jobId}`,{},{
          withCredentials : true,
        })
        if(res.data.success){
          setIsApplied(true);
          const updateSingleJob = {...job,applications:[...job.applications,{applicantId: user?.id}]};
          setJob(updateSingleJob);
          toast.success(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    }
  return (

    <div className="max-w-7xl mx-auto my-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl">{job?.title}</h1>
          <div className="flex items-center gap-2 mt-4">
            <Badge className="text-blue-700 font-bold" variant="outline">{job?.position}  Positions</Badge>
            <Badge className="text-[#F83002] font-bold" variant="outline"> {job?.jobType}</Badge>
            <Badge className="text-[#7209b7] font-bold" variant="outline">{job?.salary} LPA</Badge>
          </div>
        </div>
        <Button onClick={applyJobHandler} className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed':'bg-[#7209b7] hover:bg-[#5f32ad]'}`}>{isApplied ? 'Already Applied':'Apply Now'}</Button>
      </div>
      <h1 className="border-b-2 border-b-gray-300 font-medium py-4">Job Description</h1>
      <div className="my-4">
        <h1 className="font-bold my-1">Role: <span className="pl-4 font-normal text-gray-800">{job?.title}</span></h1>
        <h1 className="font-bold my-1">Location: <span className="pl-4 font-normal text-gray-800">{job?.location}</span></h1>
        <h1 className="font-bold my-1">Description: <span className="pl-4 font-normal text-gray-800">{job?.description}</span></h1>
        <h1 className="font-bold my-1">Experience: <span className="pl-4 font-normal text-gray-800">{job?.experience} years</span></h1>
        <h1 className="font-bold my-1">Salary: <span className="pl-4 font-normal text-gray-800">{job?.salary} LPA</span></h1>
        <h1 className="font-bold my-1">Total Applicants: <span className="pl-4 font-normal text-gray-800">{job?.applications?.length}</span></h1>
        <h1 className="font-bold my-1">Posted Date: <span className="pl-4 font-normal text-gray-800">{job?.createdAt.split("T")[0]}</span></h1>
      </div>
    </div>
  );
};

export default JobDescription;
