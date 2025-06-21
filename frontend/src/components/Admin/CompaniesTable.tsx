import { Edit2, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { allCompanies, searchCompanyByText } from "@/store/atoms/company";
import React, { useEffect, useState } from "react";
import { constSelector, useRecoilState, useRecoilValue } from "recoil";
import {Table,TableBody,TableCaption,TableCell,TableHead,TableHeader,TableRow,} from "../ui/table";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  const navigate = useNavigate();
  const [company, setCompany] = useRecoilState(allCompanies);    
   const searchCompany = useRecoilValue(searchCompanyByText);
   const[filterCompany,setFilterCompany] = useState(company);
   useEffect(()=>{
     const filteredCompany = company.length >= 0 && company.filter((companies)=>{
       if(!searchCompany){
         return true
        }
        return companies?.companyName?.toLowerCase().includes(searchCompany.toLowerCase())
      })
    setFilterCompany(filteredCompany);
  },[company,searchCompany])
  return (
    <div>
      <Table>
        <TableCaption>A list of your recent registered companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {company?.length <= 0 ? (
            <TableRow>
              <TableCell colSpan={4}>You haven't registered any company yet</TableCell>
            </TableRow>
          ) : (
            filterCompany?.map((company) => (
              <TableRow key={company.id}>
                <TableCell>
                  <Avatar>
                    <AvatarImage src={company.logo} />
                  </Avatar>
                </TableCell>
                <TableCell>{company.companyName}</TableCell>
                <TableCell>{company.createdAt.split("T")[0]}</TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div className="flex items-center gap-2 w-fit cursor-pointer">
                        <Edit2 className="w-4" onClick={()=>navigate(`/admin/companies/${company.id}`)} />
                        <span>Edit</span>
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

export default CompaniesTable;
