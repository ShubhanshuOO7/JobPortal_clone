import { USER_ENDPOINT } from '@/config'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { singleCompany } from '@/store/atoms/company'
import { useRecoilState } from 'recoil'
import { SignalLowIcon } from 'lucide-react'
const useGetCompanyById = (companyId) => {
    const[company,setCompany] = useRecoilState(singleCompany);
  useEffect(()=>{
    const fetchSingleCompany = async()=>{
        try {
            const res = await axios.get(`${USER_ENDPOINT}/api/v1/user/company/getById/${companyId}`,{withCredentials: true});
            if(res.data.success){
                setCompany(res.data.company);
            }
        } catch (error) {
            console.log(error);
        }
    }
    fetchSingleCompany();
  },[companyId])
}

export default useGetCompanyById