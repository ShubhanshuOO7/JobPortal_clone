import { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "@/src/components/ui/label";
import { Input } from "@/src/components/ui/input";
import { RadioGroup} from "../ui/radio-group";
import { Button } from "../ui/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_ENDPOINT } from "@/config";
import { toast } from "sonner";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "@/store/atoms/users";
import { Spinner } from "../spinner";


const Signup = () => {
  const[loading,setLoading] = useState(false);
  const[user,setUser] = useRecoilState(userState)
  const[input,setInput] = useState({
    fullName: "",
    email: "",
    phoneNumber : "",
    password: "",
    role:"",
    file: null
  });
  const navigate = useNavigate();
  useEffect(()=>{
      setUser(null);
    },[])
   const sendRequest = async(e)=>{
       e.preventDefault();
       const formdata = new FormData();
       formdata.append("fullName",input.fullName)
       formdata.append("email",input.email)
       formdata.append("phoneNumber",input.phoneNumber)
       formdata.append("password",input.password)
       formdata.append("role",input.role)
       formdata.append("file",input.file)
       try {
        setLoading(true);
        const res  = await axios.post(`${USER_ENDPOINT}/api/v1/user/signup`,formdata,{
          headers:{
              "Content-Type" : "multipart/form-data"
          },
          withCredentials : true    // used to send cookies
        })
          if(res.data.status){
            setUser(res.data.createdUser);
            toast.success(res.data.message);
            navigate("/")
          }
       } catch (error) {
         console.log(error);
         toast.error(error.response.data.message)
       }finally{
        setLoading(false);
       }
   }
   useEffect(()=>{
       if(user){
         navigate("/");
       }
     },[])
  return (
    <div>
      <div>
        <Navbar user={user}/>
      </div>
      <div className="flex justify-center max-w-7xl mx-auto">
        <form onSubmit={sendRequest} className="w-1/2 border border-gray-200 rounded-md p-4">
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>
          <div className="">
            <Label>Full Name</Label>
            <Input type="text" placeholder="Shubhanshu" onChange={(e)=>{
              setInput({
                ...input,
                fullName : e.target.value
              })
            }}/>
          </div>
          <div className="">
            <Label>Email</Label>
            <Input type="text" placeholder="shub@gmail.com" onChange={(e)=>{
              setInput({
                ...input,
                email: e.target.value
              })
            }}/>
          </div>
          <div className="">
            <Label>Phone Number</Label>
            <Input type="text" placeholder="0000000000" onChange={(e)=>{
              setInput({
                ...input,
                phoneNumber : e.target.value
              })
            }} />
          </div>
          <div className="">
            <Label>Password</Label>
            <Input type="password" placeholder="******" onChange={(e)=>{
              setInput({
                ...input,
                password : e.target.value
              })
            }} />
          </div>
          <div className="flex justify-between mt-5">
            <RadioGroup defaultValue="option-one" className="flex items-center gap-2 ">
              <div className="flex items-center space-x-2">
               <Input type="radio" value="student" name="role" className="cursor-pointer" checked={input.role=='student'} onChange={(e)=>{
                setInput({
                  ...input,
                  role : e.target.value
                })
               }}/>
               <Label htmlFor="option-one">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
               <Input type="radio" value="recruiter" name="role" className="cursor-pointer" checked={input.role=='recruiter'} onChange={(e)=>{
                setInput({
                  ...input,
                  role: e.target.value
                })
               }}/>
               <Label htmlFor="option-two">Recruiter</Label>
              </div>
            </RadioGroup>
            <div className="flex items-center gap-2">
              <Label>Profile</Label>
              <Input accept="image/*" type="file" className="cursor-pointer" onChange={(e)=>{
                setInput({
                  ...input,
                  //@ts-ignore
                  file : e.target.files[0]
                })
              }}></Input>
            </div>
          </div>
          {loading ?<Button className="w-full my-4"><Spinner/></Button>:
          <Button type="submit" className="w-full my-4">Signup</Button>}
          <span className="text-sm">Already have an account ? <Link to="/login" className="text-blue-600">Login</Link></span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
