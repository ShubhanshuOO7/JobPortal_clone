import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "@/src/components/ui/label";
import { Input } from "@/src/components/ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_ENDPOINT } from "@/config";
import { toast } from "sonner";
import { Spinner } from "../spinner";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { userState } from "@/store/atoms/users";
const Login = () => {
  const[user,setUser] = useRecoilState(userState);
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  // const[logedIn,setLogedIn] = useRecoilState(userLogin)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  useEffect(()=>{
    setUser(null);
  },[])
  const sendRequest = async (e) => {
    e.preventDefault();

    try {
      setLoading(true)
  //    setLogedIn(false)
      const res = await axios.post(
        `${USER_ENDPOINT}/api/v1/user/login`,
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        setUser(res.data.userResponse)
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }finally{
      setLoading(false);
    }
  };
  useEffect(()=>{
    if(user){
      navigate("/");
    }
  },[])
  //1. key Takeaways in navbar
  return (
    <div>
      <div>
        <Navbar user={user}/>
      </div>
      <div className="flex justify-center max-w-7xl mx-auto">
        <form action="" className="w-1/2 border border-gray-200 rounded-md p-4">
          <h1 className="font-bold text-xl mb-5">Login</h1>
          <div className="">
            <Label>Email</Label>
            <Input
              type="text"
              placeholder="shub@gmail.com"
              onChange={(e) => {
                setInput({
                  ...input,
                  email: e.target.value,
                });
              }}
            />
          </div>
          <div className="">
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="******"
              onChange={(e) => {
                setInput({
                  ...input,
                  password: e.target.value,
                });
              }}
            />
          </div>
          <div className="flex justify-between mt-5">
            <RadioGroup
              defaultValue="option-one"
              className="flex items-center gap-2 "
            >
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  value="student"
                  name="role"
                  className="cursor-pointer"
                  checked={input.role == "student"}
                  onChange={(e) => {
                    setInput({
                      ...input,
                      role: e.target.value,
                    });
                  }}
                />
                <Label htmlFor="option-one">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  value="recruiter"
                  name="role"
                  className="cursor-pointer"
                  checked={input.role == "recruiter"}
                  onChange={(e) => {
                    setInput({
                      ...input,
                      role: e.target.value,
                    });
                  }}
                />
                <Label htmlFor="option-two">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          {
            loading ? <Button className="w-full my-4"><Spinner/></Button>
          :
          <Button className="w-full my-4" onClick={sendRequest}>
            Login
          </Button>}
          <span className="text-sm">
            Dont have an account ?{" "}
            <Link to="/Signup" className="text-blue-600">
              Signup
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
