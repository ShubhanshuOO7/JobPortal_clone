import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { allCompanies, searchCompanyByText } from "@/store/atoms/company";
import React, { useEffect, useState } from "react";
import { constSelector, useRecoilState, useRecoilValue } from "recoil";
import {Table,TableBody,TableCaption,TableCell,TableHead,TableHeader,TableRow,} from "../ui/table";
import { useNavigate } from "react-router-dom";
import { allAdminJobs, searchJobByText } from "@/store/atoms/jobs";
const AdminJobsTable = () => {
  const navigate = useNavigate();
  const [company, setCompany] = useRecoilState(allCompanies);    
  const adminJobs = useRecoilValue(allAdminJobs)
   const searchJob = useRecoilValue(searchJobByText);
   const[filterJobs,setFilterJobs] = useState(adminJobs);
   useEffect(()=>{
     const filteredJobs = adminJobs?.length > 0 && adminJobs.filter((job)=>{
        if(!searchJob){
          return true
         }
        return job?.title?.toLowerCase().includes(searchJob.toLowerCase()) || job?.company?.companyName.toLowerCase().includes(searchJob.toLowerCase())
      }) || []

    setFilterJobs(filteredJobs);
  },[company,searchJob,adminJobs])
  return (
    <div>
      <Table>
        <TableCaption>A list of your recent Posted Jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {adminJobs?.length <= 0 ? (
            <TableRow>
              <TableCell colSpan={4}>You haven't registered any job yet</TableCell>
            </TableRow>
          ) : (
            filterJobs?.map((job) => (
              <TableRow key={job.id}>
                <TableCell>{job?.company?.companyName}</TableCell>
                <TableCell>{job?.title}</TableCell>
                <TableCell>{job.createdAt.split("T")[0]}</TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div onClick={()=>navigate(`/admin/companies/${job.id}`)} className="flex items-center gap-2 w-fit cursor-pointer">
                        <Edit2 className="w-4"/>
                        <span>Edit</span>
                        </div>
                        <div onClick={()=>navigate(`/admin/jobs/${job.id}/applicants`)} className="flex items-center w-fit gap-2 cursor-pointer mt-2">
                           <Eye className="w-4"/>
                           <span>Applicants</span>
                        </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
