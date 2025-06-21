import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { useRecoilValue } from "recoil";
import { userState } from "@/store/atoms/users";
import { Button } from "../ui/Button";
import { ArrowLeft } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "@/src/components/ui/input";
import { USER_ENDPOINT } from "@/config";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { read } from "fs";
import { singleCompany } from "@/store/atoms/company";
import useGetCompanyById from "@/hooks/useGetCompanyById";
import { Spinner } from "../spinner";
export const CompanySetup = () => {
  const params = useParams();
  useGetCompanyById(params.id);
  const company = useRecoilValue(singleCompany);
  const user = useRecoilValue(userState);
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });
  const [loading, setLoading] = useState(false);
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }
    console.log(input);
    try {
      setLoading(true);
      const res = await axios.put(
        `${USER_ENDPOINT}/api/v1/user/company/update/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.message(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setInput({
      name: company?.companyName || "",
      description: company?.descriptions || "",
      website: company?.website || "",
      location: company?.location || "",
      file: company?.file || null,
    });
  }, [company]);
  return (
    <div>
      <Navbar user={user} />
      <div className="max-w-xl mx-auto my-10">
        <form onSubmit={submitHandler}>
          <div className="flex items-center gap-5 p-8">
            <Button
              onClick={() => navigate("/admin/companies")}
              variant="outline"
              className="flex items-center gap-2 text-gray-500 font-semibold"
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-xl">Company setup</h1>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Company Name</Label>
              <Input
                value={input.name}
                type="text"
                onChange={(e) => {
                  setInput({
                    ...input,
                    name: e.target.value,
                  });
                }}
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                value={input.description}
                type="text"
                onChange={(e) => {
                  setInput({
                    ...input,
                    description: e.target.value,
                  });
                }}
              />
            </div>
            <div>
              <Label>Website</Label>
              <Input
                value={input.website}
                type="text"
                onChange={(e) => {
                  setInput({
                    ...input,
                    website: e.target.value,
                  });
                }}
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                value={input.location}
                type="text"
                onChange={(e) => {
                  setInput({
                    ...input,
                    location: e.target.value,
                  });
                }}
              />
            </div>
            <div>
              <Label>Logo</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  setInput({
                    ...input,
                    file: e.target.files?.[0],
                  });
                }}
              />
            </div>
          </div>
          {loading ? (
            <Button className="w-full my-4">
              <Spinner />
            </Button>
          ) : (
            <Button className="w-full my-4" onClick={submitHandler}>
              Update
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};
