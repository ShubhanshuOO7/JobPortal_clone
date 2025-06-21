import React from "react";
import { Button } from "./ui/Button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import { time } from "console";

const Job = ({jobs}) => {
  const navigate = useNavigate();
  const daysAgoFunction = (createTime)=>{
    const createdAt = new Date(createTime);
    const currentTime = new Date();
    const timeDifference = currentTime.valueOf() - createdAt.valueOf();
    return Math.floor(timeDifference/(1000*24*60*60));
  }
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100">
      <div className="flex items-center justify-between">
        <p>{daysAgoFunction(jobs?.createdAt)==0 ? "Today": `${daysAgoFunction(jobs?.createdAt)} days ago`}</p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>
      <div className="flex items-center gap-2 my-2">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={jobs?.company?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1>{jobs?.company?.companyName}</h1>
          <p>{jobs?.location}</p>
        </div>
      </div>
        <div>
          <h1 className="font-bold text-lg my-2">{jobs?.title}</h1>
          <p className="text-sm text-gray-600">{jobs?.description}</p>
        </div>
        <div className="flex items-center gap-2 mt-4">
            <Badge className="text-blue-700 font-bold" variant="outline">{jobs?.position} Positions</Badge>
            <Badge className="text-[#F83002] font-bold" variant="outline">{jobs?.jobType}</Badge>
            <Badge className="text-[#7209b7] font-bold" variant="outline">{jobs?.salary} LPA</Badge>
        </div>
        <div className="flex items-center gap-4 mt-4">
           <Button variant="outline" onClick={()=>navigate(`/description/${jobs.id}`)}>Details</Button>
           <Button className="bg-[#7209b7]">Save For Later</Button>
        </div>
    </div>
  );
};

export default Job;
