import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { userState } from "@/store/atoms/users";
import { Label } from "../ui/label";
import { Input } from "@/src/components/ui/input";
import { Button } from "../ui/Button";
import { useRecoilState, useRecoilValue } from "recoil";
import { allCompanies } from "@/store/atoms/company";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { USER_ENDPOINT } from "@/config";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const [companies,setCompanies] = useRecoilState(allCompanies)
  const selectChangeHandler =(value)=>{
      const selectedCompany = companies.find((company)=>company?.companyName.toLowerCase()==value)
      setInput({...input,companyId:selectedCompany.id})
  }
  const submitHandler = async(e)=>{
      e.preventDefault();
      setLoading(true)
      try {
        const res = await axios.post(`${USER_ENDPOINT}/api/v1/job/jobPost`,input,{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials: true
        })
        if(res.data.success){
            toast.success(res.data.message);
            navigate("/admin/jobs")
        }
      } catch (error) {
        toast.error(error.response.data.meessage);
      }
      finally{
        setLoading(false);
      }
  }
  return (
    <div>
      <Navbar user={userState} />
      <div className="flex items-center justify-center w-screen my-5">
        <form onSubmit={submitHandler} className="p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                onChange={(e) => {
                  setInput({
                    ...input,
                    title: e.target.value,
                  });
                }}
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                onChange={(e) => {
                  setInput({
                    ...input,
                    description: e.target.value,
                  });
                }}
              />
            </div>
            <div>
              <Label>Requirements</Label>
              <Input
                type="text"
                name="requirements"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                onChange={(e) => {
                  setInput({
                    ...input,
                    requirements: e.target.value,
                  });
                }}
              />
            </div>
            <div>
              <Label>Salary</Label>
              <Input
                type="text"
                name="salary"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                onChange={(e) => {
                  setInput({
                    ...input,
                    salary: e.target.value,
                  });
                }}
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                onChange={(e) => {
                  setInput({
                    ...input,
                    location: e.target.value,
                  });
                }}
              />
            </div>
            <div>
              <Label>JobType</Label>
              <Input
                type="text"
                name="jobType"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                onChange={(e) => {
                  setInput({
                    ...input,
                    jobType: e.target.value,
                  });
                }}
              />
            </div>
            <div>
              <Label>Experience Level</Label>
              <Input
                type="text"
                name="experience"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                onChange={(e) => {
                  setInput({
                    ...input,
                    experience: e.target.value,
                  });
                }}
              />
            </div>
            <div>
              <Label>No Of Position</Label>
              <Input
                type="number"
                name="position"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                onChange={(e) => {
                  setInput({
                    ...input,
                    position: Number(e.target.value),
                  });
                }}
              />
            </div>
            {companies.length > 0 && (
              <Select onValueChange={selectChangeHandler}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={"Select a company"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {companies.map((company) => {
                      return (
                        <SelectItem
                          value={company?.companyName.toLowerCase()}
                          key={company.id}
                        >
                          {company?.companyName}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          </div>
          {
            loading ? <Button className="w-full mt-4"><Loader2 className="mr-2 h-4 w-4 animate-spin">Please Wait</Loader2></Button> : <Button className="w-full mt-4">Post New Job</Button>
          }
          {companies.length == 0 && (
            <p className="text-xs text-red-600 font-bold text-center my-3">
              *Please register a company First, before posting a jobs
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostJob;
