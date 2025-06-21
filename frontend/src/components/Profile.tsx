import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/Button";
import { Badge } from "./ui/badge";
import {Label} from "./ui/label"
import { Contact, Mail, Pen } from "lucide-react";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "@/store/atoms/users";
import getAppliedJob from "@/hooks/useGetAppliedJob";
const isResume = true;

// const skills = ["html", "css", "javascript", "ReactJs"];

const Profile = () => {
  getAppliedJob();
  const [open, setOpen] = useState(false);
  const[user,setUser] = useRecoilState(userState)
  return (
    <div>
      <Navbar user={user} />
      <div className="max-w-4xl mx-auto border border-gray-200 my-5 p-8 rounded-2xl">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src="https://img.freepik.com/free-psd/gradient-versus-logo-template_23-2151514112.jpg?uid=R188403679&ga=GA1.1.600540950.1740112399&semt=ais_hybrid" />
            </Avatar>
            <div>
              <h1 className="text-xl font-medium">{user?.fullName}</h1>
              <p>
                {user?.profile?.bio}
              </p>
            </div>
          </div>
          <Button variant={"outline"} onClick={()=>setOpen(true)}>
            <Pen />
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>
        <div className="my-5">
          <h1>Skills</h1>
          <div className="flex items-center gap-1">
            {user?.rofile?.skills.length !== 0 ? (
              user?.profile?.skills.map((item, index) => <Badge key={index}>{item}</Badge>)
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label className="text-md font-bold">Resume</Label>
            {
              user?.profile?.resume ? <a target="blank" href={user?.profile?.resume} className="text-blue-500 w-full hover:underline">{user?.profile?.resumeOriginalName}</a> : <span>NA</span>
            }
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl p-4">
        <h1 className="text-2xl font-bold">Applied Jobs</h1>
        <AppliedJobTable />
      </div>
        <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
