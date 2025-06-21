import React from "react";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Popover, PopoverContent, PopoverTrigger,} from "@radix-ui/react-popover";
import { Button } from "../ui/Button";
import { Link,useNavigate } from "react-router-dom";
import {LogOut, User2 } from "lucide-react";
import axios from "axios";
import { USER_ENDPOINT } from "@/config";
import { useRecoilState } from "recoil";
import { userState } from "@/store/atoms/users";
import { toast } from "sonner";
const Navbar = ({user}) => {
  const[person,setPerson]  = useRecoilState(userState)
  const navigate = useNavigate();
  const LogOutHandler = async()=>{
      try {
        const res = await axios.get(`${USER_ENDPOINT}/api/v1/user/logout`,{
          withCredentials: true
        })
        if(res.data.status){
             setPerson(null);
             navigate("/");
             toast.success(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
  }
  return (
    <div>
      <div className="flex justify-between items-center mx-auto max-w-7xl h-16">
        <div className="text-xl">
          Job <span className="text-red-700">Portal</span>
        </div>
        <div className="flex items-center gap-5">
          <ul className="flex items-center font-medium gap-5">
            {
                 person && person.role == 'recruiter' ? (
                  <>
                  <Link to="/admin/companies"><li>Companies</li></Link>
                  <Link to="/admin/jobs"><li>Jobs</li></Link>
                  </>
                 ):(
                  <>
                   <Link to="/"><li>Home</li></Link>
                   <Link to="/jobs"><li>Jobs</li></Link>
                   <Link to="/browse"><li>Browse</li></Link>
                   </>)
            }
            
          </ul>
          {
            !person ? (
              <div className="flex items-center gap-2">
                <Link to="/login"><Button variant="outline">Login</Button></Link>
                <Link to="/signup"><Button className="bg-[#6A38c2] hover:bg-[#5b30a6]">Signup</Button></Link>
              </div>
            ):(
          <Popover>
            <PopoverTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage
                  className="rounded-full w-10"
                  src={person?.profile?.profilePhoto ? person?.profile?.profilePhoto : "https://github.com/shadcn.png"}
                  alt="@shadcn"
                />
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-80 mt-4 p-5 shadow-lg border-gray-300">
              <Avatar className="cursor-pointer">
                <div className="flex gap-4">
                  <AvatarImage
                    className="rounded-full w-10"
                    src={person?.profile?.profilePhoto ? person?.profile?.profilePhoto : "https://github.com/shadcn.png"}
                    alt="@shadcn"
                  />
                  <div className="flex items-center flex-col">
                    <h4 className="font-medium">{person?.fullName}</h4>
                    <p className="text-sm text-muted-foreground">
                      {person?.profile?.bio}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col text-gray-600">
                  {
                    person.role == 'student' &&  
                  <div className="flex w-fit gap-2 cursor-pointer items-center mt-4">
                    <User2 />
                    <Button variant="link"><Link to="/profile">Profile</Link></Button>
                  </div>
                  }
                  <div className="flex w-fit gap-2 cursor-pointer items-center mt-4">
                    <LogOut />
                    <Button variant="link" onClick={LogOutHandler}>Logout</Button>
                  </div>
                </div>
              </Avatar>
            </PopoverContent>
          </Popover>)
}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
