import React, { useState } from "react";
import { Dialog,DialogContent,DialogTitle,DialogFooter,DialogHeader,DialogDescription,} from "./ui/dialog";
import { Button } from "./ui/Button";
import { Spinner } from "./spinner";
import { Form } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "@/store/atoms/users";
import { Biohazard } from "lucide-react";
import { USER_ENDPOINT } from "@/config";
import axios from "axios";
import { toast } from "sonner";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useRecoilState(userState);

  const [input, setInput] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.map((skill) => skill) || "",
    file: user?.profile?.resume || null,
  });
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      setLoading(true);
      const res = await axios.post(
        `${USER_ENDPOINT}/api/v1/user/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        setUser(res.data.updatedResponse);
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }finally{
      setLoading(false);
    }
    setOpen(false);
  };
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="sm:max-w-[425px]"
          onInteractOutside={() => setOpen(false)}
        >
          <DialogHeader>
            <DialogTitle>Update profile</DialogTitle>
          </DialogHeader>
          <DialogDescription></DialogDescription>
          <form onSubmit={submitHandler}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="name" className="text-right">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  className="col-span-3"
                  value={input.fullName}
                  onChange={(e) =>
                    setInput({ ...input, fullName: e.target.value })
                  }
                ></input>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="email" className="text-right">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  className="col-span-3"
                  value={input.email}
                  onChange={(e) =>
                    setInput({ ...input, email: e.target.value })
                  }
                ></input>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="number" className="text-right">
                  Number
                </label>
                <input
                  id="number"
                  name="number"
                  className="col-span-3"
                  value={input.phoneNumber}
                  onChange={(e) =>
                    setInput({ ...input, phoneNumber: e.target.value })
                  }
                ></input>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="bio" className="text-right">
                  Bio
                </label>
                <input
                  id="bio"
                  name="bio"
                  className="col-span-3"
                  value={input.bio}
                  onChange={(e) => setInput({ ...input, bio: e.target.value })}
                ></input>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="skills" className="text-right">
                  Skills
                </label>
                <input
                  id="skills"
                  name="skills"
                  className="col-span-3"
                  value={input.skills}
                  onChange={(e) =>
                    setInput({ ...input, skills: e.target.value })
                  }
                ></input>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="file" className="text-right">
                  Resume
                </label>
                <input
                  id="file"
                  name="file"
                  type="file"
                  accept="application/pdf"
                  className="col-span-3"
                  onChange={(e) =>
                    setInput({ ...input, file: e.target.files?.[0] })
                  }
                ></input>
              </div>
            </div>
            <DialogFooter>
              {loading ? (
                <Button className="w-full my-4">
                  <Spinner />
                  Please wait
                </Button>
              ) : (
                <Button type="submit" className="w-full my-4">
                  Update
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateProfileDialog;
