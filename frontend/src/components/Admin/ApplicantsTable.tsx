import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react"; // Removed duplicate MoreHorizontalIcon
import { applicants } from "@/store/atoms/Application";
import { useRecoilValue } from "recoil";
import axios from "axios";
import { USER_ENDPOINT } from "@/config";
import { toast } from "sonner";

const shortListStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const application = useRecoilValue(applicants);
  const statusHandler = async(status,id)=>{
     try {
      axios.defaults.withCredentials = true;
      const res = await axios.put(`${USER_ENDPOINT}/api/v1/user/application/updateStatus/${id}`,{status},)
        if(res.data.success){
          console.log(res.data);
          toast.success(res.data.message);
        }
     } catch (error) {
      toast.error(error.response.data.message);
     }
  }
  return (
    <div>
      <Table>
        <TableCaption>A list of your recent applied users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>FullName</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {application &&
            application[0]?.applications.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item?.applicant?.fullName}</TableCell>
                <TableCell>{item?.applicant?.email}</TableCell>
                <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                <TableCell className="text-blue-600 cursor-pointer">
                  {
                    item?.applicant?.profile?.resume ? <a href={item?.applicant?.profile?.resume}>{item?.applicant?.profile?.resumeOriginalName}</a> : <span>NA</span>
                  }
                  </TableCell>
                <TableCell>Date</TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      {shortListStatus.map((status, index) => (
                        <div key={index} onClick={()=>statusHandler(status,item.id)} className="flex w-fit items-center my-2 cursor-pointer">
                          <span>{status}</span>
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
